#!/usr/bin/env node

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const phases = [
  'Planning',
  'Plan Review',
  'Detailed Design',
  'Implementation',
  'Verification',
  'PR Preparation'
];
const conditions = ['Active', 'Paused', 'Blocked', 'Complete', 'Abandoned'];
const planReviews = ['Not run', 'No material challenge', 'Open challenges', 'Resolved'];
const routingStates = ['Pending', 'Confirmed'];
const readinessStates = ['Not ready', 'Ready'];
const phaseStatuses = ['Not started', 'In progress', 'Complete', 'Skipped'];
const reviewStatuses = ['Open', 'Awaiting Review', 'Resolved', 'Superseded'];
const reviewOutcomes = ['Retain', 'Revise', 'Replace', 'Accept Risk'];
const routes = ['Local', 'External', 'Hybrid', 'Not applicable', 'TBD'];
const followUpStates = ['Open', 'Completed', 'Transferred', 'Transfer Waived'];

const args = process.argv.slice(2);
const prReadyRequested = args.includes('--pr-ready');
const advanceIndex = args.indexOf('--advance');
const advancePhase = advanceIndex >= 0 ? args[advanceIndex + 1] : undefined;
const consumed = new Set();
const prReadyIndex = args.indexOf('--pr-ready');
if (prReadyIndex >= 0) consumed.add(prReadyIndex);
if (advanceIndex >= 0) {
  consumed.add(advanceIndex);
  consumed.add(advanceIndex + 1);
}
const positional = args.filter((arg, index) => !consumed.has(index));

if (
  positional.length !== 1 ||
  (advanceIndex >= 0 && !phases.includes(advancePhase)) ||
  positional.some((arg) => arg.startsWith('--'))
) {
  console.error(
    'Usage: validate-initiative.mjs <initiative-directory> [--advance <phase>] [--pr-ready]'
  );
  process.exit(2);
}

const initiativeRoot = path.resolve(positional[0]);
const errors = [];
const warnings = [];

try {
  const readme = await readFile(path.join(initiativeRoot, 'README.md'), 'utf8');
  const lifecycle = parseLifecycle(readme);

  validateAllowed(lifecycle, 'Schema', ['1'], errors);
  validateAllowed(lifecycle, 'Phase', phases, errors);
  validateAllowed(lifecycle, 'Condition', conditions, errors);
  validateAllowed(lifecycle, 'Plan review', planReviews, errors);
  validateAllowed(lifecycle, 'Artifact routing', routingStates, errors);
  validateAllowed(lifecycle, 'PR readiness', readinessStates, errors);
  validateRequired(lifecycle, ['Started', 'Last checkpoint', 'Next action', 'Blockers'], errors);
  validateDate(lifecycle, 'Started', errors);
  validateDate(lifecycle, 'Last checkpoint', errors);

  const currentPhase = lifecycle.get('Phase');
  const condition = lifecycle.get('Condition');
  const prReady = prReadyRequested || lifecycle.get('PR readiness') === 'Ready';
  const phaseRows = parseTable(readme, 'Phase Record');
  validatePhaseRows(phaseRows, currentPhase, condition, errors, warnings);

  const reviews = await readReviews(path.join(initiativeRoot, 'reviews'));
  validateReviews(reviews, lifecycle, advancePhase, prReady, errors);

  const routeRows = parseTable(readme, 'Artifact Routing');
  await validateRoutes(routeRows, lifecycle, initiativeRoot, prReady, errors, warnings);

  const followUps = await readFollowUps(path.join(initiativeRoot, 'follow-up.md'));
  validateFollowUps(followUps, prReady, errors);

  validateCompletion(lifecycle, currentPhase, condition, prReadyRequested, errors);
  validateWarnings(readme, lifecycle, currentPhase, warnings);
} catch (error) {
  if (error?.code === 'ENOENT') {
    errors.push(`Missing ${path.relative(process.cwd(), error.path ?? initiativeRoot)}.`);
  } else {
    errors.push(error.message);
  }
}

