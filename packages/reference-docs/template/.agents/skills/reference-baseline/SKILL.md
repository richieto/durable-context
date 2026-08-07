---
name: reference-baseline
description: Document current accepted behavior under REFERENCE_ROOT/ as a first baseline. Use ONLY when the human explicitly asks for baseline or initial reference documentation. Do not trigger automatically.
---

# Reference Baseline

Documentation only. Do not change executable behavior.

## Invariants

- Read the nearest `AGENTS.md`, `REFERENCE_ROOT/README.md`,
  `REFERENCE_ROOT/_authoring/README.md`,
  `REFERENCE_ROOT/_authoring/workflow.md`, the optional
  `REFERENCE_ROOT/_authoring/project.md`, and relevant area guides first.
- Accepted current behavior belongs under `REFERENCE_ROOT/`. Keep uncertain,
  disputed, planned, or future behavior out of product-facing reference pages.
- Use source-backed facts and extend existing documentation instead of
  replacing it wholesale.
- When present, `context/project-profile.md` may help locate commands, source
  roots, infrastructure, observability, and generated artifacts. Reference
  documentation does not depend on durable-context.

## Workflow

1. Confirm the requested scope and record the branch, tag, commit, date, or
   human-named baseline used as the reference point.
2. Inspect relevant source, tests, configuration, CI/CD, infrastructure,
   observability, existing docs, and accepted records under `decisions/` when
   those optional sources exist.
3. Create or update matching area guides under
   `REFERENCE_ROOT/_authoring/areas/`.
4. Update `REFERENCE_ROOT/_authoring/terminology.md` for canonical domain
   language.
5. Create or update area summaries and feature pages using
   `REFERENCE_ROOT/_templates/area/`.
6. Record the baseline in `REFERENCE_ROOT/releases/index.md`.
7. Run `git diff --check`, inspect the changed paths, and run any validation
   commands named in the project overlay.

## Done When

- Scope and reference point are recorded.
- Pages are source-backed, product-readable, and cover the requested behavior.
- Open questions are clearly separated from accepted behavior.
- The final summary lists pages changed, unresolved questions, and checks run.
