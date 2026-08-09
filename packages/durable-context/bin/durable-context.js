#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runCli, reportError } from '../lib/installer.js';

const cliName = 'durable-context';
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

const agentsStart = '<!-- durable-context:start -->';
const agentsEnd = '<!-- durable-context:end -->';

const skills = [
  {
    name: 'durable-context',
    readmeEntry:
      '- `durable-context` - recommended front door; continue a named initiative to its next meaningful boundary.'
  },
  {
    name: 'project-profile-baseline',
    readmeEntry:
      '- `project-profile-baseline` - invoke explicitly to populate `context/project-profile.md` from source-backed repo facts.'
  },
  {
    name: 'project-profile-refresh',
    readmeEntry:
      '- `project-profile-refresh` - invoke explicitly to refresh stable repo-wide facts in `context/project-profile.md`.'
  },
  {
    name: 'plan-with-context',
    readmeEntry:
      '- `plan-with-context` - invoke explicitly to draft a durable plan in an initiative `plan.md`.'
  },
  {
    name: 'devils-advocate',
    readmeEntry:
      '- `devils-advocate` - invoke explicitly to challenge a draft plan before distribution.'
  },
  {
    name: 'dive-into-plan',
    readmeEntry:
      '- `dive-into-plan` - invoke explicitly to interrogate a settled plan, distribute it into initiative docs, and promote decisions.'
  },
  {
    name: 'backfill-with-context',
    readmeEntry:
      '- `backfill-with-context` - advanced entry point to reconstruct a named initiative from existing branch work.'
  },
  {
    name: 'checkpoint-context',
    readmeEntry:
      '- `checkpoint-context` - advanced entry point to validate and record initiative lifecycle state.'
  }
];

function renderAgentSection(projectName) {
  return `${agentsStart}
## Durable Context

Working context under [\`context/\`](context/); durable decisions under [\`decisions/\`](decisions/).
Initiatives under [\`context/initiatives/\`](context/initiatives/) are disposable; promote accepted decisions to [\`decisions/\`](decisions/).

Recommended invocation-only front door:

- [\`.agents/skills/durable-context/SKILL.md\`](.agents/skills/durable-context/SKILL.md) — continue a named initiative to its next meaningful boundary.

Advanced direct entry points:

- [\`.agents/skills/project-profile-baseline/SKILL.md\`](.agents/skills/project-profile-baseline/SKILL.md) — populate \`context/project-profile.md\`.
- [\`.agents/skills/project-profile-refresh/SKILL.md\`](.agents/skills/project-profile-refresh/SKILL.md) — refresh stable repo-wide profile facts.
- [\`.agents/skills/plan-with-context/SKILL.md\`](.agents/skills/plan-with-context/SKILL.md) — draft a plan in \`plan.md\`.
- [\`.agents/skills/devils-advocate/SKILL.md\`](.agents/skills/devils-advocate/SKILL.md) — critique a draft plan before distribution.
- [\`.agents/skills/dive-into-plan/SKILL.md\`](.agents/skills/dive-into-plan/SKILL.md) — interrogate gaps, distribute into per-concern docs, promote to [\`decisions/\`](decisions/).
- [\`.agents/skills/backfill-with-context/SKILL.md\`](.agents/skills/backfill-with-context/SKILL.md) — reconstruct context after existing work grows into an initiative.
- [\`.agents/skills/checkpoint-context/SKILL.md\`](.agents/skills/checkpoint-context/SKILL.md) — validate and record lifecycle state.

[\`context/project-profile.md\`](context/project-profile.md) — repo-wide stack, commands, and test facts when populated.
${agentsEnd}`;
}

const config = {
  cliName,
  packageRoot,
  packageJson,
  summaryLabel: 'Durable Context',
  metadataPath: '.durable-context/install.json',
  incompatibleInstallations: [
    { packageName: 'durable-context-solo', metadataPath: '.durable-context-solo/install.json' }
  ],
  skills,
  agents: {
    start: agentsStart,
    end: agentsEnd,
    render: renderAgentSection
  },
  nextSteps: [
    'Optional: invoke .agents/skills/project-profile-baseline/SKILL.md to populate context/project-profile.md.',
    'Then: invoke .agents/skills/durable-context/SKILL.md with a named initiative.'
  ]
};

runCli(config, process.argv.slice(2)).catch((error) => reportError(error, cliName));
