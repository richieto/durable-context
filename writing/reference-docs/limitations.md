# Code-Anchored Docs: Limitations, Anti-Patterns, and When Not To Use It

Every other article in the Code-Anchored Docs series makes the case *for* the
practice. This one is the honest accounting of where it costs more than it
returns, where it breaks, and how to tell.

## When Not To Use It

- **No release rhythm.** The model is release-anchored. If you do not cut
  release tags or ship on a cadence you can document against, the strongest
  guarantee in the system does not apply cleanly.
- **Teams that will not run the refresh.** Half-updated docs are worse than
  none. If no one will invoke the refresh after a release, do not adopt the
  scaffold.
- **Docs that are not behavior-shaped.** Contribution guides, onboarding, and
  runbooks belong elsewhere. This practice is for what the product *does* as of
  a known release — not for every markdown file in the repo.

Use it when product reference documentation matters and you already tag releases.
It is opt-in: the refresh runs only when explicitly asked.

## Anti-Patterns

- **Never folding shipped behavior into the docs.** Working notes that never
  become release-anchored documentation defeat the point. Drift in planning
  context is fine; letting shipped truth never get written is not.
- **Treating docs as a side effect of feature work.** Reference is not edited
  while a branch is in flight. Refresh it once per release, anchored to a tag,
  or the docs will chase half-finished work.
- **Assuming the diff filters noise for you.** `git diff` between tags contains
  refactors, formatting, and dependency bumps. The refresh step applies judgment
  about what changed in released behavior — do not skip that step.

## The Honest Framing

Code-Anchored Docs does not claim to remove documentation discipline — it
relocates it to where the source of truth lives and makes the refresh
derivable from the code. The trade is real: release tags, a deliberate lag
between merge and document, and someone accountable for running the refresh.
For products that have to outlive any one writer, that trade is worth making.
For everything else, it is honestly overkill — and that is fine.

For the principle behind the practice, see
[Code-Anchored Docs: Why](why.md).
