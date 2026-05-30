# Reference

This folder holds release-anchored reference material for PROJECT_NAME.

Reference describes accepted system behavior for a known release, tag, or
explicit baseline. It is not the place for in-progress planning,
implementation notes, or draft architecture decisions. Put that work in
`context/`.

## Start Here

- `releases/index.md` records release or baseline reference refreshes.
- `_authoring/README.md` explains how humans and agents should author
  reference material.
- `_authoring/workflow.md` defines when reference material is refreshed and what
  belongs here.
- `_authoring/areas/` contains per-area authoring guidance.

## Standard Layout

```text
reference/
  README.md
  releases/
    index.md
  _authoring/
    README.md
    workflow.md
    terminology.md
    areas/
      <area>.md
  _templates/
    area/
      README.md
      features/
        feature-template.md
  <Area>/
    README.md
    features/
      <feature>.md
```

Every documented area should have:

- a high-level `README.md` that explains the area's purpose and architecture
- one page per feature under `features/`
- an authoring guide under `reference/_authoring/areas/`

## Contributing

- Refresh reference material only when explicitly asked.
- For existing projects with little or no reference material, create
  baseline reference only when explicitly asked; otherwise document touched
  behavior during future release refreshes.
- Write for non-developer technical readers unless the project states
  otherwise.
- Write from behavior outward: product-readable first, technically anchored
  where details affect shipped behavior, operations, or support.
- Describe behavior, inputs, outputs, permissions, errors, business rules, and
  operational expectations in domain language.
- Prefer Mermaid diagrams for flows, architecture, and relationships.
- Add release refreshes to `reference/releases/index.md`.
