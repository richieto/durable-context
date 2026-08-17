import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';
import assert from 'node:assert/strict';

const execFileAsync = promisify(execFile);
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliPath = path.join(packageRoot, 'bin/durable-context-solo.js');
const collaborativeCliPath = path.join(packageRoot, '../durable-context/bin/durable-context.js');
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

test('init installs the default cycle scaffold and decision log', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'durable-context-solo-'));

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Planning App'
  ]);

  assert.match(stdout, /Durable Context Solo ready for Planning App/);

  assert.equal(
    await exists(path.join(target, 'context/cycles/default/initiatives/.gitkeep')),
    true
  );
  assert.equal(await exists(path.join(target, 'context/initiatives')), false);
  assert.equal(await exists(path.join(target, 'context/_templates/initiative/plan.md')), true);
  assert.equal(await exists(path.join(target, 'context/project-profile.md')), true);
  assert.equal(await exists(path.join(target, 'decisions/README.md')), true);
  assert.equal(await exists(path.join(target, 'decisions/0000-template.md')), true);
  assert.equal(await exists(path.join(target, 'decisions/indexes/by-area.md')), true);
  assert.equal(
    await exists(path.join(target, '.agents/skills/durable-context-solo/SKILL.md')),
    true
  );
  assert.equal(
    await exists(path.join(target, '.agents/skills/project-profile-baseline/SKILL.md')),
    true
  );
  assert.equal(
    await exists(path.join(target, '.agents/skills/project-profile-refresh/SKILL.md')),
    true
  );
  assert.equal(
    await exists(path.join(target, '.agents/skills/plan-with-context/SKILL.md')),
    true
  );
  assert.equal(
    await exists(path.join(target, '.agents/skills/challenge/SKILL.md')),
    true
  );
  assert.equal(
    await exists(path.join(target, '.agents/skills/dive-into-plan/SKILL.md')),
    true
  );
  assert.equal(
    await exists(path.join(target, '.agents/skills/backfill-with-context/SKILL.md')),
    true
  );
  assert.equal(
    await exists(path.join(target, 'context/_templates/initiative/decisions/ADR-0000-template.md')),
    false
  );

  assert.equal(await exists(path.join(target, 'context/current.md')), false);
  assert.equal(await exists(path.join(target, 'context/releases')), false);

  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(agents, /# Agent Guidance - Planning App/);
  assert.match(agents, /<!-- durable-context-solo:start -->/);
  assert.match(agents, /\.agents\/skills\/durable-context-solo\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/project-profile-baseline\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/project-profile-refresh\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/plan-with-context\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/challenge\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/dive-into-plan\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/backfill-with-context\/SKILL\.md/);

  const profile = await readFile(path.join(target, 'context/project-profile.md'), 'utf8');
  assert.match(profile, /Project: Planning App/);
  assert.match(profile, /<!-- durable-context:cycle:start -->/);
  assert.match(profile, /- Current cycle: default/);
  assert.match(profile, /- Naming: Project-defined/);
  assert.equal(profile.match(/^- Current cycle:/gm)?.length, 1);
  assert.match(profile, /## Concern Inventory/);
  assert.match(profile, /Every Present or External concern/);
  assert.doesNotMatch(profile, /PROJECT_NAME/);

  const backlog = await readFile(
    path.join(target, 'context/_templates/initiative/backlog.md'),
    'utf8'
  );
  assert.match(backlog, /bounded trace of implementation state/);
  assert.match(backlog, /not the project backlog/);

  const initiativeTemplate = await readFile(
    path.join(target, 'context/_templates/initiative/README.md'),
    'utf8'
  );
  assert.match(initiativeTemplate, /<!-- durable-context-solo:resume:start -->/);
  assert.match(initiativeTemplate, /## Concern Evaluation/);
  assert.equal(
    initiativeTemplate,
    await readFile(
      path.join(target, '.agents/skills/durable-context-solo/assets/initiative/README.md'),
      'utf8'
    )
  );

  const releaseNotesTemplate = await readFile(
    path.join(target, 'context/_templates/initiative/release-doc-notes.md'),
    'utf8'
  );
  assert.match(
    releaseNotesTemplate,
    /\| Observable behavior \| Source, test, or configuration evidence \| Candidate reference page \| Disposition \|/
  );
  assert.match(releaseNotesTemplate, /`Candidate`, `Unresolved`, and `Excluded`/);

  const metadata = JSON.parse(
    await readFile(path.join(target, '.durable-context-solo/install.json'), 'utf8')
  );
  assert.equal(metadata.installedVersion, packageJson.version);
  assert.equal(metadata.projectName, 'Planning App');
  assert.deepEqual(metadata.installedSkills, [
    'durable-context-solo',
    'project-profile-baseline',
    'project-profile-refresh',
    'plan-with-context',
    'challenge',
    'dive-into-plan',
    'backfill-with-context'
  ]);

  const status = await execFileAsync(process.execPath, [cliPath, 'status', '--target', target]);
  assert.match(status.stdout, new RegExp(`Installed version: ${escapeRegExp(packageJson.version)}`));
  assert.match(
    status.stdout,
    /Installed skills: durable-context-solo, project-profile-baseline, project-profile-refresh, plan-with-context, challenge, dive-into-plan, backfill-with-context/
  );
});

test('init appends guidance to an existing AGENTS file and is idempotent', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'durable-context-solo-existing-'));
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
  assert.match(agents, /<!-- durable-context-solo:start -->/);

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Existing App',
    '--dry-run'
  ]);

  assert.match(stdout, /AGENTS\.md already has the Durable Context Solo guidance/);
  assert.match(stdout, /skip context/);
  assert.match(stdout, /skip decisions/);
});

