# Rebrand Packages: durable-context and reference-docs

Status: Complete
Primary area: packaging, branding, documentation, and agent artifact footprint
Started: 2026-06-13

## Summary

Rebrand the two npm packages to unscoped `durable-context` and `reference-docs`,
retire the Code-Anchored Context umbrella, compress shipped skills and templates (skills precise; templates hold structure), and sync dogfood `context/` from the
package template. Ship **1.0.0** (human publishes).

## Touched Areas

- `packages/planning/` → `packages/durable-context/`
- `packages/reference/` → `packages/reference-docs/`
- CLIs, installer metadata, AGENTS.md markers, skills, templates, smoke tests
- Root `README.md`, `AGENTS.md`, `package.json`
- `writing/` — maintainer-only; not installed; align names during rebrand
- Root `context/_templates/` and related dogfood scaffold
- `decisions/` (0004, 0005)

## Current Source Of Truth

- `spec.md` — behavior and acceptance criteria
- `architecture.md` — layout, installer, footprint rules
- `interface.md` — install commands and publish flow
- `testing.md` — verification gates
- `delivery.md` — publish and rollback
- `backlog.md` — executable work items
- `plan.md` — alignment trail and grill record

Not applicable: `operations.md`

## Decisions

- `decisions/0004-rebrand-to-durable-context-and-reference-docs.md`
- `decisions/0005-keep-shipped-agent-artifacts-lean.md`

Supersedes **naming only** in `decisions/0001-split-into-planning-and-reference-packages.md`.

## Open Questions

None.

## Implementation Status

- Complete (2026-06-13). Human: publish `durable-context@1.0.0` and `reference-docs@1.0.0` on npm.

## Agent Notes

- Package template is canonical; sync root `context/` after template review.
- Do not edit `reference/` during this initiative.
