#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runCli, reportError } from '../lib/installer.js';

const cliName = 'durable-context-solo';
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

const agentsStart = '<!-- durable-context-solo:start -->';
const agentsEnd = '<!-- durable-context-solo:end -->';

const skills = [
  {
    name: 'durable-context-solo',
    readmeEntry:
      '- `durable-context-solo` - recommended front door for focused repository-owned planning across sessions.'
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
      '- `backfill-with-context` - reconstruct a named initiative after ordinary work grows beyond its original plan.'
  }
];

function renderAgentSection(projectName) {
  return `${agentsStart}
## Durable Context Solo

Working context under [\`context/\`](context/); durable decisions under [\`decisions/\`](decisions/).
Initiatives under [\`context/initiatives/\`](context/initiatives/) are disposable; promote accepted decisions to [\`decisions/\`](decisions/).

Recommended invocation-only front door:

- [\`.agents/skills/durable-context-solo/SKILL.md\`](.agents/skills/durable-context-solo/SKILL.md) — resume a named initiative and continue to its next meaningful boundary.

Advanced direct entry points:

- [\`.agents/skills/project-profile-baseline/SKILL.md\`](.agents/skills/project-profile-baseline/SKILL.md) — populate \`context/project-profile.md\`.
- [\`.agents/skills/project-profile-refresh/SKILL.md\`](.agents/skills/project-profile-refresh/SKILL.md) — refresh stable repo-wide profile facts.
- [\`.agents/skills/plan-with-context/SKILL.md\`](.agents/skills/plan-with-context/SKILL.md) — draft a plan in \`plan.md\`.
- [\`.agents/skills/devils-advocate/SKILL.md\`](.agents/skills/devils-advocate/SKILL.md) — critique a draft plan before distribution.
- [\`.agents/skills/dive-into-plan/SKILL.md\`](.agents/skills/dive-into-plan/SKILL.md) — interrogate gaps, distribute into per-concern docs, promote to [\`decisions/\`](decisions/).
- [\`.agents/skills/backfill-with-context/SKILL.md\`](.agents/skills/backfill-with-context/SKILL.md) — reconstruct context from existing work.

[\`context/project-profile.md\`](context/project-profile.md) — source-backed capabilities, concern inventory, commands, and operating facts.
${agentsEnd}`;
}

const config = {
  cliName,
  packageRoot,
  packageJson,
  summaryLabel: 'Durable Context Solo',
  metadataPath: '.durable-context-solo/install.json',
  incompatibleInstallations: [
    { packageName: 'durable-context', metadataPath: '.durable-context/install.json' }
  ],
  skills,
  agents: {
    start: agentsStart,
    end: agentsEnd,
    render: renderAgentSection
  },
  nextSteps: [
    'First: invoke .agents/skills/project-profile-baseline/SKILL.md to inventory stable repository capabilities.',
    'Then: invoke .agents/skills/durable-context-solo/SKILL.md with a named meaningful initiative.'
  ]
};

runCli(config, process.argv.slice(2)).catch((error) => reportError(error, cliName));
