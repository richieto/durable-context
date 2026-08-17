---
name: challenge
description: Perform an optional adversarial review of a meaningful Solo recommendation before focused distribution or implementation. Use ONLY when the human explicitly asks to challenge or red-team the plan, or durable-context-solo offers and the human accepts the review.
---

# Challenge

Pressure-test a meaningful commitment. Prefer `durable-context-solo` unless the
human intentionally invokes this pass.

## Workflow

1. Resolve an explicit cycle or the project profile's Current cycle, using
   `default` when an upgraded profile has no cycle section. Treat a flat
   pre-cycle folder as the fallback for `default/<slug>` without moving it.
2. Read the named initiative plan, relevant focus documents, project profile,
   accepted decisions, and repository evidence.
3. Identify the exact recommendation being challenged.
4. Present the strongest objection, hidden assumption, non-obvious failure
   mode, and cheaper, simpler, or more reversible alternative.
5. If there is no material challenge, explain why briefly.
6. If material, discuss the impact with the human. The critique is advice, not
   authority.
7. After the human concludes, record the challenge, chosen response, rationale,
   and accepted trade-offs in `plan.md` or the affected focus document. Revise
   those artifacts when the direction changes.

Do not create review-state files, reviewer roles, resolution gates, or root
ADRs containing the review transcript. Create an ADR only if the resulting
accepted architectural decision independently meets the durable threshold.