for (const warning of unique(warnings)) console.log(`WARNING: ${warning}`);
for (const error of unique(errors)) console.error(`ERROR: ${error}`);

if (errors.length > 0) {
  console.error(`Validation failed with ${unique(errors).length} error(s).`);
  process.exit(1);
}

console.log(`Validation passed${warnings.length ? ` with ${unique(warnings).length} warning(s)` : ''}.`);

function parseLifecycle(markdown) {
  const match = markdown.match(
    /<!-- durable-context:lifecycle:start -->([\s\S]*?)<!-- durable-context:lifecycle:end -->/
  );

  if (!match) {
    throw new Error('Lifecycle markers are missing; this is a legacy or malformed initiative.');
  }

  const fields = new Map();
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^\s*-\s+([^:]+):\s*(.*)\s*$/);
    if (field) fields.set(field[1].trim(), field[2].trim());
  }
  return fields;
}

function validateAllowed(fields, name, allowed, target) {
  const value = fields.get(name);
  if (!value) {
    target.push(`Lifecycle field "${name}" is missing.`);
  } else if (!allowed.includes(value)) {
    target.push(`Lifecycle field "${name}" must be one of: ${allowed.join(', ')}.`);
  }
}

function validateRequired(fields, names, target) {
  for (const name of names) {
    const value = fields.get(name);
    if (!value || /^(TBD|YYYY)/i.test(value)) target.push(`Lifecycle field "${name}" needs a real value.`);
  }
}

function validateDate(fields, name, target) {
  const value = fields.get(name);
  if (value && !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{3})?)?Z)?$/.test(value)) {
    target.push(`Lifecycle field "${name}" must be an ISO date or UTC timestamp.`);
  }
}

