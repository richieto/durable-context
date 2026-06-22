import { execPath } from 'node:process';
import { constants as fsConstants } from 'node:fs';
import { access, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const agentsSkillsRelative = '.agents/skills';

/**
 * Generic installer shared by durable-context and reference-docs packages.
 *
 * Each package supplies a `config` describing its payload:
 *   - cliName:        bin name, used in help and error text
 *   - packageRoot:    absolute path to the package directory
 *   - packageJson:    parsed package.json of the package
 *   - skills:         [{ name, readmeEntry }] copied into .agents/skills
 *   - agents:         { start, end, render(projectName) } AGENTS.md section
 *   - metadataPath:   relative path of the install metadata file in the target
 *   - nextSteps:      strings printed after a successful install
 *   - summaryLabel:   short label used in the final summary line
 */
export async function runCli(config, argv) {
  const args = parseArgs(argv, config);

  if (args.help) {
    printHelp(config);
    return;
  }

  if (args.version) {
    console.log(config.packageJson.version);
    return;
  }

  if (args.command === 'status') {
    await printStatus(config, args.target);
    return;
  }

  if (args.command !== 'init' && args.command !== 'update') {
    throw new Error(`Unknown command "${args.command}". Run "${config.cliName} --help".`);
  }

  const targetRoot = path.resolve(args.target);
  const projectName = await resolveProjectName(config, args, targetRoot);
  const installer = new Installer({
    config,
    targetRoot,
    projectName,
    force: args.force,
    dryRun: args.dryRun
  });

  if (args.command === 'init') {
    await installer.init();
    return;
  }

  await installer.update();
}

function parseArgs(argv, config) {
  const options = {
    command: 'help',
    target: process.cwd(),
    projectName: undefined,
    force: false,
    dryRun: false,
    help: false,
    version: false
  };

  const positionals = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--version' || arg === '-v') {
      options.version = true;
      continue;
    }

    if (arg === '--force') {
      options.force = true;
      continue;
    }

    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (arg.startsWith('--target=')) {
      options.target = arg.slice('--target='.length);
      continue;
    }

    if (arg === '--target') {
      options.target = readOptionValue(argv, index, '--target');
      index += 1;
      continue;
    }

    if (arg.startsWith('--project-name=')) {
      options.projectName = arg.slice('--project-name='.length);
      continue;
    }

    if (arg === '--project-name') {
      options.projectName = readOptionValue(argv, index, '--project-name');
      index += 1;
      continue;
    }

    if (arg.startsWith('-')) {
      throw new Error(`Unknown option "${arg}". Run "${config.cliName} --help".`);
    }

    positionals.push(arg);
  }

  if (positionals.length > 1) {
    throw new Error(`Unexpected arguments: ${positionals.slice(1).join(' ')}`);
  }

  options.command = positionals[0] ?? (options.help || options.version ? 'meta' : 'help');
  options.help = options.help || options.command === 'help';

  return options;
}

function readOptionValue(argv, index, optionName) {
  const value = argv[index + 1];

  if (!value || value.startsWith('-')) {
    throw new Error(`${optionName} requires a value.`);
  }

  return value;
}

function printHelp(config) {
  console.log(`${config.cliName}

Usage:
  ${config.cliName} init [options]
  ${config.cliName} update [options]
  ${config.cliName} status [options]

Options:
  --target <path>          Project root to install into. Defaults to cwd.
  --project-name <name>    Name used to replace PROJECT_NAME placeholders.
  --force                  Replace existing generated directories during init.
  --dry-run                Show planned changes without writing files.
  -h, --help               Show help.
  -v, --version            Show package version.

Examples:
  npx ${config.packageJson.name} init --project-name "My App"
  npx ${config.packageJson.name}@latest update
  npx ${config.packageJson.name}@${config.packageJson.version} init --project-name "My App"
  npx ${config.packageJson.name} status --target ../existing-project

The update command refreshes managed agent assets without replacing project work.
The status command reads ${config.metadataPath} from an initialized project.
`);
}

