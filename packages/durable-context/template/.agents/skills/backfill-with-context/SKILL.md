---
name: backfill-with-context
description: Reconstruct durable initiative context after work on a branch has grown beyond an ordinary plan, preserving evidence without pretending the work was planned first. Use ONLY when the human explicitly invokes backfill-with-context or durable-context routes a named initiative into backfill.
---

# Backfill With Context

Reconstruct a named initiative from existing work, then rejoin the normal
durable lifecycle at its actual phase. Prefer `durable-context` unless the human
intentionally enters this stage directly.

## Workflow

1. Require the initiative name; never derive it from the branch name. Resolve
   an explicit cycle or the profile's Current cycle, using `default` when an
   upgraded profile has no cycle section. Treat a flat pre-cycle folder as the
   fallback for `default/<slug>` and never move it implicitly.
2. Read the nearest `AGENTS.md`, project profile, relevant accepted decisions,
   and the lifecycle protocol at
   `../checkpoint-context/references/lifecycle.md`.
3. Establish the comparison base from explicit user direction or repository
   upstream/default-branch evidence. Inspect the merge-base, committed and
   uncommitted diff, tests, configuration, infrastructure, and relevant history.
4. Create a new lifecycle-managed initiative under
   `context/cycles/<cycle-id>/initiatives/<slug>/` with only `README.md`,
   `plan.md`, and this skill's `assets/backfill.md`. Use a project-owned lifecycle template
   when available and the `durable-context` skill assets otherwise. If the named
   initiative is legacy, report it and do not migrate it.
5. Separate evidence rigorously:
   - Observed: proven by code, tests, history, or configuration.
   - Human-confirmed: intent or trade-offs explicitly confirmed now.
   - Inferred: plausible interpretation requiring confirmation.
   - Unknown: evidence not available.
6. Normalize the recovered goal, scope, decisions, and remaining work into
   `plan.md`; retain the reconstruction trail in `backfill.md`.
7. Set the lifecycle to the actual current phase. Do not fabricate completed
   planning, review, or approval. Mark skipped or reconstructed earlier work in
   the phase evidence. Do not move backward to Plan Review merely because a
   retrospective challenge is open; pause or block only the dependent next
   action.
8. Continue applicable review, artifact routing, ADR assessment,
   implementation reconciliation, verification, and PR preparation through
   `durable-context`.
9. Run `checkpoint-context` before handoff.

## Boundary

Keep `backfill.md` in disposable initiative context. Promote only self-contained
architectural conclusions—not reconstruction narrative—to root `decisions/`.
