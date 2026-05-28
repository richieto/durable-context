# Documentation Workflow

This file defines how documentation is versioned, refreshed, and structured
across the repo. It applies to all documented areas; area-specific guidance
lives in [`areas/`](areas/).

## When Docs Get Edited

Doc refresh is an explicit, on-request activity, not a side effect of code
work. Humans or agents touch `Documentation/` only when:

- A human explicitly asks for a release-time refresh, typically after the
  release tag is cut and QA has signed off.
- A human explicitly asks to update a specific page.
- A human asks to fix a demonstrable error in an existing page, such as a
  broken link or factual inaccuracy.

Do not update docs as part of a feature PR, bug fix, refactor, or dependency
bump. Mid-stream commits are partial work; "feature complete" is only
well-defined once the release is accepted.

Agents: if you are working on a code change and notice a doc that looks
outdated, leave it alone. Flag the staleness in your summary or add it to the
initiative's `release-doc-notes.md`, but do not edit the doc as part of the
current change unless explicitly asked.

## Cadence And Versioning

Docs live under `Documentation/` and are refreshed once per release, at
git-tag time, after release acceptance. Docs are anchored to the release tag;
the docs at tag `release/v1_2_3` describe the behavior of that release.

Default tag names follow the convention `release/vMAJOR_MINOR_PATCH` and match
the release branch name. If a project uses a different release convention,
document it here before the first refresh.

## Audience

Docs are written for non-developer technical readers by default: QA, product
owners, solution owners, support engineers, customer engineers, or operators.
Adjust this only when the project explicitly defines a different audience.

- Describe behavior, inputs, outputs, permissions, error conditions, and
  business rules in domain language.
- Avoid code snippets, private type names, SQL, and framework jargon unless
  the concept has no plain-language equivalent.
- For readers who need more depth than the docs provide, link to the source
  rather than replicating the implementation in prose.

## Two Levels Of Detail

Every documented area has two layers:

1. High level: a summary of what the area is for and an architecture
   description.
2. Detailed: one page per feature, written to the audience above.

Standard per-area layout:

```text
Documentation/<Area>/
  README.md
  features/
    <feature>.md
```

## Diagrams

Use Mermaid for architecture, flow, sequence, state, and data-relationship
diagrams. Mermaid remains readable as Markdown source and renders in common
Markdown viewers.

Use a diagram when the relationship between moving parts is easier to show
than to describe in prose. Prefer a short diagram over a long paragraph; prefer
a short sentence over an unnecessary diagram.

Avoid ASCII-art box drawings. When you edit a page that already has one,
replace it with Mermaid if the diagram is still useful.

Preferred diagram types:

| Scenario | Mermaid type |
| --- | --- |
| Component, topology, or data flow | `flowchart LR` or `flowchart TD` |
| Sequence of interactions | `sequenceDiagram` |
| Entity or table relationships | `erDiagram` |
| State machine | `stateDiagram-v2` |

Keep diagrams small enough to read. If a diagram needs more than about 15 nodes
or steps, simplify it or split it.

## Feature Docs Cover The Full Vertical

A feature doc should describe the full behavior path the feature touches:
entry point, important services or processes, data stored or read, external
systems, permissions, validation, errors, and operational expectations.

If a feature spans multiple areas, place the doc in the area that owns the
user-facing or operator-facing entry point. Cross-link from the other areas.

## Release-Time Doc Refresh

When invoked to refresh docs for a release:

1. Work from the diff `<previous-release-tag>..HEAD`, scoped to one area at a
   time.
2. Read the matching area guide in `Documentation/_authoring/areas/`.
3. Update the area's `README.md` if the high-level picture changed.
4. Update feature pages for behavior that changed.
5. Ignore pure refactors, internal renames, test-only changes, formatting,
   lint fixes, and dependency bumps with no behavior change.
6. Append one row to `Documentation/releases/index.md`.

## What Not To Document

- Internal helpers, private types, or implementation details that can change
  without user or operator impact.
- Anything already covered by generated API reference or inline comments. Link
  to it when helpful.
- Transient migration scaffolding that will be removed before or soon after
  the release.
- Draft plans, undecided architecture, or open implementation questions. Those
  belong in `Development/`.
