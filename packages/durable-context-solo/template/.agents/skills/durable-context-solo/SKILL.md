---
name: durable-context-solo
description: Continue repository-owned planning for one accountable human across agents and sessions, using a stable project profile, focused concern documents, lightweight resume state, backfill, and durable decisions. Use ONLY when the human explicitly invokes durable-context-solo or asks what comes next in a named Solo initiative; do not trigger for ordinary plans, bug fixes, or small changes.
---

# Durable Context Solo

Use this as the recommended front door. Preserve planning focus without adding
multi-user lifecycle governance.

## Start Or Resume

1. Read the nearest `AGENTS.md`, `context/README.md`, and
   `context/project-profile.md`.
2. Resolve the initiative as `<cycle-id>/<initiative-slug>`. An explicit cycle
   wins. Otherwise read `Current cycle` from the marked project-profile section;
   if the section is absent in an upgraded project, use `default` and add the
   starter section when creating the first cycle-contained initiative. Accept
   only a safe single path segment for each ID. Never infer either ID from the
   branch name.
3. Use only the canonical cycle path. If `context/initiatives/` still exists,
   stop and ask the human to run the latest package `update`, which moves flat
   initiatives into `default` after checking for collisions. If no initiative
   was supplied, list Active or Paused initiatives across cycles and legacy
   folders, qualifying duplicate slugs from different cycles with cycle ID,
   then ask the human to name or create one.
4. If the work is still small, recommend the agent's native planning behavior.
   Create an initiative only after the human explicitly opts in.
5. If stable repository facts or the Concern Inventory remain Unknown, follow
   `project-profile-baseline` before planning. Do not rediscover known
   capabilities on every initiative.
6. For a new initiative, ensure `context/cycles/<cycle-id>/initiatives/`
   exists, then copy only `README.md` and `plan.md` from the project-owned
   lifecycle-free Solo templates when present; otherwise use this skill's
   `assets/initiative/` fallback. Replace placeholders.
7. If an existing initiative README lacks the resume markers, report it as
   legacy and leave it unchanged unless the human explicitly requests
   migration. Otherwise read Status, Last checkpoint, Next action, and Blocked
   by from the resume block. Inspect linked plan and focus documents before
   choosing work.

## Continue To The Next Boundary

Read [the focus workflow](references/focus-workflow.md) and
[the intent and record protocol](references/intent-and-records.md), then continue
only work authorized by the human:

- Use `backfill-with-context` when meaningful work predates its initiative.
- Use `plan-with-context` while direction or concern impact is unsettled.
- Distinguish missing repository evidence from unsettled human intent. If the
  direction could materially change, use a focused intent interview before
  challenge, focused design, or implementation.
- Offer `challenge` for a meaningful recommendation; it is optional.
- Use `dive-into-plan` to interrogate each Material concern separately and
  reconcile the documents before implementation.
- Implement only after every profiled concern has an impact disposition and
  all Material concerns are settled enough to guide code.
- Verify against the profile's commands and the applicable testing, delivery,
  infrastructure, operations, and documentation concerns.
- Record accepted architectural decisions directly in root `decisions/` when
  they must outlive the initiative.

Stop at the next human choice, unresolved question, external action, or
substantial work boundary. Update the resume block before ending: Status, Last
checkpoint, one concrete Next action, and Blocked by.

## Boundaries

- Keep `context/` disposable and root `decisions/` self-contained and durable.
- Treat cycles as namespaces only. Do not create cycle plans, backlogs, goals,
  capacity, schedules, or status metadata; those belong in the project's
  external planning system.
- Do not add phases, review-resolution records, ownership gates, transfer
  states, or PR-readiness machinery.
- Keep every artifact to the minimum sufficient record: preserve conclusions,
  decision-relevant rationale, evidence, unresolved material questions, and the
  next action; omit narration, generic advice, transcripts, and duplication.
- Do not claim external facts or actions without evidence.
- Refresh the project profile only when stable repository capabilities change.
