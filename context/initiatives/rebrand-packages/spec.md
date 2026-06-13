# Spec

## Purpose

Rebrand and republish the two installable packages under independent product
names (`durable-context`, `reference-docs`), retire the Code-Anchored Context
umbrella, and shrink the context-window footprint of shipped skills and
templates.

## Goals

- Adopters install with plain, memorable commands:
  `npx durable-context init` and `npx reference-docs init`.
- No `@code-anchored-context/*` naming in installed artifacts or npm package
  READMEs.
- Installed scaffold paths unchanged: `context/`, `decisions/`, `reference/`.
- Skills precise; templates hold structure (no line-count targets).
- Skill rename: `grill-and-distribute` → `dive-into-plan` (confirmed).
- This repo dogfoods the updated package templates (root `context/` synced from
  canonical template).
- Ship **1.0.0** for both packages on npm (human publishes).

## Non-Goals

- Splitting into two GitHub repositories.
- Migrating or supporting `@code-anchored-context/*` 0.1.0 installs (clean
  break; no early adopters).
- Renaming the GitHub repository slug (deferred to human).
- Adding CI workflows (none exist today).
- Adding automated line-count gates or a `migrate` CLI command.
- Shipping or installing `writing/` as part of the product.
- Editing adopters' `reference/` trees (not applicable).

## Behavior

### Packaging

- Monorepo root stays private; two workspaces under `packages/durable-context/`
  and `packages/reference-docs/`.
- Each package is self-contained: `bin/`, `lib/installer.js`, `template/`,
  `tests/`, `README.md`, `LICENSE`.

### Installers

- CLI bin names match npm package names.
- Each package writes install metadata to its own dotdir:
  `.durable-context/install.json` or `.reference-docs/install.json`.
- Each package merges a distinct marker pair into `AGENTS.md`:
  `durable-context:*` and `reference-docs:*`.
- `init` remains idempotent; `status` and `--dry-run` unchanged.

### Skills and templates

- Skill names: `plan-with-context`, `dive-into-plan` (renamed from
  `grill-and-distribute`), `reference-from-tags`, `reference-baseline`.
- Compression: skills precise and minimal; templates carry doc shapes and
  section intent.

### Writing

- Rename `writing/code-anchored-docs/` → `writing/reference-docs/`.
- Retire `writing/code-anchored-context.html`; update or remove inbound links
  from product brief HTML files.

## Acceptance Criteria

- [ ] `packages/durable-context/` and `packages/reference-docs/` exist; old
  paths removed.
- [ ] `npm test --workspaces` passes.
- [ ] Smoke tests assert new CLI paths, AGENTS markers, and metadata dotdirs.
- [ ] No `code-anchored` or `@code-anchored-context` strings in installed
  `template/` trees (skills, scaffolds, template AGENTS.md).
- [ ] Root `context/_templates/`, `context/project-profile.md`, and
  `context/README.md` match the durable-context package template after review.
- [ ] Root `README.md`, `AGENTS.md`, and `package.json` reflect new names.
- [ ] `writing/` cross-links updated (maintainer docs only; not in install payload)
- [ ] `decisions/0004` (and `0005`) promoted; `decisions/README.md` index
  updated.
- [ ] Human publishes `durable-context@1.0.0` and `reference-docs@1.0.0`.

## Dependencies

- Prior split and flat context model: `decisions/0001`, `0002`, `0003`.
- Initiative: `context/initiatives/split-planning-reference/` (structural
  predecessor; naming superseded by 0004).
