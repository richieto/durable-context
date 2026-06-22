---
name: dive-into-plan
description: Interrogate a settled initiative plan for gaps, distribute into per-concern docs, create local ADRs for active work, and promote approved implemented ADRs into decisions/. Use ONLY when the human explicitly invokes it ("dive into the plan", "distribute the plan"). Do not trigger automatically.
---

# Dive Into Plan

Second half of durable planning, after `plan-with-context`. Requires a settled `plan.md`.

## Workflow

1. Read initiative `README.md`, `plan.md`, nearest `AGENTS.md`, `context/project-profile.md` when present, root `decisions/README.md` and relevant `decisions/indexes/` when present, and relevant local `context/**/decisions/`.
2. **Interrogate** — ask pointed questions for surfaces the plan skipped (behavior, interface, architecture, tests, e2e, IaC, CI/CD, config, ops, rollback, security, data, ADRs, project profile impact, reference impact). Record answers in `plan.md`; note deferred surfaces with reason.
3. **Distribute** — move settled truth from `plan.md` into initiative files (see templates under `context/_templates/initiative/` for each file's role):
   `spec.md`, `interface.md`, `architecture.md`, `testing.md`, `delivery.md`, `infrastructure.md`, `operations.md` (only when actionable), `backlog.md`, `release-doc-notes.md`. Mark N/A files explicitly.
4. **Record ADRs** — create ADRs only for architecturally significant decisions: choices that cross team boundaries, have multiple credible options, or are costly to reverse. Keep proposed, recommended, planned, or in-progress ADRs under the relevant initiative `decisions/` folder.
5. **Promote decisions** — move ADRs to root `decisions/` only when approved and implemented/accepted, or when the human explicitly says they are ready for root history. Assign the next `NNNN`, preserve or complete metadata (`Area`, `Scope`, `Tags`, `Supersedes`, `Superseded by`), update `decisions/README.md` and relevant `decisions/indexes/*.md`, and link back from the initiative.
6. Update initiative `README.md` (status, decisions, implementation state).

## Boundary

Do not edit `reference/`. Capture future reference impact in `release-doc-notes.md` only.
Do not create ADRs for routine daily technical choices.

## Done when

- Applicable surfaces grilled; answers in `plan.md`.
- Settled truth not living only in `plan.md`.
- ADR candidates were recorded locally, promoted to root `decisions/`, or left as normal initiative notes.
- Promoted ADRs have complete metadata and current indexes.
