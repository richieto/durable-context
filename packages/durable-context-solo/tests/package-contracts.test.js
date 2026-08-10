import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';
import { collectPackageContractErrors } from '../../../test-support/package-contracts.js';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exactFilePairs = [
  [
    'template/context/_templates/initiative/README.md',
    'template/.agents/skills/durable-context-solo/assets/initiative/README.md'
  ],
  [
    'template/context/_templates/initiative/plan.md',
    'template/.agents/skills/durable-context-solo/assets/initiative/plan.md'
  ]
];

test('package skills, markers, links, and fallback assets satisfy their contracts', async () => {
  assert.deepEqual(await collectPackageContractErrors({ packageRoot, exactFilePairs }), []);
});
