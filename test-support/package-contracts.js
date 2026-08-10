import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
const relativeLinkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
const markerPattern = /<!--\s*([a-z0-9][a-z0-9-]*(?::[a-z0-9][a-z0-9-]*)*):(start|end)\s*-->/g;

export async function collectPackageContractErrors({ packageRoot, exactFilePairs = [] }) {
  const errors = [];
  const templateRoot = path.join(packageRoot, 'template');
  const skillsRoot = path.join(templateRoot, '.agents/skills');

  await validateSkills(skillsRoot, errors);
  await validateManagedMarkers(templateRoot, errors);
  await validateExactFilePairs(packageRoot, exactFilePairs, errors);

  return errors;
}

async function validateSkills(skillsRoot, errors) {
  const entries = await readdir(skillsRoot, { withFileTypes: true }).catch(() => []);
  const skillDirs = entries.filter((entry) => entry.isDirectory());

  if (skillDirs.length === 0) {
    errors.push(`no skill directories found under ${skillsRoot}`);
    return;
  }

  for (const entry of skillDirs) {
    const skillRoot = path.join(skillsRoot, entry.name);
    const skillPath = path.join(skillRoot, 'SKILL.md');
    const content = await readFile(skillPath, 'utf8').catch(() => undefined);

    if (content === undefined) {
      errors.push(`${relative(skillsRoot, skillPath)}: missing SKILL.md`);
      continue;
    }

    validateFrontmatter(entry.name, skillPath, content, skillsRoot, errors);

    for (const markdownPath of await markdownFiles(skillRoot)) {
      const markdown = await readFile(markdownPath, 'utf8');
      await validateRelativeLinks(markdownPath, markdown, skillsRoot, errors);
    }
  }
}

function validateFrontmatter(folderName, skillPath, content, root, errors) {
  const match = content.match(frontmatterPattern);
  const displayPath = relative(root, skillPath);

  if (!match) {
    errors.push(`${displayPath}: missing or malformed frontmatter`);
    return;
  }

  const name = field(match[1], 'name');
  const description = field(match[1], 'description');

  if (!name) errors.push(`${displayPath}: frontmatter name is required`);
  if (!description) errors.push(`${displayPath}: frontmatter description is required`);
  if (name && name !== folderName) {
    errors.push(`${displayPath}: frontmatter name ${name} does not match folder ${folderName}`);
  }
}

async function validateRelativeLinks(markdownPath, content, root, errors) {
  for (const match of content.matchAll(relativeLinkPattern)) {
    const destination = match[1].trim().replace(/^<|>$/g, '');
    if (
      !destination ||
      destination.startsWith('#') ||
      destination.startsWith('/') ||
      /^[a-z][a-z0-9+.-]*:/i.test(destination)
    ) {
      continue;
    }

    const withoutFragment = destination.split('#', 1)[0];
    if (!withoutFragment) continue;

    const resolved = path.resolve(path.dirname(markdownPath), decodeURIComponent(withoutFragment));
    const exists = await stat(resolved).then(() => true, () => false);
    if (!exists) {
      errors.push(`${relative(root, markdownPath)}: broken relative link ${destination}`);
    }
  }
}

async function validateManagedMarkers(templateRoot, errors) {
  for (const markdownPath of await markdownFiles(templateRoot)) {
    const content = await readFile(markdownPath, 'utf8');
    const stack = [];

    for (const match of content.matchAll(markerPattern)) {
      const [, marker, edge] = match;
      if (edge === 'start') {
        if (stack.length > 0) {
          errors.push(
            `${relative(templateRoot, markdownPath)}: managed marker ${marker} is nested inside ${stack.at(-1)}`
          );
        }
        stack.push(marker);
        continue;
      }

      const open = stack.pop();
      if (open !== marker) {
        errors.push(
          `${relative(templateRoot, markdownPath)}: managed marker ${marker}:end does not close ${open ?? 'an open marker'}`
        );
      }
    }

    for (const marker of stack) {
      errors.push(`${relative(templateRoot, markdownPath)}: managed marker ${marker}:start is not closed`);
    }
  }
}

async function validateExactFilePairs(packageRoot, pairs, errors) {
  for (const [left, right] of pairs) {
    const [leftContent, rightContent] = await Promise.all([
      readFile(path.join(packageRoot, left), 'utf8').catch(() => undefined),
      readFile(path.join(packageRoot, right), 'utf8').catch(() => undefined)
    ]);

    if (leftContent === undefined || rightContent === undefined) {
      errors.push(`${left} and ${right}: exact-file pair is missing a file`);
    } else if (leftContent !== rightContent) {
      errors.push(`${left} and ${right}: exact-file pair differs`);
    }
  }
}

async function markdownFiles(root) {
  const files = [];
  const entries = await readdir(root, { withFileTypes: true }).catch(() => []);

  for (const entry of entries) {
    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(entryPath));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(entryPath);
  }

  return files;
}

function field(frontmatter, name) {
  const match = frontmatter.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
  return match?.[1].trim().replace(/^['"]|['"]$/g, '');
}

function relative(root, filePath) {
  return path.relative(root, filePath).split(path.sep).join('/');
}
