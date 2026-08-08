import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';
import assert from 'node:assert/strict';

const execFileAsync = promisify(execFile);
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const validator = path.join(
  packageRoot,
  'template/.agents/skills/checkpoint-context/scripts/validate-initiative.mjs'
);
const readmeTemplate = path.join(packageRoot, 'template/context/_templates/initiative/README.md');

test('validates every active lifecycle phase and condition', async () => {
  const phases = [
    'Planning',
    'Plan Review',
    'Detailed Design',
    'Implementation',
    'Verification',
    'PR Preparation'
  ];

  for (const phase of phases) {
    const root = await createInitiative({ phase });
    const result = await runValidator(root);
    assert.equal(result.code, 0, `${phase}: ${result.stderr}`);
  }

  for (const condition of ['Paused', 'Blocked', 'Abandoned']) {
    const root = await createInitiative({
      condition,
      blockers: condition === 'Blocked' ? 'Waiting for a human conclusion.' : 'None'
    });
    const result = await runValidator(root);
    assert.equal(result.code, 0, `${condition}: ${result.stderr}`);
  }
});

test('blocks only phases named by unresolved material challenges', async () => {
  const planning = await createInitiative({ planReview: 'Open challenges' });
  await writeReview(planning, 'Open', 'Implementation');
  assert.equal((await runValidator(planning, ['--advance', 'Detailed Design'])).code, 0);

  const implementation = await createInitiative({
    phase: 'Implementation',
    planReview: 'Open challenges'
  });
  await writeReview(implementation, 'Awaiting Review', 'Implementation');
  assert.equal((await runValidator(implementation)).code, 0);
  const blocked = await runValidator(implementation, ['--advance', 'Implementation']);
  assert.equal(blocked.code, 1);
  assert.match(blocked.stderr, /unresolved and blocks Implementation/);
});

test('accepts human review conclusions and rejects incomplete resolutions', async () => {
  const valid = await createInitiative({ phase: 'Implementation', planReview: 'Resolved' });
  await writeReview(valid, 'Resolved', 'Implementation', {
    outcome: 'Accept Risk',
    resolver: 'Ricardo',
    resolved: '2026-08-07'
  });
  assert.equal((await runValidator(valid)).code, 0);

  const invalid = await createInitiative({ phase: 'Implementation', planReview: 'Resolved' });
  await writeReview(invalid, 'Resolved', 'Implementation');
  const result = await runValidator(invalid);
  assert.equal(result.code, 1);
  assert.match(result.stderr, /valid resolved Outcome/);
  assert.match(result.stderr, /human Resolver/);
});

test('enforces confirmed local routes without requiring N/A documents', async () => {
  const root = await createInitiative({
    phase: 'Detailed Design',
    routing: 'Confirmed',
    routeOverrides: {
      Specification: ['Local', '`spec.md`', '—', 'Confirmed locally', 'Yes'],
      Operations: ['Not applicable', '`operations.md`', '—', 'No runtime impact', 'No']
    }
  });

  const missing = await runValidator(root);
  assert.equal(missing.code, 1);
  assert.match(missing.stderr, /spec\.md.*missing/);
  await writeFile(path.join(root, 'spec.md'), '# Spec\n');
  assert.equal((await runValidator(root)).code, 0);
});

test('requires follow-ups to be closed, transferred, or validly waived at PR readiness', async () => {
  const root = await createInitiative({
    phase: 'PR Preparation',
    condition: 'Complete',
    readiness: 'Ready',
    routing: 'Confirmed'
  });
  await writeFile(
    path.join(root, 'follow-up.md'),
    followUp('Open', { reason: 'Runs after merge.' })
  );
  const open = await runValidator(root, ['--pr-ready']);
  assert.equal(open.code, 1);
  assert.match(open.stderr, /remains Open/);

  await writeFile(
    path.join(root, 'follow-up.md'),
    followUp('Transfer Waived', {
      reason: 'Human accepts this as disclosed local debt.',
      resolver: 'Ricardo',
      resolved: '2026-08-07'
    })
  );
  const waived = await runValidator(root, ['--pr-ready']);
  assert.equal(waived.code, 0, waived.stderr);
  assert.doesNotMatch(waived.stdout, /transfer waiver/i);
});

test('requires confirmed artifact routing at PR readiness', async () => {
  const root = await createInitiative({
    phase: 'PR Preparation',
    condition: 'Complete',
    readiness: 'Ready'
  });
  const result = await runValidator(root, ['--pr-ready']);
  assert.equal(result.code, 1);
  assert.match(result.stderr, /Artifact routing must be Confirmed/);
});

test('rejects contradictory completion and legacy initiatives', async () => {
  const contradiction = await createInitiative({ condition: 'Complete' });
  const invalid = await runValidator(contradiction);
  assert.equal(invalid.code, 1);
  assert.match(invalid.stderr, /Condition "Complete" requires PR readiness "Ready"/);

  const legacy = await mkdtemp(path.join(tmpdir(), 'durable-context-legacy-'));
  await writeFile(path.join(legacy, 'README.md'), '# Legacy\n\nStatus: Draft\n');
  const result = await runValidator(legacy);
  assert.equal(result.code, 1);
  assert.match(result.stderr, /legacy or malformed initiative/);
});