async function inferProjectName(targetRoot) {
  try {
    const packageJson = JSON.parse(await readFile(path.join(targetRoot, 'package.json'), 'utf8'));

    if (typeof packageJson.name === 'string' && packageJson.name.trim()) {
      return packageJson.name.replace(/^@[^/]+\//, '');
    }
  } catch {
    // Fall through to the directory name.
  }

  return path.basename(targetRoot);
}

async function resolveProjectName(config, args, targetRoot) {
  if (args.projectName) {
    return args.projectName;
  }

  if (args.command === 'update') {
    const metadata = await readOptionalJson(path.join(targetRoot, config.metadataPath));

    if (typeof metadata?.projectName === 'string' && metadata.projectName.trim()) {
      return metadata.projectName;
    }
  }

  return inferProjectName(targetRoot);
}

class Installer {
  constructor({ config, targetRoot, projectName, force, dryRun }) {
    this.config = config;
    this.templateDir = path.join(config.packageRoot, 'template');
    this.targetRoot = targetRoot;
    this.projectName = projectName;
    this.force = force;
    this.dryRun = dryRun;
    this.actions = [];
    this.agentsFilePath = path.join(targetRoot, 'AGENTS.md');
  }

  async init() {
    await this.ensureDirectory(this.targetRoot);

    await this.installAgentsFile();
    await this.installSkills();
    await this.installPayloadRoots();
    await this.writeMetadata();

    this.printSummary();
  }

  async update() {
    await this.ensureDirectory(this.targetRoot);

    await this.installAgentsFile();
    await this.updateSkills();
    await this.writeMetadata();

    this.printSummary();
  }

  async installPayloadRoots() {
    const entries = await readdir(this.templateDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name === 'AGENTS.md' || entry.name === '.agents' || entry.name === '.DS_Store') {
        continue;
      }

      await this.copyTemplatePath(entry.name, entry.name);
    }
  }

  async installAgentsFile() {
    const targetFile = await this.findAgentsFile();
    const targetDisplay = path.basename(targetFile);
    this.agentsFilePath = targetFile;

    const section = this.config.agents.render(this.projectName);
    const { start, end } = this.config.agents;

    if (!(await exists(targetFile))) {
      const templateAgents = path.join(this.templateDir, 'AGENTS.md');

      if (await exists(templateAgents)) {
        const text = (await readFile(templateAgents, 'utf8')).replaceAll('PROJECT_NAME', this.projectName);
        await this.writeFile(path.join(this.targetRoot, 'AGENTS.md'), text, 'create AGENTS.md');
        this.agentsFilePath = path.join(this.targetRoot, 'AGENTS.md');
        return;
      }

      await this.writeFile(path.join(this.targetRoot, 'AGENTS.md'), `${section}\n`, 'create AGENTS.md');
      this.agentsFilePath = path.join(this.targetRoot, 'AGENTS.md');
      return;
    }

    const current = await readFile(targetFile, 'utf8');

    if (current.includes(start) && current.includes(end)) {
      const updated = current.replace(
        new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`),
        section
      );

      if (updated === current) {
        this.note(`${targetDisplay} already has the ${this.config.summaryLabel} guidance`);
        return;
      }

      await this.writeFile(targetFile, updated, `update ${targetDisplay} ${this.config.summaryLabel} section`);
      return;
    }

    const separator = current.endsWith('\n') ? '\n' : '\n\n';
    await this.writeFile(
      targetFile,
      `${current}${separator}${section}\n`,
      `append ${this.config.summaryLabel} guidance to ${targetDisplay}`
    );
  }

  async findAgentsFile() {
    const canonicalPath = path.join(this.targetRoot, 'AGENTS.md');

    let entries;

    try {
      entries = await readdir(this.targetRoot, { withFileTypes: true });
    } catch {
      return canonicalPath;
    }

    if (entries.some((entry) => entry.isFile() && entry.name === 'AGENTS.md')) {
      return canonicalPath;
    }

    const match = entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase() === 'agents.md')
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right))[0];

    return match ? path.join(this.targetRoot, match) : canonicalPath;
  }

  async installSkills() {
    for (const skill of this.config.skills) {
      await this.copyTemplatePath(
        `${agentsSkillsRelative}/${skill.name}`,
        `${agentsSkillsRelative}/${skill.name}`
      );
    }

    await this.upsertSkillsReadme();
  }

  async updateSkills() {
    for (const skill of this.config.skills) {
      await this.copyTemplatePath(
        `${agentsSkillsRelative}/${skill.name}`,
        `${agentsSkillsRelative}/${skill.name}`,
        { replaceExisting: true }
      );
    }

    await this.upsertSkillsReadme();
  }

  async upsertSkillsReadme() {
    const readmeTarget = await this.findExistingTargetPath(`${agentsSkillsRelative}/README.md`);
    const readmePath = readmeTarget.exists
      ? readmeTarget.path
      : path.join(this.targetRoot, `${agentsSkillsRelative}/README.md`);
    const readmeDisplay = readmeTarget.exists ? readmeTarget.display : `${agentsSkillsRelative}/README.md`;

    if (!(await exists(readmePath))) {
      await this.copyTemplatePath(`${agentsSkillsRelative}/README.md`, `${agentsSkillsRelative}/README.md`);
      return;
    }

    const current = await readFile(readmePath, 'utf8');
    const section = this.renderSkillsReadmeSection();
    const { start, end } = this.skillsReadmeMarkers();

    if (current.includes(start) && current.includes(end)) {
      const updated = current.replace(
        new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`),
        section
      );

      if (updated === current) {
        this.note(`${readmeDisplay} already has the ${this.config.summaryLabel} skills section`);
        return;
      }

      await this.writeFile(readmePath, updated, `update ${readmeDisplay} ${this.config.summaryLabel} skills section`);
      return;
    }

    const separator = current.endsWith('\n\n') ? '' : current.endsWith('\n') ? '\n' : '\n\n';

    await this.writeFile(
      readmePath,
      `${current}${separator}${section}\n`,
      `append ${this.config.summaryLabel} skills to ${readmeDisplay}`
    );
  }

  skillsReadmeMarkers() {
    const name = this.config.packageJson.name;

    return {
      start: `<!-- ${name}:skills:start -->`,
      end: `<!-- ${name}:skills:end -->`
    };
  }

  renderSkillsReadmeSection() {
    const { start, end } = this.skillsReadmeMarkers();

    return [
      start,
      `## ${this.config.summaryLabel} Skills`,
      '',
      ...this.config.skills.map((skill) => skill.readmeEntry),
      end
    ].join('\n');
  }

  async copyTemplatePath(sourceRelative, targetRelative, { replaceExisting = this.force } = {}) {
    const sourcePath = path.join(this.templateDir, sourceRelative);
    const targetInfo = await this.findExistingTargetPath(targetRelative);

    if (!(await exists(sourcePath))) {
      return false;
    }

    const targetPath = path.join(this.targetRoot, targetRelative);

    if (targetInfo.exists) {
      const variantNote = targetInfo.caseVariant ? ` at ${targetInfo.display}` : '';

      if (!replaceExisting) {
        this.note(`skip ${targetRelative} (already exists${variantNote}; use --force to replace)`);
        return false;
      }

      await this.removePath(targetInfo.path, `replace ${targetInfo.display}`);
    }

    await this.copyRecursive(sourcePath, targetPath, targetRelative);
    return true;
  }

  async findExistingTargetPath(targetRelative) {
    const parts = targetRelative.split('/').filter(Boolean);
    let currentPath = this.targetRoot;
    const displayParts = [];

    for (const part of parts) {
      let entries;

      try {
        entries = await readdir(currentPath, { withFileTypes: true });
      } catch {
        return this.missingTargetPath(targetRelative);
      }

      const exactMatch = entries.find((entry) => entry.name === part);
      const caseMatch = exactMatch ?? entries.find((entry) => entry.name.toLowerCase() === part.toLowerCase());

      if (!caseMatch) {
        return this.missingTargetPath(targetRelative);
      }

      currentPath = path.join(currentPath, caseMatch.name);
      displayParts.push(caseMatch.name);
    }

    const display = displayParts.join('/');

    return {
      caseVariant: display !== targetRelative,
      display,
      exists: true,
      path: currentPath
    };
  }

  missingTargetPath(targetRelative) {
    return {
      caseVariant: false,
      display: targetRelative,
      exists: false,
      path: path.join(this.targetRoot, targetRelative)
    };
  }

  async copyRecursive(sourcePath, targetPath, displayPath) {
    const sourceStats = await stat(sourcePath);

    if (sourceStats.isDirectory()) {
      await this.ensureDirectory(targetPath, `create ${displayPath}/`);
      const entries = await readdir(sourcePath, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.name === '.DS_Store') {
          continue;
        }

        await this.copyRecursive(
          path.join(sourcePath, entry.name),
          path.join(targetPath, entry.name),
          path.posix.join(displayPath, entry.name)
        );
      }

      return;
    }

    const contents = await readFile(sourcePath);
    const transformed = this.transformText(contents);
    await this.writeFile(targetPath, transformed, `create ${displayPath}`);
  }

  transformText(contents) {
    return contents.toString('utf8').replaceAll('PROJECT_NAME', this.projectName);
  }

  async writeMetadata() {
    const metadataPath = path.join(this.targetRoot, this.config.metadataPath);
    const previous = await readOptionalJson(metadataPath);
    const now = new Date().toISOString();
    const metadata = {
      schemaVersion: 1,
      packageName: this.config.packageJson.name,
      installedVersion: this.config.packageJson.version,
      firstInstalledVersion:
        previous?.firstInstalledVersion ?? previous?.installedVersion ?? this.config.packageJson.version,
      firstInstalledAt: previous?.firstInstalledAt ?? previous?.installedAt ?? now,
      lastUpdatedAt: now,
      projectName: this.projectName,
      installedSkills: this.config.skills.map((skill) => skill.name)
    };

    await this.writeFile(
      metadataPath,
      `${JSON.stringify(metadata, null, 2)}\n`,
      `${previous ? 'update' : 'create'} ${this.config.metadataPath}`
    );
  }

  async ensureDirectory(directory, message) {
    if (message) {
      this.note(message);
    }

    if (!this.dryRun) {
      await mkdir(directory, { recursive: true });
    }
  }

  async removePath(filePath, message) {
    this.note(message);

    if (!this.dryRun) {
      await rm(filePath, { recursive: true, force: true });
    }
  }

  async writeFile(filePath, contents, message) {
    this.note(message);

    if (!this.dryRun) {
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, contents);
    }
  }

  note(message) {
    this.actions.push(message);
  }

  printSummary() {
    const prefix = this.dryRun ? '[dry-run] ' : '';

    for (const action of this.actions) {
      console.log(`${prefix}${action}`);
    }

    console.log(`${prefix}${this.config.summaryLabel} ready for ${this.projectName}.`);

    if (!this.dryRun) {
      console.log(`Next: ask your agent to read ${this.agentsFilePath}.`);

      for (const step of this.config.nextSteps ?? []) {
        console.log(step);
      }
    }
  }
}

