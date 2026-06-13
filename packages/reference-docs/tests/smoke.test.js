import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';
import assert from 'node:assert/strict';

const execFileAsync = promisify(execFile);
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliPath = path.join(packageRoot, 'bin/reference-docs.js');
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

test('init installs the reference scaffold and skills', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'reference-docs-'));

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Reference App'
  ]);

  assert.match(stdout, /Reference Docs ready for Reference App/);

  assert.equal(await exists(path.join(target, 'reference/README.md')), true);
  assert.equal(await exists(path.join(target, 'reference/_authoring/workflow.md')), true);
  assert.equal(await exists(path.join(target, 'reference/releases/index.md')), true);
  assert.equal(
    await exists(path.join(target, '.agents/skills/reference-from-tags/SKILL.md')),
    true
  );
  assert.equal(
    await exists(path.join(target, '.agents/skills/reference-baseline/SKILL.md')),
    true
  );

  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(agents, /<!-- reference-docs:start -->/);
  assert.match(agents, /\.agents\/skills\/reference-from-tags\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/reference-baseline\/SKILL\.md/);

  const readme = await readFile(path.join(target, 'reference/README.md'), 'utf8');
  assert.match(readme, /Reference App/);
  assert.doesNotMatch(readme, /PROJECT_NAME/);

  assert.equal(await exists(path.join(target, 'context')), false);
  assert.equal(await exists(path.join(target, 'decisions')), false);

  const metadata = JSON.parse(
    await readFile(path.join(target, '.reference-docs/install.json'), 'utf8')
  );
  assert.equal(metadata.installedVersion, packageJson.version);
  assert.deepEqual(metadata.installedSkills, ['reference-from-tags', 'reference-baseline']);

  const status = await execFileAsync(process.execPath, [cliPath, 'status', '--target', target]);
  assert.match(status.stdout, /Installed skills: reference-from-tags, reference-baseline/);
});

test('init preserves existing docs and an existing AGENTS file', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'reference-docs-existing-'));
  await mkdir(path.join(target, 'docs'));
  await writeFile(path.join(target, 'docs/README.md'), '# Existing Docs\n');
  await writeFile(path.join(target, 'AGENTS.md'), '# Existing Rules\n');

  await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Reference Docs App'
  ]);

  assert.equal(await readFile(path.join(target, 'docs/README.md'), 'utf8'), '# Existing Docs\n');

  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(agents, /# Existing Rules/);
  assert.match(agents, /<!-- reference-docs:start -->/);

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Reference Docs App',
    '--dry-run'
  ]);

  assert.match(stdout, /AGENTS\.md already has the Reference Docs guidance/);
  assert.match(stdout, /skip reference/);
});

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}
