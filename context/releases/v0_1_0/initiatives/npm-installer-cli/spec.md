# Spec

## Purpose

Provide a simple way to install the Code-Anchored Context template into an
existing repository so humans can tell their agents to start using the local
`AGENTS.md`, `.agents/skills/`, and `context/` workflow immediately.

## Goals

- Publishable npm package metadata exists.
- A `code-anchored-context init` command installs the template into a target
  project.
- The initializer is safe by default and does not overwrite existing generated
  directories unless `--force` is passed.
- The initializer replaces `PROJECT_NAME` and the initial release slug during
  install.

## Non-Goals

- Do not make consuming projects depend on the package at runtime.
- Do not refresh reference in `reference/`.
- Do not migrate or merge an existing project's bespoke planning system.
- Do not require package dependencies for the initializer.

## Behavior

The normal flow is:

1. A human runs `npx code-anchored-context init` from an existing repository or
   passes `--target <path>`.
2. The command infers the project name from the target `package.json` or folder
   name unless `--project-name` is supplied.
3. The command installs:
   - `AGENTS.md`
   - `.agents/skills/code-anchored-context/SKILL.md`
   - `context/`
   - `reference/` unless `--no-reference` is supplied
4. If `AGENTS.md` already exists, the command appends or refreshes a
   Code-Anchored Context section instead of replacing the whole file.
5. If generated directories already exist, the command skips them unless
   `--force` is supplied.
6. `--dry-run` prints planned actions without writing files.

The release slug may contain only letters, numbers, dots, underscores, and
hyphens because it becomes part of generated file paths.

## Acceptance Criteria

- [x] `npm test` passes.
- [x] `node ./bin/code-anchored-context.js init --dry-run` prints planned
      actions without writing files.
- [x] Installing into an empty target creates the expected agent and
      Working context files.
- [x] Installing with `--no-reference` skips `reference/`.
- [x] Existing `docs/` folders are preserved and do not block
      `reference/` installation.
- [x] A custom `--release` updates content and release folder names.
- [x] Existing generated paths are skipped unless `--force` is supplied.

## Dependencies

- npm for distribution.
- Node.js 18 or newer for the CLI runtime.
