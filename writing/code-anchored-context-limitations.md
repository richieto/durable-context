# Code-Anchored Context: Limitations, Anti-Patterns, and When Not To Use It

Every other article in this series makes the case *for* Code-Anchored Context.
This one is the honest accounting of where it costs more than it returns, where
it breaks, and how to tell. It is not one-size-fits-all, and pretending
otherwise would undercut the parts that genuinely work.

## It Is Built For Harness Engineering

The approach assumes a particular working model: an engineer working *through*
an agent, with accountability for the result — not a fully autonomous agent
left to document itself. The structure exists so a human can plan in one
session, hand the plan to a reviewer in another, and implement in a third,
without losing the thread between them.

That assumption is also the boundary. If your model is "let the agent run and
trust the output," this adds ceremony without adding the supervision that makes
the ceremony worth it. The context only stays trustworthy because a person is
on top of it.

## When Not To Use It

- **Small or solo projects.** The overhead dwarfs the benefit. Start with
  something lean like spec-driven development or OpenSpec, and grow into this
  only when complexity demands it.
- **Pre-product-market-fit churn.** When architecture changes weekly, durable
  context is stale by Friday. Stabilize first.
- **Teams without documentation discipline.** Half-filled templates are worse
  than empty folders. If no one will maintain it, do not adopt it.
- **Continuous or non-release workflows.** The model is release-anchored. If you
  do not have a release rhythm to anchor reference to, the strongest guarantee
  in the system does not apply cleanly.

Use it for large, long-lived initiatives where the reasoning is expensive and
the system has to survive many hands. It is opt-in: small fixes still just ship,
and nothing forces a team to wrap trivial work in process.

## Anti-Patterns

- **`plan.md` as the only home of truth.** It is allowed to be messy, but if
  settled conclusions never graduate into `spec.md`, `architecture.md`, ADRs,
  or `reference/`, the knowledge dies with the branch.
- **Filling every template file as ceremony.** Not every initiative needs every
  file. An initiative padded with empty `infrastructure.md` and `operations.md`
  stubs trains everyone to ignore them. Tune the template down to what the work
  actually needs.
- **Never folding `context/` back into `reference/`.** Working context that is
  never harvested at release time defeats the entire reference vs working
  context split. Drift is fine in `context/`; it is not fine to let the durable
  truth never get written.
- **Letting `context/` be the only home for decisions.** The bench is
  disposable; it gets archived. If accepted architecture and design decisions
  are never promoted into the durable `decisions/` log, the rationale dies with
  the initiative that made it.

## Pitfalls To Watch

- **Unverified agent-generated context.** A confidently wrong `architecture.md`
  is worse than none, because the next agent treats it as ground truth. The
  human-in-the-loop is not optional — reviewing the prose *is* the work, and it
  is far cheaper than guessing whether the code was sound after the fact.
- **Context-window competition.** This is only a problem if you do everything in
  one session. The intended pattern is the opposite: planning, review, and
  implementation each get their own session, and implementation refers back to
  the settled plan rather than re-deriving it. Keep the sessions separate and
  the window does not fight the code.
- **Secrets leaking into the repo.** `infrastructure.md`, `delivery.md`, and
  `operations.md` invite environment, identity, and rollback detail. Keep real
  secrets in pipeline secret stores and key vaults. The `infrastructure.md`,
  `delivery.md`, and `operations.md` templates carry a redaction reminder for
  exactly this — reference secret names and vault paths, never values — and
  reviewers should treat these files as public.

## The Honest Framing

Code-Anchored Context does not claim to remove documentation discipline — it
relocates it to where the source of truth lives and gives it a release-anchored
refresh. The trade is real: more structure, more reviewing, more up-front
agreement on when releases ship. For large systems that have to outlive any one
session, tool, or engineer, that trade is worth making. For everything else, it
is honestly overkill — and that is fine.

For where this approach sits relative to the ideas it borrows from, see the
"A Deliberate Bundle" section of
[Code-Anchored Context: Why](code-anchored-context-why.md).
