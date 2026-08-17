# Intent Clarification And Proportionate Records

Use repository evidence for facts and a focused human interview for intent.
Missing evidence and unsettled intent are different problems: inspect code,
configuration, tests, and accepted decisions before asking questions that the
repository can answer.

## Intent Interview

Use an intent interview when an answer could materially change the goal,
success criteria, scope, constraints, priority, accepted risk, or recommendation.
Use a Socratic posture: help the human make assumptions and preferences
explicit without steering them toward the agent's preferred answer.

1. State the ambiguity and why it affects the work.
2. Separate known facts, current interpretation, and the choice only the human
   can make.
3. Ask one decision-bearing question or one small coherent group at a time.
4. Offer concrete options or examples when they help the human express intent,
   without implying that the list is exhaustive or that one option is assumed.
5. Reflect the emerging interpretation back in plain language and invite
   correction.
6. Stop interviewing when the direction is clear enough for the next boundary;
   preserve remaining uncertainty as an explicit open question.

Do not ask the human to decide routine implementation details the agent can
resolve safely from evidence. Do not use challenge or detailed design to guess
an unclear product or engineering intent.

## Minimum Sufficient Record

Artifact completeness is semantic, not a word-count target. Use the shortest
record that preserves what another human or agent needs to continue correctly:

- the settled conclusion or current direction;
- decision-relevant rationale, constraints, and accepted trade-offs;
- evidence or a stable link to its owner;
- unresolved questions, material risks, and the next action.

Omit conversational transcripts, narration of routine work, generic advice,
repeated repository facts, and speculative branches that do not affect a
decision. Prefer a link over duplication. Expand detail in proportion to
uncertainty, impact, risk, and cost of reversal. A concise `No impact` reason or
an explicit `Unknown` is better than defensive filler.
