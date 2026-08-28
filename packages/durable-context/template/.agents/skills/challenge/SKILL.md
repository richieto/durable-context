---
name: challenge
description: Perform an invocation-only adversarial review of a meaningful durable plan, recording material challenges and their dependent phases without treating the critique as authority. Use ONLY when the human explicitly asks to challenge or red-team the plan, or dc routes a named initiative through Plan Review.
---

# Challenge

Challenge a meaningful commitment before it hardens. Prefer `dc`
unless the human intentionally enters Plan Review directly.

## Review

1. Resolve an explicit cycle or the project profile's Current cycle, using
   `default` when an upgraded profile has no cycle section. Use only the
   canonical cycle path; if `context/initiatives/` exists, stop and ask the
   human to run the latest package `update`.
2. Read the named initiative README, plan, relevant concern documents, nearest
   `AGENTS.md`, project profile, decisions, and the lifecycle protocol at
   `../checkpoint-context/references/lifecycle.md` when lifecycle-managed.
3. Read [the intent and record protocol](../dc/references/intent-and-records.md).
   Identify and steelman the exact recommendation or decision being challenged,
   including its rationale and constraints. Ask focused clarification questions
   first when the target is ambiguous; return to Planning when human intent is
   not settled enough to challenge fairly.
4. Use decision-bearing questions to expose its strongest objection, hidden
   assumption, non-obvious failure mode, and cheaper, simpler, or more
   reversible alternative before stating the critique.
5. If there is no material challenge, explain why the current direction is the
   best available option. For lifecycle-managed work, set Plan review to
   `No material challenge` and checkpoint.
6. If material, create the next `reviews/NNNN-topic.md` from the review
   protocol. Set status `Open` or `Awaiting Review` and name only the dependent
   phases it actually blocks. Set Plan review to `Open challenges`.

## Resolution

- Treat the challenge as advice, never as decision authority. Persuasiveness alone
  does not resolve a challenge.
- Wait for a human conclusion. Do not infer organizational roles or require a
  particular title.
- Record `Retain`, `Revise`, `Replace`, or `Accept Risk`, with rationale,
  accepted trade-offs, resolver, date, and affected artifacts.
- For Revise or Replace, update the affected plan/code/artifacts before setting
  status `Resolved`. For Retain or Accept Risk, make the accepted cost explicit.
- Use `Superseded` when later plan changes make the challenge inapplicable.
- Continue unrelated work while a challenge is open; block only its declared
  dependent phases.

Keep only the minimum sufficient material review in disposable initiative
context, not the interview transcript. Promote only a resulting, self-contained
architectural conclusion to root `decisions/`.