async function printStatus(config, target) {
  const targetRoot = path.resolve(target);
  const metadataPath = path.join(targetRoot, config.metadataPath);
  const metadata = await readOptionalJson(metadataPath);

  console.log(`${config.summaryLabel} status for ${targetRoot}`);
  console.log(`Running CLI version: ${config.packageJson.version}`);

  if (!metadata) {
    console.log('Installed metadata: not found');
    console.log(`Metadata path: ${config.metadataPath}`);
    return;
  }

  console.log(`Installed version: ${metadata.installedVersion ?? 'Unknown'}`);
  console.log(`Project: ${metadata.projectName ?? 'Unknown'}`);
  console.log(`Installed skills: ${formatList(metadata.installedSkills)}`);
  console.log(`Metadata path: ${config.metadataPath}`);

  if (metadata.installedVersion && metadata.installedVersion !== config.packageJson.version) {
    console.log('Note: running CLI version differs from installed metadata.');
  }
}

function formatList(value) {
  return Array.isArray(value) && value.length > 0 ? value.join(', ') : 'Unknown';
}

async function readOptionalJson(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    return undefined;
  }
}

async function exists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function reportError(error, cliName) {
  console.error(error.message);
  console.error(`Run "${path.basename(execPath)} ${cliName} --help" for usage.`);
  process.exitCode = 1;
}
