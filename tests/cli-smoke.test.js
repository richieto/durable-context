import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';
import assert from 'node:assert/strict';

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliPath = path.join(repoRoot, 'bin/code-anchored-context.js');

test('init installs agent context into an empty project', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'cac-empty-'));

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Smoke App',
    '--release',
    'v1_2_3',
    '--no-reference'
  ]);

  assert.match(stdout, /Code-Anchored Context ready for Smoke App/);
  assert.equal(await exists(path.join(target, 'reference')), false);
  assert.equal(await exists(path.join(target, 'context/project-profile.md')), true);
  assert.equal(await exists(path.join(target, 'context/releases/v1_2_3')), true);
  assert.equal(await exists(path.join(target, 'context/releases/v0_1_0')), false);
  assert.equal(
    await exists(path.join(target, 'context/releases/v1_2_3/initiatives/npm-installer-cli')),
    false
  );

  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(agents, /# Agent Guidance - Smoke App/);
  assert.match(agents, /\.agents\/skills\/code-anchored-context\/SKILL\.md/);

  const current = await readFile(path.join(target, 'context/current.md'), 'utf8');
  assert.match(current, /Current release: `v1_2_3`/);
  assert.match(current, /project-profile\.md/);
  assert.doesNotMatch(current, /npm-installer-cli/);

  const profile = await readFile(path.join(target, 'context/project-profile.md'), 'utf8');
  assert.match(profile, /Project: Smoke App/);
  assert.match(profile, /repository operating baseline/);
  assert.doesNotMatch(profile, /PROJECT_NAME/);

  const backlog = await readFile(path.join(target, 'context/releases/v1_2_3/backlog.md'), 'utf8');
  assert.match(backlog, /# v1\.2\.3 Backlog/);
  assert.match(backlog, /No initiatives registered yet/);
});

test('init appends guidance to an existing AGENTS file', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'cac-existing-agents-'));
  await writeFile(
    path.join(target, 'AGENTS.md'),
    '# Existing Agent Rules\n\nKeep the local build fast.\n'
  );

  await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Existing Agents App',
    '--no-reference'
  ]);

  const firstAgents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(firstAgents, /# Existing Agent Rules/);
  assert.match(firstAgents, /<!-- code-anchored-context:start -->/);
  assert.match(firstAgents, /\.agents\/skills\/code-anchored-context\/SKILL\.md/);

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Existing Agents App',
    '--no-reference',
    '--dry-run'
  ]);

  assert.match(stdout, /AGENTS\.md already has Code-Anchored Context guidance/);
  assert.match(stdout, /skip context/);
});

test('init reuses an existing Agents.md case variant', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'cac-agents-case-'));
  await writeFile(
    path.join(target, 'Agents.md'),
    '# Existing Mixed-Case Agent Rules\n\nKeep this filename.\n'
  );

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Mixed Case Agents App',
    '--no-reference'
  ]);

  assert.match(stdout, /append Code-Anchored Context guidance to Agents\.md/);
  assert.match(stdout, /Next: ask your agent to read .*Agents\.md/);

  const rootEntries = await readdir(target);
  assert.equal(rootEntries.includes('Agents.md'), true);
  assert.equal(
    rootEntries.filter((entry) => entry.toLowerCase() === 'agents.md').length,
    1
  );

  const agents = await readFile(path.join(target, 'Agents.md'), 'utf8');
  assert.match(agents, /# Existing Mixed-Case Agent Rules/);
  assert.match(agents, /<!-- code-anchored-context:start -->/);
});

test('init preserves existing docs and installs reference', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'cac-existing-docs-'));
  await mkdir(path.join(target, 'docs'));
  await writeFile(path.join(target, 'docs/README.md'), '# Existing Docs\n');

  await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Existing Docs App'
  ]);

  const rootEntries = await readdir(target);
  assert.equal(rootEntries.includes('docs'), true);
  assert.equal(rootEntries.includes('reference'), true);
  assert.equal(await exists(path.join(target, 'reference/README.md')), true);
  assert.equal(await exists(path.join(target, 'reference/_authoring/workflow.md')), true);
  assert.equal(await readFile(path.join(target, 'docs/README.md'), 'utf8'), '# Existing Docs\n');
});

test('init skips existing reference case variants', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'cac-reference-case-'));
  await mkdir(path.join(target, 'Reference'));

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Reference Case App'
  ]);

  assert.match(
    stdout,
    /skip reference \(already exists at Reference; use --force to replace\)/
  );

  const rootEntries = await readdir(target);
  assert.equal(rootEntries.includes('Reference'), true);
  assert.equal(
    rootEntries.filter((entry) => entry.toLowerCase() === 'reference').length,
    1
  );
});

test('init appends to existing skill README case variants', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'cac-skill-readme-case-'));
  await mkdir(path.join(target, '.agents/skills'), { recursive: true });
  await writeFile(
    path.join(target, '.agents/skills/readme.md'),
    '# Existing Skills\n\n- existing-skill\n'
  );

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Skill README Case App',
    '--no-reference'
  ]);

  assert.match(stdout, /append Code-Anchored Context skill to \.agents\/skills\/readme\.md/);

  const skillEntries = await readdir(path.join(target, '.agents/skills'));
  assert.equal(skillEntries.includes('readme.md'), true);
  assert.equal(
    skillEntries.filter((entry) => entry.toLowerCase() === 'readme.md').length,
    1
  );

  const readme = await readFile(path.join(target, '.agents/skills/readme.md'), 'utf8');
  assert.match(readme, /existing-skill/);
  assert.match(readme, /code-anchored-context/);
});

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}
