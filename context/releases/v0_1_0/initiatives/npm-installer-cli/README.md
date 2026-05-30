# npm Installer CLI

Status: Ready for publish
Release: v0_1_0
Primary area: packaging
Program: None

## Summary

Make this repository installable through a small npm CLI so a human can add
the Code-Anchored Context structure to an existing project with one command.
The initializer should copy the agent guidance, repo-wide skill, working
context, and optional `reference/` starter files into the target repo.

## Touched Areas

- `package.json`
- `bin/code-anchored-context.js`
- `tests/cli-smoke.test.js`
- `README.md`
- `reference/_authoring/workflow.md`
- `reference/_authoring/areas/_template.md`
- `reference/_templates/area/README.md`
- `reference/_templates/area/features/feature-template.md`
- `writing/README.md`
- `context/current.md`
- `context/releases/v0_1_0/backlog.md`

## Current Source Of Truth

- `plan.md`
- `spec.md`
- `interface.md`
- `architecture.md`
- `testing.md`
- `delivery.md`
- `backlog.md`
- `release-doc-notes.md`

Infrastructure and operations notes are not applicable for this initiative.

## Carry-Forward Context

- Program: None
- Deferred backlog items: None

## Open Questions

- None yet.

## Implementation Status

- CLI package metadata added.
- Installer command added.
- Smoke tests added.
- Template folders renamed to `context/` and `reference/`.
- Existing consumer `docs/` folders are preserved because the reference
  scaffold installs separately under `reference/`.
- Azure wiki-specific starter files `.order` and `Welcome.md` were replaced
  with a portable `reference/README.md`.
- Companion article and presentation drafts moved under `writing/` and
  excluded from the npm package.
- Package version bumped to `0.2.3` for the `reference/` rename.
- README adoption and publishing flow updated.
- Reference authoring guidance now defaults to product-readable,
  technically anchored prose.
- `npm test`, `npm pack --dry-run`, dry-run install, and force install checks
  pass locally.

## Agent Notes

- Keep initiative knowledge in this folder.
- Use `plan.md` for live alignment, questions, options, and rough thinking.
  Promote settled conclusions into the stable initiative files.
- Update `release-doc-notes.md` when shipped behavior or product-facing
  behavior changes.
- Do not update `reference/` from this initiative unless a human
  explicitly asks for release reference work.
