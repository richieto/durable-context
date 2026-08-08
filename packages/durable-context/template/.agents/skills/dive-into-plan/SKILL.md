---
name: dive-into-plan
description: Interrogate a settled durable plan, negotiate concern-by-concern artifact routing, create only applicable local documents, and record or promote architectural decisions. Use ONLY when the human explicitly invokes dive-into-plan, distribute the plan, or durable-context routes a named initiative through Detailed Design.
---

# Dive Into Plan

Interrogate and distribute a named settled plan. Prefer `durable-context` unless
the human intentionally enters Detailed Design directly.

## Interrogate

1. Read the initiative README and plan, nearest `AGENTS.md`, project profile,
   relevant accepted/local decisions, and the lifecycle protocol at
   `../checkpoint-context/references/lifecycle.md` when lifecycle-managed.
2. Ask pointed questions for applicable behavior, interface, architecture,
   tests/e2e, data/security, IaC, CI/CD, configuration, operations, rollback,
   project-profile impact, decision impact, and reference/release impact.
3. Record answers in `plan.md`; do not manufacture answers for unavailable
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
