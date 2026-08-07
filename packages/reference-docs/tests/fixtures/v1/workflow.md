# Reference Workflow

How `reference/` is structured, written, and refreshed. Area-specific paths live in [`areas/`](areas/).

## When To Edit

Only when a human explicitly asks: release refresh, baseline, a specific page update, or a demonstrable fix. Never as a side effect of feature work — flag staleness in `release-doc-notes.md` instead.

## Modes

**Baseline** — document current accepted behavior. Use `.agents/skills/reference-baseline/SKILL.md`. Record reference point in `reference/releases/index.md`.

**Release-forward** — sparse start; refresh at tag time from diff. Use `.agents/skills/reference-from-tags/SKILL.md`. Optional hints from `context/initiatives/*/release-doc-notes.md`.

## Cadence

Refreshed once per accepted release, anchored to tag (default `release/vMAJOR_MINOR_PATCH`). Document custom tag conventions here before first refresh.

## Audience

Non-developer technical readers (QA, product, support, operators) unless the project defines otherwise. Behavior and rules in domain language; link to source for depth.

## Layout

```text
reference/<Area>/
  README.md
  features/<feature>.md
```

Write from observable behavior outward. Mermaid for architecture/flow when clearer than prose; keep diagrams small.

## Release Refresh (summary)

1. Diff `<previous-tag>..<target>`, one area at a time per area guide.
2. Update affected pages; ignore refactors and test-only changes.
3. Append `reference/releases/index.md` row.

Full steps: `.agents/skills/reference-from-tags/SKILL.md`.

## Do Not Document

Internal helpers, generated API docs (link instead), transient scaffolding, or open plans (those live in `context/`).