test('update refreshes managed agent assets without replacing project work', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'durable-context-solo-update-'));

  await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    target,
    '--project-name',
    'Update App'
  ]);

  await writeFile(
    path.join(target, '.agents/skills/plan-with-context/SKILL.md'),
    '# Locally edited skill\n'
  );
  await rm(path.join(target, '.agents/skills/challenge'), { recursive: true, force: true });
  await mkdir(path.join(target, '.agents/skills/devils-advocate'), { recursive: true });
  await writeFile(
    path.join(target, '.agents/skills/devils-advocate/SKILL.md'),
    '# Retired managed skill\n'
  );
  await writeFile(
    path.join(target, '.agents/skills/README.md'),
    [
      '# Project Skills',
      '',
      'User notes stay here.',
      '',
      '<!-- durable-context-solo:skills:start -->',
      'stale durable skill list',
      '<!-- durable-context-solo:skills:end -->',
      '',
      '<!-- reference-docs:skills:start -->',
      'reference docs section stays here',
      '<!-- reference-docs:skills:end -->',
      ''
    ].join('\n')
  );
  await writeFile(
    path.join(target, 'AGENTS.md'),
    [
      '# Existing Agent Rules',
      '',
      '<!-- durable-context-solo:start -->',
      'stale durable guidance',
      '<!-- durable-context-solo:end -->',
      ''
    ].join('\n')
  );
  await writeFile(path.join(target, 'context/README.md'), '# User Context\n');
  await writeFile(path.join(target, 'decisions/README.md'), '# User Decisions\n');
  const profilePath = path.join(target, 'context/project-profile.md');
  const customizedProfile = (await readFile(profilePath, 'utf8')).replace(
    '- Current cycle: default',
    '- Current cycle: sprint-12'
  );
  await writeFile(profilePath, customizedProfile);
  await mkdir(path.join(target, 'context/initiatives/legacy-work'), { recursive: true });
  await writeFile(
    path.join(target, 'context/initiatives/legacy-work/README.md'),
    '# Legacy Work\n\nStatus: In progress\n'
  );
  await writeFile(
    path.join(target, '.durable-context-solo/install.json'),
    JSON.stringify(
      {
        schemaVersion: 1,
        packageName: 'durable-context-solo',
        installedVersion: '1.1.0',
        firstInstalledVersion: '1.0.0',
        firstInstalledAt: '2026-01-01T00:00:00.000Z',
        lastUpdatedAt: '2026-01-02T00:00:00.000Z',
        projectName: 'Update App',
        installedSkills: ['plan-with-context', 'devils-advocate']
      },
      null,
      2
    ) + '\n'
  );

  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    'update',
    '--target',
    target
  ]);

  assert.match(stdout, /update AGENTS\.md Durable Context Solo section/);
  assert.match(stdout, /remove retired skill \.agents\/skills\/devils-advocate/);
  assert.match(stdout, /replace \.agents\/skills\/plan-with-context/);

  const updatedSkill = await readFile(
    path.join(target, '.agents/skills/plan-with-context/SKILL.md'),
    'utf8'
  );
  assert.match(updatedSkill, /# Plan With Context/);
  assert.match(updatedSkill, /native agent planning/);
  assert.doesNotMatch(updatedSkill, /Locally edited/);
  assert.equal(await exists(path.join(target, '.agents/skills/challenge/SKILL.md')), true);
  assert.equal(await exists(path.join(target, '.agents/skills/devils-advocate')), false);

  const skillsReadme = await readFile(path.join(target, '.agents/skills/README.md'), 'utf8');
  assert.match(skillsReadme, /User notes stay here/);
  assert.match(skillsReadme, /<!-- durable-context-solo:skills:start -->/);
  assert.match(skillsReadme, /project-profile-baseline/);
  assert.doesNotMatch(skillsReadme, /stale durable skill list/);
  assert.match(skillsReadme, /reference docs section stays here/);

  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(agents, /\.agents\/skills\/plan-with-context\/SKILL\.md/);
  assert.doesNotMatch(agents, /stale durable guidance/);

  assert.equal(await readFile(path.join(target, 'context/README.md'), 'utf8'), '# User Context\n');
  assert.equal(await readFile(path.join(target, 'decisions/README.md'), 'utf8'), '# User Decisions\n');
  assert.match(await readFile(profilePath, 'utf8'), /- Current cycle: sprint-12/);
  assert.equal(
    await readFile(path.join(target, 'context/initiatives/legacy-work/README.md'), 'utf8'),
    '# Legacy Work\n\nStatus: In progress\n'
  );

  const metadata = JSON.parse(
    await readFile(path.join(target, '.durable-context-solo/install.json'), 'utf8')
  );
  assert.equal(metadata.installedVersion, packageJson.version);
  assert.equal(metadata.projectName, 'Update App');
  assert.equal(metadata.firstInstalledVersion, '1.0.0');
  assert.equal(metadata.firstInstalledAt, '2026-01-01T00:00:00.000Z');
  assert.deepEqual(metadata.installedSkills, [
    'durable-context-solo',
    'project-profile-baseline',
    'project-profile-refresh',
    'plan-with-context',
    'challenge',
    'dive-into-plan',
    'backfill-with-context'
  ]);

  await writeFile(
    path.join(target, '.agents/skills/plan-with-context/SKILL.md'),
    '# Dry-run local edit\n'
  );

  await execFileAsync(process.execPath, [
    cliPath,
    'update',
    '--target',
    target,
    '--dry-run'
  ]);

  assert.equal(
    await readFile(path.join(target, '.agents/skills/plan-with-context/SKILL.md'), 'utf8'),
    '# Dry-run local edit\n'
  );
});

