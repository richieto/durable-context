import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';
import assert from 'node:assert/strict';

const execFileAsync = promisify(execFile);
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliPath = path.join(packageRoot, 'bin/reference-docs.js');
const fixtureRoot = path.join(packageRoot, 'tests/fixtures/v1');
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

test('init installs schema-v2 reference scaffold, managed files, and project overlay', async () => {
  const target = await temporaryTarget('reference-docs-');
  const { stdout } = await runCli(target, 'init', '--project-name', 'Reference App');

  assert.match(stdout, /Reference Docs ready for Reference App/);
  assert.equal(await exists(path.join(target, 'reference/README.md')), true);
  assert.equal(await exists(path.join(target, 'reference/_authoring/project.md')), true);
  assert.equal(await exists(path.join(target, 'reference/_authoring/workflow.md')), true);
  assert.equal(await exists(path.join(target, 'reference/releases/index.md')), true);
  assert.equal(await exists(path.join(target, 'context')), false);
  assert.equal(await exists(path.join(target, 'decisions')), false);

  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  const readme = await readFile(path.join(target, 'reference/README.md'), 'utf8');
  const skill = await readFile(
    path.join(target, '.agents/skills/reference-baseline/SKILL.md'),
    'utf8'
  );
  const refreshSkill = await readFile(
    path.join(target, '.agents/skills/reference-from-tags/SKILL.md'),
    'utf8'
  );
  const workflow = await readFile(
    path.join(target, 'reference/_authoring/workflow.md'),
    'utf8'
  );
  assert.match(agents, /\[`reference\/`\]\(reference\/\)/);
  assert.match(readme, /Reference App/);
  assert.match(readme, /understandable after disposable planning\s+context/);
  assert.match(skill, /reference\/_authoring\/project\.md/);
  assert.match(refreshSkill, /transient impact map/);
  assert.match(refreshSkill, /Continue\s+with verified work without requesting approval/);
  assert.match(refreshSkill, /retain every evidence pointer/);
  assert.match(refreshSkill, /understandable without `context\/`/);
  assert.match(workflow, /## Multi-Area Impact Preview/);
  assert.match(workflow, /Do not silently choose/);
  assert.doesNotMatch(
    `${agents}\n${readme}\n${skill}\n${refreshSkill}\n${workflow}`,
    /PROJECT_NAME|REFERENCE_ROOT/
  );

  const metadata = await readMetadata(target);
  assert.equal(metadata.schemaVersion, 2);
  assert.equal(metadata.installedVersion, packageJson.version);
  assert.equal(metadata.referenceRoot, 'reference');
  assert.deepEqual(metadata.installedSkills, ['reference-from-tags', 'reference-baseline']);
  assert.equal(Object.keys(metadata.managedFiles).length, 4);

  const status = await runCli(target, 'status');
  assert.match(status.stdout, /Reference root: reference/);
  assert.match(status.stdout, /Managed files: 4/);
  assert.match(status.stdout, /Managed file state: clean/);

  const metadataBeforeDryRun = await readFile(
    path.join(target, '.reference-docs/install.json'),
    'utf8'
  );
  const dryRun = await runCli(
    target,
    'init',
    '--project-name',
    'Reference App',
    '--dry-run'
  );
  assert.match(dryRun.stdout, /AGENTS\.md already has the Reference Docs guidance/);
  assert.equal(
    await readFile(path.join(target, '.reference-docs/install.json'), 'utf8'),
    metadataBeforeDryRun
  );
});

test('custom reference roots preserve case, support nesting, and reject unsafe values', async () => {
  const pascalTarget = await temporaryTarget('reference-docs-pascal-');
  await runCli(
    pascalTarget,
    'init',
    '--project-name',
    'Pascal App',
    '--reference-root',
    'Reference'
  );

  assert.equal(await exists(path.join(pascalTarget, 'Reference/README.md')), true);
  const rootEntries = await readdir(pascalTarget);
  assert.equal(rootEntries.includes('Reference'), true);
  assert.equal(rootEntries.includes('reference'), false);
  assert.equal((await readMetadata(pascalTarget)).referenceRoot, 'Reference');
  assert.match(
    await readFile(
      path.join(pascalTarget, '.agents/skills/reference-from-tags/SKILL.md'),
      'utf8'
    ),
    /Reference\/releases\/index\.md/
  );
  assert.match(
    await readFile(
      path.join(pascalTarget, '.agents/skills/reference-from-tags/SKILL.md'),
      'utf8'
    ),
    /transient impact map/
  );

  await expectCliFailure(
    pascalTarget,
    ['update', '--reference-root', 'reference'],
    /only valid with init/
  );

  const nestedTarget = await temporaryTarget('reference-docs-nested-');
  await runCli(
    nestedTarget,
    'init',
    '--project-name',
    'Nested App',
    '--reference-root',
    'docs/reference'
  );
  assert.equal(await exists(path.join(nestedTarget, 'docs/reference/README.md')), true);
  assert.equal((await readMetadata(nestedTarget)).referenceRoot, 'docs/reference');

  for (const invalid of ['.', '../Reference', 'docs/../Reference', 'docs//reference', '/Reference']) {
    const target = await temporaryTarget('reference-docs-invalid-');
    await expectCliFailure(
      target,
      ['init', '--reference-root', invalid],
      /relative path|path segments/
    );
  }
});

test('init merges existing repositories and force replaces managed files only', async () => {
  const target = await temporaryTarget('reference-docs-adopt-');
  await mkdir(path.join(target, 'Reference/_authoring'), { recursive: true });
  await mkdir(path.join(target, '.agents/skills/reference-baseline'), { recursive: true });
  await writeFile(path.join(target, 'Reference/_authoring/workflow.md'), '# Local Workflow\n');
  await writeFile(path.join(target, 'Reference/keep.md'), '# Keep Me\n');
  await writeFile(
    path.join(target, '.agents/skills/reference-baseline/SKILL.md'),
    '# Local Baseline Skill\n'
  );
  await writeFile(
    path.join(target, '.agents/skills/reference-baseline/local-notes.md'),
    '# Local Notes\n'
  );

  await runCli(
    target,
    'init',
    '--project-name',
    'Adopted App',
    '--reference-root',
    'Reference'
  );

  assert.equal(
    await readFile(path.join(target, 'Reference/_authoring/workflow.md'), 'utf8'),
    '# Local Workflow\n'
  );
  assert.equal(
    await readFile(path.join(target, '.agents/skills/reference-baseline/SKILL.md'), 'utf8'),
    '# Local Baseline Skill\n'
  );
  assert.equal(await exists(path.join(target, 'Reference/_authoring/project.md')), true);
  assert.equal(Object.keys((await readMetadata(target)).managedFiles).length, 2);

  await runCli(target, 'init', '--project-name', 'Adopted App', '--force');

  assert.match(
    await readFile(path.join(target, 'Reference/_authoring/workflow.md'), 'utf8'),
    /## Audience And Writing Focus/
  );
  assert.match(
    await readFile(path.join(target, '.agents/skills/reference-baseline/SKILL.md'), 'utf8'),
    /# Reference Baseline/
  );
  assert.equal(await readFile(path.join(target, 'Reference/keep.md'), 'utf8'), '# Keep Me\n');
  assert.equal(
    await readFile(
      path.join(target, '.agents/skills/reference-baseline/local-notes.md'),
      'utf8'
    ),
    '# Local Notes\n'
  );
  assert.equal(Object.keys((await readMetadata(target)).managedFiles).length, 4);
});

test('update aborts atomically on all managed-file conflicts', async () => {
  const target = await temporaryTarget('reference-docs-conflict-');
  await runCli(target, 'init', '--project-name', 'Conflict App');

  await writeFile(
    path.join(target, '.agents/skills/reference-from-tags/SKILL.md'),
    '# Local Tag Skill\n'
  );
  await rm(path.join(target, 'reference/_authoring/workflow.md'));
  await writeFile(
    path.join(target, 'AGENTS.md'),
    '# Existing Rules\n\n<!-- reference-docs:start -->\nstale guidance\n<!-- reference-docs:end -->\n'
  );

  const metadataBefore = await readFile(
    path.join(target, '.reference-docs/install.json'),
    'utf8'
  );
  const agentsBefore = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  const baselineBefore = await readFile(
    path.join(target, '.agents/skills/reference-baseline/SKILL.md'),
    'utf8'
  );

  await expectCliFailure(
    target,
    ['update'],
    /reference-from-tags\/SKILL\.md[\s\S]*workflow\.md \(missing\)/
  );

  const status = await runCli(target, 'status');
  assert.match(status.stdout, /Managed file state: 2 conflict\(s\)/);

  assert.equal(await readFile(path.join(target, 'AGENTS.md'), 'utf8'), agentsBefore);
  assert.equal(
    await readFile(path.join(target, '.reference-docs/install.json'), 'utf8'),
    metadataBefore
  );
  assert.equal(
    await readFile(path.join(target, '.agents/skills/reference-baseline/SKILL.md'), 'utf8'),
    baselineBefore
  );

  await expectCliFailure(target, ['update', '--dry-run'], /no files were changed/);
});

test('force update replaces only managed conflicts and preserves project extensions', async () => {
  const target = await temporaryTarget('reference-docs-force-');
  await runCli(target, 'init', '--project-name', 'Force App');

  await writeFile(
    path.join(target, '.agents/skills/reference-from-tags/SKILL.md'),
    '# Local Tag Skill\n'
  );
  await writeFile(
    path.join(target, '.agents/skills/reference-from-tags/local.md'),
    '# Skill Extension\n'
  );
  await writeFile(
    path.join(target, '.agents/skills/README.md'),
    [
      '# Project Skills',
      '',
      'User notes stay here.',
      '',
      '<!-- durable-context:skills:start -->',
      'durable context section stays here',
      '<!-- durable-context:skills:end -->',
      '',
      '<!-- reference-docs:skills:start -->',
      'stale reference section',
      '<!-- reference-docs:skills:end -->',
      ''
    ].join('\n')
  );
  await writeFile(path.join(target, 'reference/_authoring/project.md'), '# Project Rules\n');
  await writeFile(path.join(target, 'reference/custom.md'), '# Custom Reference\n');

  await runCli(target, 'update', '--force');

  assert.match(
    await readFile(path.join(target, '.agents/skills/reference-from-tags/SKILL.md'), 'utf8'),
    /# Reference From Tags/
  );
  assert.equal(
    await readFile(path.join(target, '.agents/skills/reference-from-tags/local.md'), 'utf8'),
    '# Skill Extension\n'
  );
  assert.equal(
    await readFile(path.join(target, 'reference/_authoring/project.md'), 'utf8'),
    '# Project Rules\n'
  );
  assert.equal(
    await readFile(path.join(target, 'reference/custom.md'), 'utf8'),
    '# Custom Reference\n'
  );
  const skillsReadme = await readFile(path.join(target, '.agents/skills/README.md'), 'utf8');
  assert.match(skillsReadme, /User notes stay here/);
  assert.match(skillsReadme, /durable context section stays here/);
  assert.match(skillsReadme, /reference-from-tags/);
  assert.doesNotMatch(skillsReadme, /stale reference section/);
  assert.equal(Object.keys((await readMetadata(target)).managedFiles).length, 4);
});

test('schema-v1 installs migrate cleanly and infer existing root casing', async () => {
  const target = await temporaryTarget('reference-docs-v1-');
  await mkdir(path.join(target, '.agents/skills/reference-baseline'), { recursive: true });
  await mkdir(path.join(target, '.agents/skills/reference-from-tags'), { recursive: true });
  await mkdir(path.join(target, 'Reference/_authoring'), { recursive: true });
  await mkdir(path.join(target, '.reference-docs'), { recursive: true });

  await copyFixture('reference-baseline.md', target, '.agents/skills/reference-baseline/SKILL.md');
  await copyFixture('reference-from-tags.md', target, '.agents/skills/reference-from-tags/SKILL.md');
  await copyFixture('workflow.md', target, 'Reference/_authoring/workflow.md');
  await copyFixture('authoring-readme.md', target, 'Reference/_authoring/README.md');
  await writeFile(path.join(target, 'Reference/README.md'), '# Existing Reference\n');
  await writeFile(
    path.join(target, '.reference-docs/install.json'),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        packageName: 'reference-docs',
        installedVersion: '1.1.1',
        firstInstalledVersion: '1.0.0',
        firstInstalledAt: '2026-01-01T00:00:00.000Z',
        lastUpdatedAt: '2026-01-02T00:00:00.000Z',
        projectName: 'Legacy App',
        installedSkills: ['reference-from-tags', 'reference-baseline']
      },
      null,
      2
    )}\n`
  );

  await runCli(target, 'update');

  const metadata = await readMetadata(target);
  assert.equal(metadata.schemaVersion, 2);
  assert.equal(metadata.referenceRoot, 'Reference');
  assert.equal(metadata.firstInstalledVersion, '1.0.0');
  assert.equal(metadata.firstInstalledAt, '2026-01-01T00:00:00.000Z');
  assert.equal(Object.keys(metadata.managedFiles).length, 4);
  assert.match(
    await readFile(path.join(target, 'Reference/_authoring/workflow.md'), 'utf8'),
    /Reference\/releases\/index\.md/
  );
  assert.equal(
    await readFile(path.join(target, 'Reference/README.md'), 'utf8'),
    '# Existing Reference\n'
  );
  assert.equal(await exists(path.join(target, 'Reference/_authoring/project.md')), true);
});

test('installed guidance restores generic value without project-specific coupling', async () => {
  const target = await temporaryTarget('reference-docs-guidance-');
  await runCli(target, 'init', '--project-name', 'Guidance App');
  const workflow = await readFile(path.join(target, 'reference/_authoring/workflow.md'), 'utf8');
  const baseline = await readFile(
    path.join(target, '.agents/skills/reference-baseline/SKILL.md'),
    'utf8'
  );

  for (const heading of [
    '## Reference Modes',
    '## Audience And Writing Focus',
    '## Diagrams',
    '## Release Refresh Source Order',
    '## Completion Criteria'
  ]) {
    assert.match(workflow, new RegExp(escapeRegExp(heading)));
  }

  assert.match(baseline, /## Done When/);
  assert.doesNotMatch(`${workflow}\n${baseline}`, /Adra\.Platform|Development\/|Decisions\//);
});

async function temporaryTarget(prefix) {
  return mkdtemp(path.join(tmpdir(), prefix));
}

async function runCli(target, ...args) {
  return execFileAsync(process.execPath, [cliPath, ...args, '--target', target]);
}

async function expectCliFailure(target, args, pattern) {
  await assert.rejects(
    runCli(target, ...args),
    (error) => {
      assert.match(`${error.stdout ?? ''}\n${error.stderr ?? ''}`, pattern);
      return true;
    }
  );
}

async function readMetadata(target) {
  return JSON.parse(await readFile(path.join(target, '.reference-docs/install.json'), 'utf8'));
}

async function copyFixture(name, target, relative) {
  await writeFile(path.join(target, relative), await readFile(path.join(fixtureRoot, name)));
}

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
