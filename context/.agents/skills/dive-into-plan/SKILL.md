---
name: dive-into-plan
description: Interrogate a settled initiative plan for gaps, distribute into per-concern docs, and promote accepted decisions into decisions/. Use ONLY when the human explicitly invokes it ("dive into the plan", "distribute the plan"). Do not trigger automatically.
---

# Dive Into Plan

Second half of durable planning, after `plan-with-context`. Requires a settled `plan.md`.

## Workflow

1. Read initiative `README.md`, `plan.md`, and `context/project-profile.md` when it exists.
2. **Interrogate** — ask pointed questions for surfaces the plan skipped (tests, e2e, IaC, CI/CD, config, ops, security, migration, reference impact). Record answers in `plan.md`; note deferred surfaces with reason.
3. **Distribute** — move settled truth from `plan.md` into initiative files (see templates under `context/_templates/initiative/` for each file's role):
   `spec.md`, `interface.md`, `architecture.md`, `testing.md`, `delivery.md`, `infrastructure.md`, `operations.md` (only when actionable), `backlog.md`, `release-doc-notes.md`. Mark N/A files explicitly.
4. **Promote decisions** — for each accepted architecture/design choice: next `NNNN` in `decisions/` from `0000-template.md`, status Accepted, index row in `decisions/README.md`, origin link to initiative. Mark superseded decisions; never delete history.
5. Update initiative `README.md` (status, decisions, implementation state).

## Boundary

Do not edit `reference/`. Capture future reference impact in `release-doc-notes.md` only.

## Done when

- Applicable surfaces grilled; answers in `plan.md`.
- Settled truth not living only in `plan.md`.
- Accepted decisions in repo-wide `decisions/` log.
