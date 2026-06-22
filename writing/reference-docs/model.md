# Reference Docs: The Model

Reference Docs keeps shipped-behavior documentation anchored to the code that
was released. It is not a replacement for planning context, contribution
guides, onboarding, or runbooks. It is the stable reference for what the
product does as of a known release.

The core idea is simple:

> Keep product documentation anchored to release tags of the code, and refresh
> it from the diff between tags so it stays derivable instead of ceremonial.

## The Model

Reference Docs describes accepted behavior for a known release. It is not
edited as a side effect of feature work. It is refreshed after a release is
accepted, anchored to a git tag.

That deliberate lag is what keeps the docs honest. A partially built branch has
no settled truth to document yet. Docs at a tag describe the behavior of that
tag, not the tip of the branch and not an unfinished plan.

Documentation still needs judgment. The code diff shows what changed; a human
or agent decides what changed in released behavior.

## Where The Docs Live

The installer defaults to `reference/` at the repo root because this has to
drop into existing projects without redefining what their existing `docs/`
folder means. If a team already uses `docs/` for engineering docs, runbooks, or
onboarding, `docs/reference/` is also a natural home.

The boundary that matters is shipped behavior versus everything else, not the
folder label.

The reference templates and authoring guides live inside `reference/` on
purpose. They are meant to be customized with the documentation tree they
shape. Skills invoke the workflow, but the repo owns the document structure,
terminology, area guides, and page templates.

## The Tag-Diff Workflow

The mechanism only needs release tags and someone to run the refresh:

```text
1. Cut release tags as you ship:        release/v4_0_0 ... release/v5_0_0
2. Ask the agent to refresh docs
   from the diff between them:           release/v4_0_0..release/v5_0_0
3. Update only pages whose released
   behavior changed.
4. Record the refresh:                   reference/releases/index.md
```

Working from `<previous-release-tag>..<target-release-tag>` scopes the agent to
what actually shipped between two known points. The diff itself contains
refactors, renames, formatting, lint, and dependency bumps alongside real
behavior changes. The refresh step filters that noise and updates only the
reference pages whose released behavior changed.

## Relationship To Durable Context

Reference Docs works with zero adoption of
[Durable Context](../durable-context/model.md). Release tags are the source of
truth. Planning artifacts, when present, are optional enrichment.

When `context/initiatives/*/release-doc-notes.md` exists, it can make the
refresh sharper by pointing at behavior that should become docs later. Those
notes are hints, not authority; verify them against the tag diff.

## Install

```bash
npx reference-docs init --project-name "My App"
```

This adds the `reference/` tree and two invocation-only skills:

- `reference-baseline` — document current accepted behavior as a first baseline.
- `reference-from-tags` — refresh `reference/` from a tag-to-tag diff.

After install, `npx reference-docs@latest update` refreshes managed agent
skills and guidance without replacing `reference/`.

For where this model is not worth it, see
[Reference Docs: Limitations](limitations.md).
