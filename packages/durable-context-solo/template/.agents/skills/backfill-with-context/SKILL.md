---
name: backfill-with-context
description: Reconstruct repository-owned Solo planning after ordinary work grows into a meaningful initiative, separating code evidence from retrospective intent and restoring concern-by-concern focus. Use ONLY when the human explicitly invokes backfill-with-context or durable-context-solo routes a named initiative into backfill.
---

# Backfill With Context

Reconstruct a named initiative from existing work, then continue through
`durable-context-solo`. Prefer the front door unless the human intentionally
enters backfill directly.

## Workflow

1. Require the initiative name. Treat the branch as evidence, never identity.
   Resolve an explicit cycle or the profile's Current cycle, using `default`
   when an upgraded profile has no cycle section. Treat a flat pre-cycle folder
   as the fallback for `default/<slug>` and never move it implicitly.
2. Read `context/project-profile.md`, relevant accepted decisions, and
   [the evidence rules](references/evidence.md).
3. Establish the comparison base from explicit human direction or repository
   upstream/default-branch evidence. Inspect the merge-base, committed and
   uncommitted diff, tests, configuration, infrastructure, and relevant history.
4. Create `README.md`, `plan.md`, and `backfill.md` from the Solo templates under
   `context/cycles/<cycle-id>/initiatives/<slug>/`.
5. Separate Observed, Human-confirmed, Inferred, and Unknown claims. Cite paths,
   commits, diffs, tests, or commands for observed claims; never infer why code
   changed merely from what changed.
6. Normalize recovered goal, scope, trade-offs, and remaining work into
   `plan.md`. Preserve reconstruction evidence in `backfill.md`.
7. Use the project profile to evaluate every Present or External concern and
   whether the change Introduced a previously absent capability. Create focused
   documents for Material concerns, including already-implemented areas whose
   reasoning still needs review.
8. Set the resume marker to the truthful current state and next action. Do not
   fabricate earlier planning, review, or approval.
9. Continue applicable adversarial review, focused interrogation,
   implementation reconciliation, verification, and durable decision capture.

Keep `backfill.md` disposable. Promote only self-contained accepted
architectural decisions to root `decisions/`.
