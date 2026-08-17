---
name: challenge
description: Perform an invocation-only adversarial review of a meaningful durable plan, recording material challenges and their dependent phases without treating the critique as authority. Use ONLY when the human explicitly asks to challenge or red-team the plan, or durable-context routes a named initiative through Plan Review.
---

# Challenge

Challenge a meaningful commitment before it hardens. Prefer `durable-context`
unless the human intentionally enters Plan Review directly.

## Review

1. Resolve an explicit cycle or the project profile's Current cycle, using
   `default` when an upgraded profile has no cycle section. Treat a flat
   pre-cycle folder as the fallback for `default/<slug>` without moving it.
2. Read the named initiative README, plan, relevant concern documents, nearest
   `AGENTS.md`, project profile, decisions, and the lifecycle protocol at
   `../checkpoint-context/references/lifecycle.md` when lifecycle-managed.
3. Identify the exact recommendation or decision being challenged.
4. Test its strongest objection, hidden assumption, non-obvious failure mode,
   and cheaper, simpler, or more reversible alternative.
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

Keep full reviews in disposable initiative context. Promote only a resulting,
self-contained architectural conclusion to root `decisions/`.
