import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';
import { collectPackageContractErrors } from '../../../test-support/package-contracts.js';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('package skills, markers, and links satisfy their contracts', async () => {
  assert.deepEqual(await collectPackageContractErrors({ packageRoot }), []);
});
