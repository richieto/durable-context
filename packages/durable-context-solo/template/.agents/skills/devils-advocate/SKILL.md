---
name: devils-advocate
description: Perform an optional adversarial review of a meaningful Solo recommendation before focused distribution or implementation. Use ONLY when the human explicitly asks for devil's advocate, challenge the plan, red-team the plan, or durable-context-solo offers and the human accepts the review.
---

# Devil's Advocate

Pressure-test a meaningful commitment. Prefer `durable-context-solo` unless the
human intentionally invokes this pass.

## Workflow

1. Read the named initiative plan, relevant focus documents, project profile,
   accepted decisions, and repository evidence.
2. Identify the exact recommendation being challenged.
3. Present the strongest objection, hidden assumption, non-obvious failure
   mode, and cheaper, simpler, or more reversible alternative.
4. If there is no material challenge, explain why briefly.
5. If material, discuss the impact with the human. The critique is advice, not
   authority.
6. After the human concludes, record the challenge, chosen response, rationale,
   and accepted trade-offs in `plan.md` or the affected focus document. Revise
   those artifacts when the direction changes.

Do not create review-state files, reviewer roles, resolution gates, or root
ADRs containing the review transcript. Create an ADR only if the resulting
accepted architectural decision independently meets the durable threshold.
