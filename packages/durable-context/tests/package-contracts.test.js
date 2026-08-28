import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';
import { collectPackageContractErrors } from '../../../test-support/package-contracts.js';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exactFilePairs = [
  [
    'template/context/_templates/initiative/README.md',
    'template/.agents/skills/dc/assets/initiative/README.md'
  ],
  [
    'template/context/_templates/initiative/plan.md',
    'template/.agents/skills/dc/assets/initiative/plan.md'
  ],
  [
    'template/context/_templates/initiative/release-doc-notes.md',
    '../durable-context-solo/template/context/_templates/initiative/release-doc-notes.md'
  ]
];

test('package skills, markers, links, and fallback assets satisfy their contracts', async () => {
  assert.deepEqual(await collectPackageContractErrors({ packageRoot, exactFilePairs }), []);
});

test('package contract validation reports malformed package fixtures', async () => {
  const fixture = await mkdtemp(path.join(tmpdir(), 'package-contracts-'));
  const skillRoot = path.join(fixture, 'template/.agents/skills/example');
  const malformedSkillRoot = path.join(fixture, 'template/.agents/skills/malformed');
  await mkdir(path.join(skillRoot, 'references'), { recursive: true });
  await mkdir(malformedSkillRoot, { recursive: true });
  await writeFile(
    path.join(skillRoot, 'SKILL.md'),
    [
      '---',
      'name: wrong-name',
      '---',
      '',
      '# Example',
      '',
      '[Missing](references/missing.md)',
      '<!-- example:outer:start -->',
      '<!-- example:inner:start -->',
      '<!-- example:outer:end -->',
      ''
    ].join('\n')
  );
  await writeFile(
    path.join(malformedSkillRoot, 'SKILL.md'),
    'name: malformed\ndescription: missing delimiters\n'
  );
  await writeFile(path.join(fixture, 'left.md'), 'left\n');
  await writeFile(path.join(fixture, 'right.md'), 'right\n');

  const errors = await collectPackageContractErrors({
    packageRoot: fixture,
    exactFilePairs: [['left.md', 'right.md']]
  });

  assert.match(errors.join('\n'), /frontmatter description is required/);
  assert.match(errors.join('\n'), /frontmatter name wrong-name does not match folder example/);
  assert.match(errors.join('\n'), /malformed\/SKILL\.md: missing or malformed frontmatter/);
  assert.match(errors.join('\n'), /broken relative link references\/missing\.md/);
  assert.match(errors.join('\n'), /managed marker example:inner is nested inside example:outer/);
  assert.match(errors.join('\n'), /managed marker example:outer:end does not close example:inner/);
  assert.match(errors.join('\n'), /exact-file pair differs/);

  await rm(fixture, { recursive: true, force: true });
});
