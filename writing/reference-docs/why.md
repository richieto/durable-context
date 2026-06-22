# Code-Anchored Docs: Why

Product documentation that is actually correct is rare. Nobody wants to write
it, and it drifts the moment they stop. This article is the principle behind
keeping shipped-behavior docs accurate by anchoring them to the code that was
released — not to someone's memory or an external tool.

## The Problem: Docs Drift

You can connect coding agents to documentation tools today and instruct them to
"update the documentation." The problem is the same as plan mode trapped in a
session. Every team member has to follow the practice, and it only works through
the specific coding agent connected to that specific tool on that specific
machine. You are constrained to that configuration. Want to try a new coding
agent? Configure everything again.

If documentation instead lives in the repository, it ships with the feature at
the same time. That keeps it accurate, and it comes with everything the repo
already gives you: it can reference exact files and lines, it gets git tracking
by default, and you get auditing for free.

> Documentation that ships with the change cannot drift away from it.

This is a different problem from owning the working context while you plan a
change — that is
[Durable Context](../durable-context/model.md). Code-Anchored Docs is about the
*stable* half: what the product does as of a known release, kept true as the
code ships.

## The Model: Release-Anchored, Eventually Consistent

Code-Anchored Docs describes accepted behavior for a known release. It is not
edited as a side effect of feature work. It is refreshed once per release,
after the release is accepted, anchored to a git tag.

That is what keeps it accurate: a partially built branch has no settled truth to
document yet. There is a deliberate lag between "merged" and "documented," and
the release tag is what closes it. Docs at a tag describe the behavior of that
tag — not the tip of the branch, and not an unfinished plan.

> Docs are eventually consistent with the code. The release tag closes the gap.

This practice works with zero adoption of Durable Context. Release tags and one
person to run the refresh are the only requirements. Planning artifacts, if
present, are optional enrichment — never a dependency.

## Where The Docs Live

The practice is about *docs* — shipped behavior, features, and product truth.
The installer defaults to `reference/` at the repo root because this has to
drop into existing projects, and I cannot know what your `docs/` already holds.
Overloading a folder that may already mean something else invites collisions and
silent reinterpretation.

If you prefer the docs branded under a docs tree, `docs/reference/` is a natural
alternative home. Some teams already keep contribution guides, onboarding, and
runbooks in `docs/`; putting shipped-behavior reference under
`docs/reference/` makes the boundary explicit.

> The boundary that matters is shipped behavior vs everything else — not the
> label on the folder.

The reference templates and authoring guides live inside `reference/` for the
same reason: they are meant to be customized with the documentation tree they
shape. Skills invoke the workflow, but the repo owns the document structure,
terminology, area guides, and page templates.

## The Principle

I think of this as **Code-Anchored Docs**. Not a methodology — a rule of
thumb:

> Keep product documentation anchored to release tags of the code, and refresh
> it from the diff between tags so it stays derivable instead of ceremonial.

The code diff is what you inspect. Human or agent judgment is what decides what
changed in *released behavior* worth documenting — the diff itself contains
refactors, formatting, and dependency bumps right alongside real behavior
changes.

## Install

```bash
npx reference-docs init --project-name "My App"
```

This adds the `reference/` tree (or your chosen path) and invocation-only
skills (`reference-from-tags`, `reference-baseline`). Ask for them by name when
a release is ready to be documented — they do not run automatically.

For how the tag-diff refresh works in practice, see
[Code-Anchored Docs: Keeping Docs In Sync](keeping-in-sync.md).

For the honest accounting of where this is not worth it, see
[Code-Anchored Docs: Limitations](limitations.md).
