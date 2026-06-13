---
name: reference-from-tags
description: Refresh reference/ from the diff between two release tags. Use ONLY when the human explicitly asks to refresh reference for a release, update from tags, update a page, or fix a demonstrable error. Do not trigger during feature work or refactors.
---

# Reference From Tags

Documentation only — no executable changes.

## Invariants

- Read `reference/README.md`, `reference/_authoring/workflow.md`, and relevant area guides first.
- Tag diff is source of truth; planning artifacts optional.
- Extend and correct pages; do not wipe existing reference.

## Workflow

1. **Tags** — resolve base and target from human input and `reference/releases/index.md`. Ask if ambiguous.
2. **Per area** — read `reference/_authoring/areas/<area>.md`; scope diff to area paths:
   `git diff --name-status <base>..<target> -- <paths>`
3. **Optional hints** — read `context/initiatives/*/release-doc-notes.md` when present; verify against diff.
4. **Update** — area `README.md` and `features/*.md` for material behavior changes. Skip refactors, test-only, lint, dep bumps with no behavior change.
5. **Record** — append row to `reference/releases/index.md`.
6. **Validate** — `git diff --check`; confirm documentation-only diff; summarize.

**Single-page/fix requests:** minimal edit to that page; verify against source.

See `reference/_authoring/workflow.md` for audience, writing style, and diagrams.
