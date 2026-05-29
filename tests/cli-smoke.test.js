import { execFile } from 'node:child_process';
import { mkdtemp, readFile, stat, writeFile } from 'node:fs/promises';
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

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}
