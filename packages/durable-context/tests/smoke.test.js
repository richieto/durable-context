import { execFile } from 'node:child_process';
import { mkdtemp, readFile, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';
import assert from 'node:assert/strict';

const execFileAsync = promisify(execFile);
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliPath = path.join(packageRoot, 'bin/durable-context.js');
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

test('init installs the flat planning scaffold and decision log', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'durable-context-'));

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Planning App'
  ]);

  assert.match(stdout, /Durable Context ready for Planning App/);

  assert.equal(await exists(path.join(target, 'context/initiatives/.gitkeep')), true);
  assert.equal(await exists(path.join(target, 'context/_templates/initiative/plan.md')), true);
  assert.equal(await exists(path.join(target, 'context/project-profile.md')), true);
  assert.equal(await exists(path.join(target, 'decisions/README.md')), true);
  assert.equal(await exists(path.join(target, 'decisions/0000-template.md')), true);
  assert.equal(
    await exists(path.join(target, '.agents/skills/plan-with-context/SKILL.md')),
    true
  );
  assert.equal(
    await exists(path.join(target, '.agents/skills/dive-into-plan/SKILL.md')),
    true
  );

  assert.equal(await exists(path.join(target, 'context/current.md')), false);
  assert.equal(await exists(path.join(target, 'context/releases')), false);

  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(agents, /# Agent Guidance - Planning App/);
  assert.match(agents, /<!-- durable-context:start -->/);
  assert.match(agents, /\.agents\/skills\/plan-with-context\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/dive-into-plan\/SKILL\.md/);

  const profile = await readFile(path.join(target, 'context/project-profile.md'), 'utf8');
  assert.match(profile, /Project: Planning App/);
  assert.doesNotMatch(profile, /PROJECT_NAME/);

  const metadata = JSON.parse(
    await readFile(path.join(target, '.durable-context/install.json'), 'utf8')
  );
  assert.equal(metadata.installedVersion, packageJson.version);
  assert.equal(metadata.projectName, 'Planning App');
  assert.deepEqual(metadata.installedSkills, ['plan-with-context', 'dive-into-plan']);

  const status = await execFileAsync(process.execPath, [cliPath, 'status', '--target', target]);
  assert.match(status.stdout, new RegExp(`Installed version: ${escapeRegExp(packageJson.version)}`));
  assert.match(status.stdout, /Installed skills: plan-with-context, dive-into-plan/);
});

test('init appends guidance to an existing AGENTS file and is idempotent', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'durable-context-existing-'));
  await writeFile(path.join(target, 'AGENTS.md'), '# Existing Agent Rules\n\nKeep the build fast.\n');

  await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Existing App'
  ]);

  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(agents, /# Existing Agent Rules/);
  assert.match(agents, /<!-- durable-context:start -->/);

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Existing App',
    '--dry-run'
  ]);

  assert.match(stdout, /AGENTS\.md already has the Durable Context guidance/);
  assert.match(stdout, /skip context/);
  assert.match(stdout, /skip decisions/);
});

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
