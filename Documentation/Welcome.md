# PROJECT_NAME Documentation

Welcome to the release-anchored documentation for PROJECT_NAME.

This folder describes shipped behavior for a known release or tag. It is not
the place for in-progress feature planning, implementation notes, or draft
architecture decisions. Put that work in `Development/`.

## How This Documentation Is Organized

```text
Documentation/
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
- an authoring guide under `Documentation/_authoring/areas/`

## Contributing

- Refresh docs only when explicitly asked.
- Write for non-developer technical readers unless the project states
  otherwise.
- Describe behavior, inputs, outputs, permissions, errors, business rules, and
  operational expectations in domain language.
- Prefer Mermaid diagrams for flows, architecture, and relationships.
- Add release refreshes to `Documentation/releases/index.md`.