async function createInitiative({
  phase = 'Planning',
  condition = 'Active',
  blockers = 'None',
  planReview = 'Not run',
  routing = 'Pending',
  readiness = 'Not ready',
  routeOverrides = {}
} = {}) {
  const root = await mkdtemp(path.join(tmpdir(), 'durable-context-lifecycle-'));
  let readme = await readFile(readmeTemplate, 'utf8');
  readme = readme
    .replace('INITIATIVE_TITLE', 'Lifecycle Test')
    .replaceAll('YYYY-MM-DD', '2026-08-07')
    .replace('- Phase: Planning', `- Phase: ${phase}`)
    .replace('- Condition: Active', `- Condition: ${condition}`)
    .replace('- Blockers: None', `- Blockers: ${blockers}`)
    .replace('- Plan review: Not run', `- Plan review: ${planReview}`)
    .replace('- Artifact routing: Pending', `- Artifact routing: ${routing}`)
    .replace('- PR readiness: Not ready', `- PR readiness: ${readiness}`);

  for (const current of [
    'Planning',
    'Plan Review',
    'Detailed Design',
    'Implementation',
    'Verification',
    'PR Preparation'
  ]) {
    const status = current === phase ? 'In progress' : 'Not started';
    readme = readme.replace(
      new RegExp(`\\| ${escapeRegExp(current)} \\| (?:In progress|Not started) \\|`),
      `| ${current} | ${status} |`
    );
  }

  if (condition === 'Complete') {
    readme = readme.replace('| PR Preparation | In progress |', '| PR Preparation | Complete |');
  }

  if (routing === 'Confirmed') {
    const concerns = [
      ['Specification', 'Not applicable', '`spec.md`', '—', 'Not needed', 'No'],
      ['Interface', 'Not applicable', '`interface.md`', '—', 'Not needed', 'No'],
      ['Architecture', 'Not applicable', '`architecture.md`', '—', 'Not needed', 'No'],
      ['Testing', 'Not applicable', '`testing.md`', '—', 'Not needed', 'No'],
      ['Delivery', 'Not applicable', '`delivery.md`', '—', 'Not needed', 'No'],
      ['Infrastructure', 'Not applicable', '`infrastructure.md`', '—', 'Not needed', 'No'],
      ['Operations', 'Not applicable', '`operations.md`', '—', 'Not needed', 'No'],
      ['Backlog', 'Not applicable', '`backlog.md`', '—', 'Not needed', 'No'],
      ['Release documentation', 'Not applicable', '`release-doc-notes.md`', '—', 'Not needed', 'No']
    ];
    for (const [concern, ...defaults] of concerns) {
      const values = routeOverrides[concern] ?? defaults;
      readme = readme.replace(
        new RegExp(`\\| ${escapeRegExp(concern)} \\|[^\\n]+`),
        `| ${concern} | ${values.join(' | ')} |`
      );
    }
  }

  await writeFile(path.join(root, 'README.md'), readme);
  await writeFile(path.join(root, 'plan.md'), '# Plan\n');
  return root;
}

async function writeReview(root, status, blocks, overrides = {}) {
  await mkdir(path.join(root, 'reviews'));
  await writeFile(
    path.join(root, 'reviews/0001-test.md'),
    [
      '# Review 0001: Test',
      '',
      `- Status: ${status}`,
      `- Blocks phases: ${blocks}`,
      `- Outcome: ${overrides.outcome ?? 'Pending'}`,
      `- Resolver: ${overrides.resolver ?? 'Pending'}`,
      `- Resolved: ${overrides.resolved ?? 'Pending'}`,
      '',
      '## Commitment',
      '',
      'Test commitment.'
    ].join('\n')
  );
}

function followUp(state, overrides = {}) {
  return [
    '# Follow-up',
    '',
    '## F-001: Observe rollout',
    '',
    `- State: ${state}`,
    '- Trigger: After merge',
    `- Reason: ${overrides.reason ?? 'TBD'}`,
    '- Merge blocking: No',
    `- Destination: ${overrides.destination ?? 'Pending'}`,
    `- Responsibility: ${overrides.responsibility ?? 'Pending'}`,
    `- Evidence: ${overrides.evidence ?? 'Pending'}`,
    `- Resolver: ${overrides.resolver ?? 'Pending'}`,
    `- Resolved: ${overrides.resolved ?? 'Pending'}`,
    ''
  ].join('\n');
}

async function runValidator(root, extra = []) {
  try {
    const { stdout, stderr } = await execFileAsync(process.execPath, [validator, root, ...extra]);
    return { code: 0, stdout, stderr };
  } catch (error) {
    return { code: error.code, stdout: error.stdout ?? '', stderr: error.stderr ?? '' };
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
