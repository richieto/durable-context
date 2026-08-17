---
name: plan-with-context
description: Draft or refine a named Solo initiative plan using the stable project profile, explicitly evaluating every known concern before implementation. Use ONLY when the human explicitly invokes plan-with-context or durable-context-solo routes an initiative into planning; do not trigger for ordinary plans or small fixes.
---

# Plan With Context

Use native agent planning, then preserve it in repository-owned documents.
Prefer `durable-context-solo` unless the human intentionally enters planning.

## Workflow

1. Require an initiative name; never infer it from the branch. Resolve
   `<cycle-id>/<initiative-slug>` using an explicit cycle or the profile's
   Current cycle, falling back to `default` when the section is absent. A flat
   `context/initiatives/<slug>/` is the fallback for `default/<slug>` and is
   never moved implicitly. When creating the first cycle-contained initiative
   for an upgraded profile, add the starter cycle section with Current cycle
   `default`. Read the nearest `AGENTS.md`, project profile,
   relevant accepted decisions, initiative README, and plan.
2. If the Concern Inventory is materially Unknown, establish or refresh the
   profile instead of rediscovering capabilities only for this initiative.
3. Settle goal, success criteria, scope, constraints, recommendation, options,
   trade-offs, open questions, and implementation outline in `plan.md`.
4. Copy profile presence into the initiative Concern Evaluation. Evaluate every
   Present or External concern; check whether the initiative Introduces any
   Absent concern. Use Material, No impact, External, Introduced, or TBD with
   evidence or reason.
5. Propose focused documents for Material and Introduced concerns. Discuss the
   proposed decomposition with the human before creating files. Do not use plan
   length as the only signal.
6. Keep unsettled architectural choices in the plan. Consult root decisions to
   avoid contradicting accepted constraints.
7. Do not begin implementation or silently flatten TBD concerns into a generic
   checklist. Hand Material concerns to `dive-into-plan` for separate passes.

Update the lightweight resume block before handoff.
