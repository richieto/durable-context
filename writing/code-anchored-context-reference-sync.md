# Code-Anchored Context: Keeping Reference In Sync

This is a companion to
[Code-Anchored Context: Why](code-anchored-context-why.md) and
[Code-Anchored Context: The Structure](code-anchored-context-structure.md).
It answers the question that the reference vs working context split always
provokes: if `context/` is allowed to drift, how does the *stable* half stay
true?

## Two Halves, Two Lifetimes

`reference/` is the source of truth. It describes accepted behavior for a known
release. `context/` is working-time scaffolding: plans, options, decisions,
and the reasoning around a change while it is being built.

Those two halves have different lifetimes on purpose.

> `context/` is allowed to drift. `reference/` is not.

The drift in `context/` is not a defect to fix. It is the point. Working
context is where ambiguity gets resolved, so it is messy by nature and it goes
stale the moment the work it described ships. What matters is that the durable
conclusions do not stay trapped there — they are folded into `reference/` when
the release is accepted, and `context/` is free to move on.

## The Refresh Is Release-Anchored, Not Continuous

Reference is not edited as a side effect of feature work. It is refreshed once
per release, after the release is accepted, anchored to a git tag. That is what
keeps it accurate: a partially built branch has no settled truth to document
yet.

This means reference is *eventually consistent* with the code. There is a
deliberate lag between "merged" and "documented," and the release tag is what
closes it. Reference at a tag describes the behavior of that tag — not the tip
of the branch, and not an unfinished plan.

## The Tag-Diff Workflow

The mechanism is simple, and it does not depend on the whole team adopting
`context/`. You only need release tags and one person to run the refresh.

```text
1. Cut release tags as you ship:        release/v4_0_0 ... release/v5_0_0
2. Ask the agent to refresh reference
   from the diff between them:           release/v4_0_0..release/v5_0_0
3. The agent updates only the pages
   whose behavior actually changed.
4. Record the refresh:                   reference/releases/index.md
```

Working from `<previous-release-tag>..HEAD` (or tag-to-tag) scopes the agent to
what actually shipped between two known points. The diff itself contains
everything — refactors, renames, formatting, lint, and dependency bumps right
alongside real behavior changes. What filters the noise is the refresh step,
not the diff: the agent reads the full diff and only updates the pages whose
*released behavior* changed, deliberately skipping the changes that carry no
behavior. That diff is still the source of truth for what to inspect, which is
exactly why this works whether or not anyone used the planning workflow. When
`context/initiatives/*/release-doc-notes.md` files exist, they make the refresh
sharper — they are the notes captured during development about what should
become reference later — but they are optional enrichment, never a requirement.

## Why This Matters More Than It Looks

This is the quiet payoff of the whole approach. Product reference documentation
that is actually correct is rare, because nobody wants to write it and it drifts
the moment they stop. Anchoring it to the source of truth — the tagged release —
and refreshing it from the diff turns it into a derivable artifact instead of a
chore.

It also degrades gracefully. If only one person on the team cares about
reference, they can still keep it accurate from the tags alone, whether or not
their colleagues use `context/` at all. The working context makes the refresh
richer; the tags make it possible.

This is why reference ships as its own package. The
`@code-anchored-context/reference` install carries two invocation-only skills
and nothing from the planning side: `reference-from-tags` runs the tag-to-tag
refresh above, and `reference-baseline` documents the current accepted behavior
as a first baseline for a repository that has no reference yet. Neither one
fires on its own — you ask for them by name when a release is ready to be
documented.

For the honest accounting of where all of this is *not* worth it, see the
companion article,
[Code-Anchored Context: Limitations](code-anchored-context-limitations.md).
