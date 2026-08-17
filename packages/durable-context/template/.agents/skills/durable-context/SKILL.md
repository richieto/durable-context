---
name: durable-context
description: Orchestrate a named durable-context initiative from planning through PR preparation, resuming recorded state across users, agents, and sessions. Use ONLY when the human explicitly invokes durable-context or asks what comes next in a durable initiative; do not trigger for ordinary plans, bug fixes, or small changes.
---

# Durable Context

Use this as the recommended front door. Advance a named initiative to its next
meaningful boundary without turning routine work into ceremony.

## Start

1. Read the nearest `AGENTS.md`, `context/README.md`, and
   `context/project-profile.md` when present.
2. Resolve the initiative as `<cycle-id>/<initiative-slug>`. An explicit cycle
   wins. Otherwise read `Current cycle` from the marked project-profile section;
   if the section is absent in an upgraded project, use `default` and add the
   starter section when creating the first cycle-contained initiative. Accept
   only a safe single path segment for each ID. Never infer either ID from the
   branch name.
3. Use only the canonical cycle path. If `context/initiatives/` still exists,
   stop and ask the human to run the latest package `update`, which moves flat
   initiatives into `default` after checking for collisions. If no initiative
   was supplied, list managed initiatives across cycles whose condition is
   Active, Paused, or Blocked, then list legacy folders separately. Qualify
   duplicate slugs from different cycles with cycle ID.
4. Require an initiative name after listing. If the work is still small,
   recommend the agent's native planning behavior. Invoking this router alone
   is not that second choice: create durable context only if the human
   explicitly chooses it after the recommendation.
5. For a new initiative, ensure
   `context/cycles/<cycle-id>/initiatives/` exists. Use the project-owned
   `_templates/initiative/README.md`
   and `plan.md` when its README contains lifecycle markers; otherwise fall back
   to this skill's `assets/initiative/README.md` and `plan.md`. Copy only those
   two files into `context/cycles/<cycle-id>/initiatives/<slug>/` and replace
   placeholders. Never overwrite the project-owned template to upgrade it.
6. If an existing initiative README lacks the lifecycle markers, report it as
   legacy and leave it unchanged. Use the advanced specialist skills directly
   if the human wants to finish it under the old workflow.

## Continue

1. Read [the lifecycle protocol](references/lifecycle.md) and
   [the intent and record protocol](references/intent-and-records.md) completely.
2. Run the checkpoint validator before changing phases. Resolve hard errors;
   surface warnings without inventing work.
3. Inspect the current phase, next action, blockers, applicable review records,
   follow-ups, plan, code, tests, and decisions.
4. Distinguish missing repository evidence from unsettled human intent. If
   direction is unclear enough to change the plan, remain in Planning and use a
   focused intent interview before challenge, design, or implementation.
5. Continue work authorized by the user's request until the next human choice,
   unresolved dependency, external action, or major phase transition:
   - Planning: follow `plan-with-context`.
   - Plan Review: offer `challenge`; it remains advisory until a material
     challenge exists.
   - Detailed Design: follow `dive-into-plan`, including artifact routing.
   - Implementation: execute the settled local artifacts and keep their status
     current.
   - Verification: run applicable checks and reconcile known gaps.
   - PR Preparation: reconcile decisions, project-profile impact,
     release/reference impact, follow-ups, and PR evidence.
6. Use `backfill-with-context` when the code predates the initiative.
7. Use `checkpoint-context` at every meaningful boundary and before ending a
   substantial session.

## Boundaries

- Treat `context/` as disposable working context and root `decisions/` as
  isolated durable history.
- Treat cycles as namespaces only. Do not create cycle plans, backlogs, goals,
  capacity, schedules, or status metadata; those belong in the project's
  external planning system.
- Do not promote review transcripts or reconstruction notes to root decisions.
- Keep every artifact to the minimum sufficient record: preserve conclusions,
  decision-relevant rationale, evidence, unresolved material questions, and the
  next action; omit narration, generic advice, transcripts, and duplication.
- Do not claim external work is complete without evidence or a human waiver.
- Do not update merged initiatives merely to track post-merge progress; use the
  destination system or a new code-changing initiative.
