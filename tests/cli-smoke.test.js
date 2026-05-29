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
    '--no-documentation'
  ]);

  assert.match(stdout, /Code-Anchored Context ready for Smoke App/);
  assert.equal(await exists(path.join(target, 'Documentation')), false);
  assert.equal(await exists(path.join(target, 'Development/releases/v1_2_3')), true);
  assert.equal(await exists(path.join(target, 'Development/releases/v0_1_0')), false);
  assert.equal(
    await exists(path.join(target, 'Development/releases/v1_2_3/initiatives/npm-installer-cli')),
    false
  );

  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(agents, /# Agent Guidance - Smoke App/);
  assert.match(agents, /\.agents\/skills\/development-initiative-context\/SKILL\.md/);

  const current = await readFile(path.join(target, 'Development/current.md'), 'utf8');
  assert.match(current, /Current release: `v1_2_3`/);
  assert.doesNotMatch(current, /npm-installer-cli/);

  const backlog = await readFile(path.join(target, 'Development/releases/v1_2_3/backlog.md'), 'utf8');
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
    '--no-documentation'
  ]);

  const firstAgents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(firstAgents, /# Existing Agent Rules/);
  assert.match(firstAgents, /<!-- code-anchored-context:start -->/);
  assert.match(firstAgents, /\.agents\/skills\/development-initiative-context\/SKILL\.md/);

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Existing Agents App',
    '--no-documentation',
    '--dry-run'
  ]);

  assert.match(stdout, /AGENTS\.md already has Code-Anchored Context guidance/);
  assert.match(stdout, /skip Development/);
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
    '--no-documentation'
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

test('init skips existing Documentation case variants', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'cac-docs-case-'));
  await mkdir(path.join(target, 'documentation'));

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Docs Case App'
  ]);

  assert.match(
    stdout,
    /skip Documentation \(already exists at documentation; use --force to replace\)/
  );

  const rootEntries = await readdir(target);
  assert.equal(rootEntries.includes('documentation'), true);
  assert.equal(
    rootEntries.filter((entry) => entry.toLowerCase() === 'documentation').length,
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
    '--no-documentation'
  ]);

  assert.match(stdout, /append development initiative skill to \.agents\/skills\/readme\.md/);

  const skillEntries = await readdir(path.join(target, '.agents/skills'));
  assert.equal(skillEntries.includes('readme.md'), true);
  assert.equal(
    skillEntries.filter((entry) => entry.toLowerCase() === 'readme.md').length,
    1
  );

  const readme = await readFile(path.join(target, '.agents/skills/readme.md'), 'utf8');
  assert.match(readme, /existing-skill/);
  assert.match(readme, /development-initiative-context/);
});

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}