function parseTable(markdown, heading) {
  const section = markdown.match(new RegExp(`^## ${escapeRegExp(heading)}\\s*$([\\s\\S]*?)(?=^## |\\Z)`, 'm'));
  if (!section) return [];

  const lines = section[1].split(/\r?\n/).filter((line) => /^\s*\|/.test(line));
  if (lines.length < 2) return [];
  const headers = splitRow(lines[0]);
  return lines.slice(2).map((line) => {
    const values = splitRow(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

function splitRow(line) {
  return line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
}

function validatePhaseRows(rows, currentPhase, condition, target, warningTarget) {
  if (rows.length !== phases.length) {
    target.push(`Phase Record must contain exactly ${phases.length} phase rows.`);
    return;
  }

  for (const phase of phases) {
    const row = rows.find((candidate) => candidate.Phase === phase);
    if (!row) {
      target.push(`Phase Record is missing "${phase}".`);
      continue;
    }
    if (!phaseStatuses.includes(row.Status)) {
      target.push(`Phase "${phase}" has invalid status "${row.Status}".`);
    }
    if (row.Status === 'Skipped' && (!row.Evidence || row.Evidence === '—' || /^TBD$/i.test(row.Evidence))) {
      warningTarget.push(`Skipped phase "${phase}" has no explanatory evidence.`);
    }
  }

  const current = rows.find((row) => row.Phase === currentPhase);
  if (current && !['Complete', 'Abandoned'].includes(condition) && current.Status !== 'In progress') {
    target.push(`Current phase "${currentPhase}" must be "In progress" while condition is ${condition}.`);
  }

  const currentIndex = phases.indexOf(currentPhase);
  for (const row of rows) {
    if (phases.indexOf(row.Phase) < currentIndex && !['Complete', 'Skipped'].includes(row.Status)) {
      warningTarget.push(`Earlier phase "${row.Phase}" is still ${row.Status}.`);
    }
  }
}

async function readReviews(directory) {
  if (!(await exists(directory))) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const reviews = [];
  for (const entry of entries.filter((item) => item.isFile() && item.name.endsWith('.md'))) {
    const content = await readFile(path.join(directory, entry.name), 'utf8');
    reviews.push({ file: entry.name, fields: parseBulletFields(content) });
  }
  return reviews;
}

function validateReviews(reviews, lifecycle, advancePhase, prReady, target) {
  const unresolved = [];
  for (const review of reviews) {
    const status = review.fields.get('Status');
    if (!reviewStatuses.includes(status)) {
      target.push(`${review.file} has invalid or missing review Status.`);
      continue;
    }

    if (status === 'Resolved') {
      const outcome = review.fields.get('Outcome');
      if (!reviewOutcomes.includes(outcome)) target.push(`${review.file} needs a valid resolved Outcome.`);
      if (isPending(review.fields.get('Resolver'))) target.push(`${review.file} needs a human Resolver.`);
      if (isPending(review.fields.get('Resolved'))) target.push(`${review.file} needs a resolution date.`);
      continue;
    }

    if (status === 'Open' || status === 'Awaiting Review') {
      const blocked = (review.fields.get('Blocks phases') ?? '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
      if (blocked.some((phase) => !phases.includes(phase))) {
        target.push(`${review.file} contains an unknown blocked phase.`);
      }
      unresolved.push({ ...review, blocked });
      if (prReady || (advancePhase && blocked.includes(advancePhase))) {
        const boundary = prReady ? 'PR readiness' : advancePhase;
        target.push(`${review.file} is unresolved and blocks ${boundary}.`);
      }
    }
  }

  const reviewState = lifecycle.get('Plan review');
  if (unresolved.length > 0 && reviewState !== 'Open challenges') {
    target.push('Plan review must be "Open challenges" while material reviews are unresolved.');
  }
  if (unresolved.length === 0 && reviewState === 'Open challenges') {
    target.push('Plan review says "Open challenges" but no unresolved review record exists.');
  }
}

async function validateRoutes(rows, lifecycle, root, prReady, target, warningTarget) {
  if (lifecycle.get('Artifact routing') === 'Pending') {
    if (prReady) target.push('Artifact routing must be Confirmed at PR readiness.');
    if (phases.indexOf(lifecycle.get('Phase')) >= phases.indexOf('Implementation')) {
      warningTarget.push('Artifact routing is still Pending after Detailed Design.');
    }
    return;
  }
  if (rows.length === 0) {
    target.push('Artifact routing is Confirmed but the routing table is missing.');
    return;
  }

  for (const row of rows) {
    if (!routes.includes(row.Route)) {
      target.push(`Concern "${row.Concern || 'unnamed'}" has invalid route "${row.Route}".`);
      continue;
    }
    if (row.Route === 'TBD') target.push(`Concern "${row.Concern}" is still TBD after routing was confirmed.`);
    if (isEmptyCell(row['Evidence or reason'])) {
      target.push(`Concern "${row.Concern}" needs evidence or a routing reason.`);
    }
    if (row.Route === 'Local' || row.Route === 'Hybrid') {
      const localPath = stripCode(row['Local artifact']);
      if (!localPath || localPath === '—' || !(await exists(path.join(root, localPath)))) {
        target.push(`Concern "${row.Concern}" routes locally but "${localPath || 'no path'}" is missing.`);
      }
    }
    if ((row.Route === 'External' || row.Route === 'Hybrid') && isEmptyCell(row['External destination'])) {
      const message = `Concern "${row.Concern}" has no external destination yet.`;
      if (prReady) target.push(message);
      else warningTarget.push(message);
    }
    if (prReady && /^yes$/i.test(row['Merge blocking'] ?? '') && isEmptyCell(row['Evidence or reason'])) {
      target.push(`Merge-blocking concern "${row.Concern}" needs evidence or a resolution reason.`);
    }
  }
}

async function readFollowUps(filePath) {
  if (!(await exists(filePath))) return { present: false, items: [] };
  const content = await readFile(filePath, 'utf8');
  const chunks = content.split(/^## (?=F-[^\n]+$)/m).slice(1);
  return { present: true, items: chunks.map((chunk) => {
    const newline = chunk.indexOf('\n');
    return {
      title: chunk.slice(0, newline).trim(),
      fields: parseBulletFields(chunk.slice(newline + 1))
    };
  }) };
}

function validateFollowUps(followUps, prReady, target) {
  if (followUps.present && followUps.items.length === 0) {
    target.push('follow-up.md exists but contains no structured F-NNN items.');
  }
  for (const item of followUps.items) {
    const state = item.fields.get('State');
    if (!followUpStates.includes(state)) {
      target.push(`${item.title} has invalid or missing follow-up State.`);
      continue;
    }
    if (!prReady) continue;
    if (state === 'Open') target.push(`${item.title} remains Open at PR readiness.`);
    if (state === 'Transferred') {
      for (const field of ['Destination', 'Responsibility', 'Evidence']) {
        if (isPending(item.fields.get(field))) target.push(`${item.title} needs ${field} before transfer is complete.`);
      }
    }
    if (state === 'Transfer Waived') {
      for (const field of ['Reason', 'Resolver', 'Resolved']) {
        if (isPending(item.fields.get(field))) target.push(`${item.title} needs ${field} for a transfer waiver.`);
      }
    }
  }
}

function validateCompletion(lifecycle, currentPhase, condition, prReadyRequested, target) {
  const readiness = lifecycle.get('PR readiness');
  if (prReadyRequested && readiness !== 'Ready') target.push('PR readiness must be set to "Ready" for --pr-ready validation.');
  if (readiness === 'Ready' && (currentPhase !== 'PR Preparation' || condition !== 'Complete')) {
    target.push('PR readiness "Ready" requires phase "PR Preparation" and condition "Complete".');
  }
  if (condition === 'Complete' && readiness !== 'Ready') {
    target.push('Condition "Complete" requires PR readiness "Ready".');
  }
  if (condition === 'Blocked' && /^none$/i.test(lifecycle.get('Blockers') ?? '')) {
    target.push('Condition "Blocked" requires a concrete blocker.');
  }
}

function validateWarnings(readme, lifecycle, currentPhase, target) {
  if (phases.indexOf(currentPhase) > phases.indexOf('Plan Review') && lifecycle.get('Plan review') === 'Not run') {
    target.push('Adversarial review was not run; this is allowed but should be a conscious choice.');
  }
  if (/^(TBD|None)$/i.test(lifecycle.get('Next action') ?? '')) target.push('Next action is not concrete.');
  const checkpoints = parseTable(readme, 'Checkpoints');
  if (checkpoints.length === 0) target.push('No checkpoint history is recorded.');

  const checkpoint = Date.parse(lifecycle.get('Last checkpoint') ?? '');
  if (Number.isFinite(checkpoint) && Date.now() - checkpoint > 14 * 24 * 60 * 60 * 1000) {
    target.push('Last checkpoint is more than 14 days old.');
  }
}

function parseBulletFields(markdown) {
  const fields = new Map();
  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^\s*-\s+([^:]+):\s*(.*)\s*$/);
    if (match) fields.set(match[1].trim(), match[2].trim());
  }
  return fields;
}

function stripCode(value = '') {
  return value.trim().replace(/^`|`$/g, '');
}

function isEmptyCell(value) {
  return !value || value === '—' || /^(TBD|Pending)$/i.test(value);
}

function isPending(value) {
  return !value || /^(TBD|Pending|YYYY)/i.test(value);
}

async function exists(filePath) {
  try {
    return (await stat(filePath)).isFile() || (await stat(filePath)).isDirectory();
  } catch {
    return false;
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function unique(values) {
  return [...new Set(values)];
}
