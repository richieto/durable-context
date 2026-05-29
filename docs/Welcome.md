# PROJECT_NAME Docs

Welcome to the release-anchored documentation for PROJECT_NAME.

This folder describes shipped behavior for a known release or tag. It is not
the place for in-progress feature planning, implementation notes, or draft
architecture decisions. Put that work in `context/`.

## How These Docs Are Organized

```text
docs/
  .order
  Welcome.md
  releases/
    index.md
  _authoring/
    README.md
    workflow.md
    terminology.md
    areas/
      <area>.md
  <Area>/
    README.md
    features/
      <feature>.md
```

Every documented area should have:

- a high-level `README.md` that explains the area's purpose and architecture
- one page per feature under `features/`
- an authoring guide under `docs/_authoring/areas/`

## Contributing

- Refresh docs only when explicitly asked.
- For existing projects with no docs, create baseline documentation only when
  explicitly asked; otherwise document touched behavior during future release
  refreshes.
- Write for non-developer technical readers unless the project states
  otherwise.
- Write from behavior outward: product-readable first, technically anchored
  where details affect shipped behavior, operations, or support.
- Describe behavior, inputs, outputs, permissions, errors, business rules, and
  operational expectations in domain language.
- Prefer Mermaid diagrams for flows, architecture, and relationships.
- Add release refreshes to `docs/releases/index.md`.
