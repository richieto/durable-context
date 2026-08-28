---
name: challenge
description: Perform an optional adversarial review of a meaningful Solo recommendation before focused distribution or implementation. Use ONLY when the human explicitly asks to challenge or red-team the plan, or dc offers and the human accepts the review.
---

# Challenge

Pressure-test a meaningful commitment. Prefer `dc` unless the
human intentionally invokes this pass.

## Workflow

1. Resolve an explicit cycle or the project profile's Current cycle, using
   `default` when an upgraded profile has no cycle section. Use only the
   canonical cycle path; if `context/initiatives/` exists, stop and ask the
   human to run the latest package `update`.
2. Read the named initiative plan, relevant focus documents, project profile,
   accepted decisions, and repository evidence.
3. Read [the intent and record protocol](../dc/references/intent-and-records.md).
   Identify and steelman the exact recommendation, rationale, and constraints.
   Ask focused clarification questions first when the target is ambiguous;
   return to planning when human intent is not settled enough to challenge fairly.
4. Use decision-bearing questions to expose the strongest objection, hidden
   assumption, non-obvious failure mode, and cheaper, simpler, or more
   reversible alternative before stating the critique.
5. If there is no material challenge, explain why briefly.
6. If material, discuss the impact with the human. The critique is advice, not
   authority.
7. After the human concludes, record only the minimum sufficient challenge,
   chosen response, rationale, and accepted trade-offs in `plan.md` or the
   affected focus document. Do not retain the interview transcript. Revise
   those artifacts when the direction changes.

Do not create review-state files, reviewer roles, resolution gates, or root
ADRs containing the review transcript. Create an ADR only if the resulting
accepted architectural decision independently meets the durable threshold.
