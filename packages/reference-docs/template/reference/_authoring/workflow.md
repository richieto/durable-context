# Reference Workflow

This file defines how release-anchored reference material is introduced,
written, and refreshed. Area-specific source paths and exceptions belong in
[`areas/`](areas/); project-wide exceptions belong in [`project.md`](project.md).

## When Reference Gets Edited

Reference work is explicit and on request. Edit `REFERENCE_ROOT/` only when a
human asks for a baseline, a release refresh, a specific page update, or a
demonstrable documentation correction.

Do not update reference material as a side effect of feature work, bug fixes,
refactors, or dependency changes. If development reveals future documentation
impact, record it in the project's planning system or final summary instead.

## Reference Modes

### Baseline

A baseline documents stable, currently accepted behavior at a named reference
point. Use `.agents/skills/reference-baseline/SKILL.md`.

- Confirm the requested scope before writing.
- Create or update an area guide before adding product-facing pages.
- Prefer broad, accurate coverage over exhaustive implementation detail.
- Record the branch, tag, commit, date, or human-named baseline in
  `REFERENCE_ROOT/releases/index.md`.
- Keep unresolved and future behavior out of product-facing reference pages.

### Release Forward

Release-forward reference may begin sparse and become complete around behavior
the team changes. Use `.agents/skills/reference-from-tags/SKILL.md` at explicit
release-refresh time. The resolved tag diff remains the source of truth.
Optional release notes are hints: combine duplicate descriptions of the same
behavior while retaining all cited evidence, then verify them against the
release state.

## Cadence And Versioning

Refresh reference once per accepted release unless `project.md` documents a
different cadence. Anchor each refresh to a release tag or explicit baseline.
The default example tag format is `release/vMAJOR_MINOR_PATCH`; projects should
record their real convention in the project overlay.

## Audience And Writing Focus

Write for non-developer technical readers by default: QA, product, support,
customer engineering, and operators.

- Start with observable behavior, purpose, and reader outcomes.
- Explain workflows, roles, permissions, validation, errors, and business
  rules in product or domain language.
- Add data, configuration, integration, delivery, and operational detail when
  it affects released behavior or supportability.
- Avoid private type names, SQL, framework jargon, and source-shaped prose
  unless no reader-facing equivalent exists.
- Link to source for verification and depth; do not substitute links for an
  explanation.

Use progressive depth:

1. Summary and purpose.
2. Workflows, actors, permissions, and business rules.
3. Inputs, outputs, state changes, integrations, errors, and edge cases.
4. Configuration, dependencies, and operational expectations.
5. Source references for verification.

## Layout And Coverage

Each documented area normally has two levels:

```text
REFERENCE_ROOT/<Area>/
  README.md
  features/
    <feature>.md
```

The area README provides purpose and architecture. Feature pages cover the
complete observable path: entry point, important processes, stored or read
data, external systems, permissions, validation, failures, and operational
expectations.

When behavior spans areas, place the primary page with the reader-facing or
operator-facing owner and cross-link rather than duplicating it.

## Diagrams

Use Mermaid when architecture, sequence, state, topology, or relationships are
clearer visually than in prose. Prefer a sentence over an unnecessary diagram
and split diagrams that grow beyond roughly 15 nodes or steps. Avoid ASCII-art
box drawings.

| Scenario | Mermaid type |
| --- | --- |
| Components, topology, or data flow | `flowchart LR` or `flowchart TD` |
| Interactions over time | `sequenceDiagram` |
| Entity relationships | `erDiagram` |
| State transitions | `stateDiagram-v2` |

## Release Refresh Source Order

Use sources in this order, skipping optional sources that are absent:

1. The resolved previous-tag to target-tag diff.
2. Relevant `context/**/release-doc-notes.md` hints.
3. Accepted records under `decisions/`.
4. The matching area guide.
5. Existing reference pages.
6. Source, tests, configuration, CI/CD, infrastructure, and generated
   artifacts needed to verify released behavior.

`context/project-profile.md` may help locate stable operating facts, but
reference-docs does not require durable-context and does not invoke its skills.
Alternate planning or decision paths belong in `project.md`.

When source, tests, configuration, or IaC disagree about observable behavior,
surface the conflict. Do not silently choose the most convenient source and do
not publish unresolved behavior as accepted reference.

## Multi-Area Impact Preview

Before editing a release refresh that affects more than one reference area,
present a transient impact map:

| Area or page | Evidence | Proposed action | State |
| --- | --- | --- | --- |
| `Area/features/example.md` | Source, test, config, or IaC paths | `Update`, `Create`, `No change`, or `Investigate` | `Verified`, `Uncertain`, or `Conflicting` |

The preview is informational. Continue verified updates without asking for
blanket approval. Pause only when uncertain or conflicting evidence materially
changes the documentation scope or claim. Do not save the map under
`REFERENCE_ROOT/` or anywhere else in the repository.

## Release Refresh Checklist

1. Resolve and report the base and target tags.
2. Deduplicate release-note signals while retaining every evidence pointer.
3. For a multi-area refresh, present the transient impact map before edits.
4. Work one documented area at a time using its authoring guide.
5. Update the area README only when its high-level picture changed.
6. Update feature pages for material behavior changes.
7. Ignore formatting, lint, internal refactors, test-only changes, and
   dependency bumps without observable impact.
8. Append or update the release row in `REFERENCE_ROOT/releases/index.md`.
9. Run `git diff --check`, inspect changed paths, and run project validation.

## What Not To Document

- Private helpers or implementation details that can change without reader or
  operator impact.
- Generated API reference or inline documentation that should be linked.
- Temporary migration scaffolding.
- Draft plans, undecided architecture, disputed claims, or open implementation
  questions.

## Completion Criteria

A reference task is complete when its scope and reference point are recorded,
claims are source-backed, existing project work is preserved, open questions
and conflicting evidence are not presented as accepted behavior, release
history is current when applicable, and the final summary reports pages
changed and validation run.
