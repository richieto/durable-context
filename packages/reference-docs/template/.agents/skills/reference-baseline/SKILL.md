---
name: reference-baseline
description: Document current accepted behavior under reference/ as a first baseline. Use ONLY when the human explicitly asks for baseline/initial reference or domain terminology. Do not trigger automatically.
---

# Reference Baseline

Documentation only — no executable changes.

## Invariants

- Read `AGENTS.md`, `reference/README.md`, `reference/_authoring/README.md`, and `reference/_authoring/workflow.md` first.
- Accepted current behavior → `reference/`. Uncertain/disputed → `reference/_authoring/baseline-clarifications.md`.
- Source-backed facts only; extend existing docs rather than replacing wholesale.
- Optional: read `context/project-profile.md` when durable-context is installed.

## Workflow

1. **Scope** — whole repo, one area, or as named by human. Record reference point in `reference/releases/index.md`.
2. **Inspect** — manifests, source roots, tests, CI/CD, IaC, observability, existing docs (use `rg` and repo tooling).
3. **Area guides** — create/update `reference/_authoring/areas/<slug>.md` from `_template.md`.
4. **Terminology** — update `reference/_authoring/terminology.md`; ambiguities → `baseline-clarifications.md`.
5. **Pages** — create/update `reference/<Area>/README.md` and `features/*.md` using `_templates/area/`.
6. **Record** — row in `reference/releases/index.md` (tag or `baseline/<label>`).
7. **Validate** — documentation-only diff; summarize areas, pages, open clarifications.

Procedural detail: `reference/_authoring/workflow.md` (baseline mode, audience, layout).
