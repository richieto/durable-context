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
const cliPath = path.join(packageRoot, 'bin/durable-context.js');
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

test('installed skills encode the front-door, backfill, review, and routing scenarios', async () => {
  const skillsRoot = path.join(packageRoot, 'template/.agents/skills');
  const frontDoor = await readFile(path.join(skillsRoot, 'durable-context/SKILL.md'), 'utf8');
  const backfill = await readFile(path.join(skillsRoot, 'backfill-with-context/SKILL.md'), 'utf8');
  const challenge = await readFile(path.join(skillsRoot, 'challenge/SKILL.md'), 'utf8');
  const dive = await readFile(path.join(skillsRoot, 'dive-into-plan/SKILL.md'), 'utf8');

  assert.match(frontDoor, /recommend the agent's native planning behavior/);
  assert.match(frontDoor, /Never infer either ID from the\s+branch name/);
  assert.match(frontDoor, /Current cycle/);
  assert.match(frontDoor, /flat `context\/initiatives\/<slug>\/`/);
  assert.match(frontDoor, /legacy and leave it unchanged/);
  assert.match(backfill, /Observed:/);
  assert.match(backfill, /Human-confirmed:/);
  assert.match(backfill, /Do not fabricate completed/);
  assert.match(challenge, /advice, never as decision authority/);
  assert.match(challenge, /Continue unrelated work/);
  assert.match(dive, /Route Before Scaffolding/);
  assert.match(dive, /Local.*External.*Hybrid.*Not applicable/);
});

test('init installs the default cycle scaffold and decision log', async () => {
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
    await exists(path.join(target, '.agents/skills/durable-context/SKILL.md')),
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
    await exists(path.join(target, '.agents/skills/checkpoint-context/scripts/validate-initiative.mjs')),
    true
  );

  assert.equal(await exists(path.join(target, 'context/current.md')), false);
  assert.equal(await exists(path.join(target, 'context/releases')), false);

  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(agents, /# Agent Guidance - Planning App/);
  assert.match(agents, /<!-- durable-context:start -->/);
  assert.match(agents, /\.agents\/skills\/durable-context\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/project-profile-baseline\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/project-profile-refresh\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/plan-with-context\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/challenge\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/dive-into-plan\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/backfill-with-context\/SKILL\.md/);
  assert.match(agents, /\.agents\/skills\/checkpoint-context\/SKILL\.md/);

  const initiativeTemplate = await readFile(
    path.join(target, 'context/_templates/initiative/README.md'),
    'utf8'
  );
  assert.match(initiativeTemplate, /<!-- durable-context:lifecycle:start -->/);
  assert.match(initiativeTemplate, /\| Operations \| TBD \|/);
  assert.equal(
    initiativeTemplate,
    await readFile(
      path.join(target, '.agents/skills/durable-context/assets/initiative/README.md'),
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

  const profile = await readFile(path.join(target, 'context/project-profile.md'), 'utf8');
  assert.match(profile, /Project: Planning App/);
  assert.match(profile, /<!-- durable-context:cycle:start -->/);
  assert.match(profile, /- Current cycle: default/);
  assert.match(profile, /- Naming: Project-defined/);
  assert.equal(profile.match(/^- Current cycle:/gm)?.length, 1);
  assert.doesNotMatch(profile, /PROJECT_NAME/);

  const backlog = await readFile(
    path.join(target, 'context/_templates/initiative/backlog.md'),
    'utf8'
  );
  const followUp = await readFile(
    path.join(target, 'context/_templates/initiative/follow-up.md'),
    'utf8'
  );
  assert.match(backlog, /bounded trace of implementation state/);
  assert.match(backlog, /not the project backlog/);
  assert.match(followUp, /destination system owns the work after transfer/);

  const metadata = JSON.parse(
    await readFile(path.join(target, '.durable-context/install.json'), 'utf8')
  );
  assert.equal(metadata.installedVersion, packageJson.version);
  assert.equal(metadata.projectName, 'Planning App');
  assert.deepEqual(metadata.installedSkills, [
    'durable-context',
    'project-profile-baseline',
    'project-profile-refresh',
    'plan-with-context',
    'challenge',
    'dive-into-plan',
    'backfill-with-context',
    'checkpoint-context'
  ]);

  const status = await execFileAsync(process.execPath, [cliPath, 'status', '--target', target]);
  assert.match(status.stdout, new RegExp(`Installed version: ${escapeRegExp(packageJson.version)}`));
  assert.match(
    status.stdout,
    /Installed skills: durable-context, project-profile-baseline, project-profile-refresh, plan-with-context, challenge, dive-into-plan, backfill-with-context, checkpoint-context/
  );
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

test('update refreshes managed agent assets without replacing project work', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'durable-context-update-'));

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
      '<!-- durable-context:skills:start -->',
      'stale durable skill list',
      '<!-- durable-context:skills:end -->',
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
      '<!-- durable-context:start -->',
      'stale durable guidance',
      '<!-- durable-context:end -->',
      ''
    ].join('\n')
  );
  await writeFile(path.join(target, 'context/README.md'), '# User Context\n');
  await writeFile(path.join(target, 'decisions/README.md'), '# User Decisions\n');
  const profilePath = path.join(target, 'context/project-profile.md');
  const customizedProfile = (await readFile(profilePath, 'utf8')).replace(
    '- Current cycle: default',
    '- Current cycle: release-2'
  );
  await writeFile(profilePath, customizedProfile);
  await writeFile(
    path.join(target, 'context/_templates/initiative/README.md'),
    '# Project-owned legacy initiative template\n'
  );
  await mkdir(path.join(target, 'context/initiatives/legacy-work'), { recursive: true });
  await writeFile(
    path.join(target, 'context/initiatives/legacy-work/README.md'),
    '# Legacy Work\n\nStatus: In progress\n'
  );
  await writeFile(
    path.join(target, '.durable-context/install.json'),
    JSON.stringify(
      {
        schemaVersion: 1,
        packageName: 'durable-context',
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

  assert.match(stdout, /update AGENTS\.md Durable Context section/);
  assert.match(stdout, /remove retired skill \.agents\/skills\/devils-advocate/);
  assert.match(stdout, /replace \.agents\/skills\/plan-with-context/);

  const updatedSkill = await readFile(
    path.join(target, '.agents/skills/plan-with-context/SKILL.md'),
    'utf8'
  );
  assert.match(updatedSkill, /# Plan With Context/);
  assert.match(updatedSkill, /native planning capability/);
  assert.doesNotMatch(updatedSkill, /Locally edited/);
  assert.equal(await exists(path.join(target, '.agents/skills/challenge/SKILL.md')), true);
  assert.equal(await exists(path.join(target, '.agents/skills/devils-advocate')), false);

  const skillsReadme = await readFile(path.join(target, '.agents/skills/README.md'), 'utf8');
  assert.match(skillsReadme, /User notes stay here/);
  assert.match(skillsReadme, /<!-- durable-context:skills:start -->/);
  assert.match(skillsReadme, /project-profile-baseline/);
  assert.match(skillsReadme, /durable-context/);
  assert.match(skillsReadme, /backfill-with-context/);
  assert.doesNotMatch(skillsReadme, /stale durable skill list/);
  assert.match(skillsReadme, /reference docs section stays here/);

  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(agents, /\.agents\/skills\/plan-with-context\/SKILL\.md/);
  assert.doesNotMatch(agents, /stale durable guidance/);

  assert.equal(await readFile(path.join(target, 'context/README.md'), 'utf8'), '# User Context\n');
  assert.equal(await readFile(path.join(target, 'decisions/README.md'), 'utf8'), '# User Decisions\n');
  assert.match(await readFile(profilePath, 'utf8'), /- Current cycle: release-2/);
  assert.equal(
    await readFile(path.join(target, 'context/_templates/initiative/README.md'), 'utf8'),
    '# Project-owned legacy initiative template\n'
  );
  assert.equal(
    await readFile(path.join(target, 'context/initiatives/legacy-work/README.md'), 'utf8'),
    '# Legacy Work\n\nStatus: In progress\n'
  );

  const metadata = JSON.parse(
    await readFile(path.join(target, '.durable-context/install.json'), 'utf8')
  );
  assert.equal(metadata.installedVersion, packageJson.version);
  assert.equal(metadata.projectName, 'Update App');
  assert.equal(metadata.firstInstalledVersion, '1.0.0');
  assert.equal(metadata.firstInstalledAt, '2026-01-01T00:00:00.000Z');
  assert.deepEqual(metadata.installedSkills, [
    'durable-context',
    'project-profile-baseline',
    'project-profile-refresh',
    'plan-with-context',
    'challenge',
    'dive-into-plan',
    'backfill-with-context',
    'checkpoint-context'
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
