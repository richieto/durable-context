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
      '- `reference-from-tags` - invoke explicitly to refresh `REFERENCE_ROOT/` from the diff between two release tags.'
  },
  {
    name: 'reference-baseline',
    readmeEntry:
      '- `reference-baseline` - invoke explicitly for a first baseline pass under `REFERENCE_ROOT/`.'
  }
];

function renderAgentSection(projectName) {
  return `${agentsStart}
## Reference Docs

Release-anchored reference under [\`REFERENCE_ROOT/\`](REFERENCE_ROOT/). Describes accepted behavior as of a release tag or baseline — not edited as a side effect of feature work.

Authoring workflow: [\`REFERENCE_ROOT/_authoring/\`](REFERENCE_ROOT/_authoring/README.md).

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
  payloadRoot: {
    optionName: 'reference-root',
    help: 'Relative reference root. Defaults to reference.',
    metadataKey: 'referenceRoot',
    defaultValue: 'reference',
    templateRoot: 'reference'
  },
  managedFiles: [
    {
      source: '.agents/skills/reference-from-tags/SKILL.md',
      target: '.agents/skills/reference-from-tags/SKILL.md'
    },
    {
      source: '.agents/skills/reference-baseline/SKILL.md',
      target: '.agents/skills/reference-baseline/SKILL.md'
    },
    {
      source: 'reference/_authoring/workflow.md',
      target: 'REFERENCE_ROOT/_authoring/workflow.md'
    },
    {
      source: 'reference/_authoring/README.md',
      target: 'REFERENCE_ROOT/_authoring/README.md'
    }
  ],
  projectFiles: [
    {
      source: 'reference/_authoring/project.md',
      target: 'REFERENCE_ROOT/_authoring/project.md'
    }
  ],
  legacyManagedHashes: {
    '.agents/skills/reference-baseline/SKILL.md': [
      'e70c7612b8fdaa9a161aa3087de5ed502bb502a24174b5f1abd72ba73f8de0d0'
    ],
    '.agents/skills/reference-from-tags/SKILL.md': [
      '93d350e609756c7f111f247fd7391b5f5ae40b67cf2c8fcbad25da86db7c93d5'
    ],
    'reference/_authoring/workflow.md': [
      '8c4a51b35a2077ff2457195d10ef407c1eee0f3de199f8dd260c41e62c5b1080'
    ],
    'reference/_authoring/README.md': [
      '619e526dbcfa0694fbcfa5277c8997b72c6c8cbdad9a589f5bd6dc7470d9f0ce'
    ]
  },
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
