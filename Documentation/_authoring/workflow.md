# Documentation Workflow

This file defines how documentation is versioned, refreshed, and structured
across the repo. It applies to all documented areas; area-specific guidance
lives in [`areas/`](areas/).

## When Docs Get Edited

Doc refresh is an explicit, on-request activity, not a side effect of code
work. Humans or agents touch `Documentation/` only when:

- A human explicitly asks for a release-time refresh, typically after the
  release tag is cut and QA has signed off.
- A human explicitly asks for baseline documentation for an existing project,
  such as "document this repo baseline" or "create initial docs for the current
  system."
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

## Documentation Modes

There are two valid ways to introduce or maintain `Documentation/`.

### Baseline Documentation

Use this mode only when a human explicitly asks to document the current system
as a starting point. This is common when adopting the template in an existing
project that has little or no product documentation.

When creating a baseline:

1. Confirm the scope: whole repo, one product area, one feature family, or one
   operational surface.
2. Create or update the matching area guide under
   `Documentation/_authoring/areas/` before writing product-facing pages.
3. Document stable, currently accepted behavior from the current branch,
   current tag, or explicit reference point named by the human.
4. Prefer broad, accurate coverage over exhaustive implementation detail.
5. Record the baseline reference in `Documentation/releases/index.md`. If
   there is no release tag yet, use the commit, branch, date, or human-named
   baseline label that was used as the source.
6. Leave uncertain or future behavior out of `Documentation/`. Capture open
   questions in `Development/` or in the area authoring guide.

Baseline docs are a snapshot of the system as adopted; they are not a promise
that every undocumented behavior is unimportant.

### Release-Forward Documentation

Use this mode when the team chooses not to create a full baseline. In this
mode, `Documentation/` may start sparse. Agents capture documentation impact
in initiative `release-doc-notes.md` during development, then update product
docs only at explicit release-refresh time.

This is valid when a full baseline would be too expensive. The documentation
becomes complete incrementally around behavior the team changes and releases.

## Cadence And Versioning

Docs live under `Documentation/`. After any explicit baseline pass, they are
refreshed once per release, at git-tag time, after release acceptance. Release
docs are anchored to the release tag; the docs at tag `release/v1_2_3`
describe the behavior of that release.

Default tag names follow the convention `release/vMAJOR_MINOR_PATCH` and match
the release branch name. If a project uses a different release convention,
document it here before the first refresh. If the first documentation pass is
a baseline without a tag, record the baseline reference in
`Documentation/releases/index.md`.

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

## Writing Focus

Write from behavior outward.

Start with what a user, Product Owner, operator, API consumer, support person,
or business process can observe. Add technical detail only when it affects
released behavior, configuration, permissions, data, integrations, errors,
support, operations, or auditability.

Documentation should be product-readable first and technically anchored
second. It can feed release notes, but it is more durable than release notes:
release notes summarize what changed, while `Documentation/` describes what
the accepted system does as of a release or baseline.

Use progressive depth:

1. Summary and purpose in product or domain language.
2. Workflows, roles, permissions, and business rules.
3. Inputs, outputs, data effects, integrations, errors, and edge cases.
4. Operational expectations, configuration, and dependencies when relevant.
5. Source references for verification, not as a substitute for explanation.

Do not document private implementation structure unless it is needed to
explain released behavior or support a reader's operational task.

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
3. Read relevant initiative `release-doc-notes.md` files under
   `Development/releases/<release>/initiatives/`.
4. Update the area's `README.md` if the high-level picture changed.
5. Update feature pages for behavior that changed.
6. Ignore pure refactors, internal renames, test-only changes, formatting,
   lint fixes, and dependency bumps with no behavior change.
7. Append one row to `Documentation/releases/index.md`.

## Source Order

For release refreshes, start from release-owned context before falling back to
source inspection:

1. Previous release tag to current release diff.
2. Relevant initiative `release-doc-notes.md` files.
3. Matching area guide under `Documentation/_authoring/areas/`.
4. Existing product documentation.
5. Source code, tests, config, CI/CD, infrastructure, and generated artifacts
   only as needed to verify shipped behavior.

For baseline documentation, start from the explicit baseline scope and
reference point named by the human. If no reference is named, use the current
working tree and say so in the release index row.

## What Not To Document

- Internal helpers, private types, or implementation details that can change
  without user or operator impact.
- Anything already covered by generated API reference or inline comments. Link
  to it when helpful.
- Transient migration scaffolding that will be removed before or soon after
  the release.
- Draft plans, undecided architecture, or open implementation questions. Those
  belong in `Development/`.
