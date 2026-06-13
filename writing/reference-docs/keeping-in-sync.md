# Code-Anchored Docs: Keeping Docs In Sync

This is the companion to
[Code-Anchored Docs: Why](why.md). It covers the tag-diff
workflow: how shipped-behavior docs stay true after a release is accepted.

## The Tag-Diff Workflow

The mechanism is simple, and it does not depend on anyone using Durable Context.
You only need release tags and one person to run the refresh.

```text
1. Cut release tags as you ship:        release/v4_0_0 ... release/v5_0_0
2. Ask the agent to refresh docs
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
behavior. That diff is still the source of truth for what to inspect.

When `context/initiatives/*/release-doc-notes.md` files exist from the Durable
Context practice, they make the refresh sharper — notes captured during
development about what should become docs later — but they are optional
enrichment, never a requirement.

## Why This Matters More Than It Looks

Anchoring docs to the tagged release and refreshing from the diff turns product
documentation into a derivable artifact instead of a chore.

It also degrades gracefully. If only one person on the team cares about docs,
they can still keep them accurate from the tags alone, whether or not their
colleagues use a planning workflow at all. Planning notes make the refresh
richer; the tags make it possible.

## The Skills

Reference Docs ships as `reference-docs` with two
invocation-only skills:

- `reference-from-tags` — run the tag-to-tag refresh above.
- `reference-baseline` — document the current accepted behavior as a first
  baseline for a repository that has no docs tree yet.

Neither one fires on its own — you ask for them by name when a release is ready
to be documented.

For the honest accounting of where all of this is *not* worth it, see the
companion article,
[Code-Anchored Docs: Limitations](limitations.md).
