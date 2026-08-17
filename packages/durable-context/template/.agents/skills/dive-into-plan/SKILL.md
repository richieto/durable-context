---
name: dive-into-plan
description: Interrogate a settled durable plan, negotiate concern-by-concern artifact routing, create only applicable local documents, and record or promote architectural decisions. Use ONLY when the human explicitly invokes dive-into-plan, distribute the plan, or durable-context routes a named initiative through Detailed Design.
---

# Dive Into Plan

Interrogate and distribute a named settled plan. Prefer `durable-context` unless
the human intentionally enters Detailed Design directly.

## Interrogate

1. Resolve an explicit cycle or the project profile's Current cycle, using
   `default` when an upgraded profile has no cycle section. Use only the
   canonical cycle path; if `context/initiatives/` exists, stop and ask the
   human to run the latest package `update`.
2. Read the initiative README and plan, nearest `AGENTS.md`, project profile,
   relevant accepted/local decisions, and the lifecycle protocol at
   `../checkpoint-context/references/lifecycle.md` when lifecycle-managed.
3. Read [the intent and record protocol](../durable-context/references/intent-and-records.md).
   Return to Planning if goal or intent is still unsettled. Otherwise ask
   pointed, decision-bearing questions only for material or ambiguous behavior,
   interface, architecture, tests/e2e, data/security, IaC, CI/CD,
   configuration, operations, rollback, project-profile, decision, and
   reference/release impact. Do not turn the whole change surface into a
   questionnaire.
4. Record conclusions and unresolved questions in their owning artifacts, not
   the interview transcript. Do not manufacture answers for unavailable
   external systems or people.

## Route Before Scaffolding

1. Propose a concern routing table based on repository evidence, then confirm
   ambiguous and external routes with the human.
2. Use `Local`, `External`, `Hybrid`, or `Not applicable`. Record a reason,
   local path, external destination/evidence, and merge-blocking status.
3. Create a concern document only for Local or Hybrid routes, using the
   project-owned templates when present. Do not create empty N/A files.
4. For external work the agent cannot perform, create a structured follow-up;
   never claim completion without evidence.
5. Mark artifact routing `Confirmed` only when every concern has a settled
   route.

## Decisions And Completion

- Create initiative-local ADRs only for architecturally significant choices.
- Promote only approved, implemented/accepted conclusions to root `decisions/`.
  Make each root ADR self-contained and give it stable PR, commit, or release
  provenance; the initiative link is optional provenance.
- Never promote review transcripts, backfill evidence, or routine choices.
- Update the phase record and checkpoint at the Detailed Design boundary.

Settled truth must not live only in `plan.md`. Do not edit reference docs during
normal development; route reference impact to `release-doc-notes.md` or its
external destination.
