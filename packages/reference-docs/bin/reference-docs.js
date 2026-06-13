#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runCli, reportError } from '../lib/installer.js';

const cliName = 'reference-docs';
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

const agentsStart = '<!-- reference-docs:start -->';
const agentsEnd = '<!-- reference-docs:end -->';

const skills = [
  {
    name: 'reference-from-tags',
    readmeEntry:
      '- `reference-from-tags` - invoke explicitly to refresh `reference/` from the diff between two release tags.'
  },
  {
    name: 'reference-baseline',
    readmeEntry:
      '- `reference-baseline` - invoke explicitly for a first baseline pass under `reference/`.'
  }
];

function renderAgentSection(projectName) {
  return `${agentsStart}
## Reference Docs

Release-anchored reference under [\`reference/\`](reference/). Describes accepted behavior as of a release tag or baseline — not edited as a side effect of feature work.

Authoring workflow: [\`reference/_authoring/\`](reference/_authoring/README.md).

Invocation-only skills — ask by name:

- [\`.agents/skills/reference-from-tags/SKILL.md\`](.agents/skills/reference-from-tags/SKILL.md) — refresh from a tag-to-tag diff.
- [\`.agents/skills/reference-baseline/SKILL.md\`](.agents/skills/reference-baseline/SKILL.md) — document current accepted behavior.
${agentsEnd}`;
}

const config = {
  cliName,
  packageRoot,
  packageJson,
  summaryLabel: 'Reference Docs',
  metadataPath: '.reference-docs/install.json',
  skills,
  agents: {
    start: agentsStart,
    end: agentsEnd,
    render: renderAgentSection
  },
  nextSteps: [
    'Then: invoke .agents/skills/reference-baseline/SKILL.md for a first baseline, or reference-from-tags at release time.'
  ]
};

runCli(config, process.argv.slice(2)).catch((error) => reportError(error, cliName));