test('solo and collaborative editions refuse to manage the same project', async () => {
  const collaborativeTarget = await mkdtemp(path.join(tmpdir(), 'durable-context-edition-'));
  await execFileAsync(process.execPath, [
    collaborativeCliPath,
    'init',
    '--target',
    collaborativeTarget,
    '--project-name',
    'Collaborative App'
  ]);

  await assert.rejects(
    execFileAsync(process.execPath, [
      cliPath,
      'init',
      '--target',
      collaborativeTarget,
      '--project-name',
      'Collaborative App'
    ]),
    /cannot manage a project initialized by durable-context/
  );

  const soloTarget = await mkdtemp(path.join(tmpdir(), 'durable-context-edition-'));
  await execFileAsync(process.execPath, [
    cliPath,
    'init',
    '--target',
    soloTarget,
    '--project-name',
    'Solo App'
  ]);

  await assert.rejects(
    execFileAsync(process.execPath, [
      collaborativeCliPath,
      'init',
      '--target',
      soloTarget,
      '--project-name',
      'Solo App'
    ]),
    /cannot manage a project initialized by durable-context-solo/
  );
});

test('skills preserve profiling, focused distribution, lightweight state, and direct decisions', async () => {
  const skillsRoot = path.join(packageRoot, 'template/.agents/skills');
  const frontDoor = await readFile(path.join(skillsRoot, 'durable-context-solo/SKILL.md'), 'utf8');
  const planning = await readFile(path.join(skillsRoot, 'plan-with-context/SKILL.md'), 'utf8');
  const dive = await readFile(path.join(skillsRoot, 'dive-into-plan/SKILL.md'), 'utf8');
  const backfill = await readFile(path.join(skillsRoot, 'backfill-with-context/SKILL.md'), 'utf8');

  assert.match(frontDoor, /Do not rediscover known/);
  assert.match(frontDoor, /Do not add phases/);
  assert.match(planning, /every\s+Present or External concern/);
  assert.match(planning, /Do not begin implementation/);
  assert.match(dive, /one concern at a time/);
  assert.match(dive, /synthesis pass/);
  assert.match(dive, /directly as the next self-contained root ADR/);
  assert.match(backfill, /Observed, Human-confirmed, Inferred, and Unknown/);
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
