# Documentation Authoring Guide

This subtree owns all guidance for authoring and refreshing the documentation
under `Documentation/`. Humans and agents both read from here to know how
documentation is structured, when it is refreshed, what belongs in each area,
and which domain terminology to use.

## Start Here

- [`workflow.md`](workflow.md) explains how docs are versioned, refreshed, and
  structured.
- [`terminology.md`](terminology.md) holds project-specific domain language.
- [`areas/`](areas/) contains one file per documented area, covering feature
  inventory, code orientation, conventions, and what matters at release time.

## Area Guide Pattern

Create one authoring guide per documented area:

```text
Documentation/_authoring/areas/<area-slug>.md
```

Each area guide should identify:

- the source locations that own the behavior, such as product code,
  interfaces, tests, CI/CD, generated artifacts, infrastructure, or config
- the documentation root under `Documentation/`
- feature pages that should exist
- behavior that matters at release time
- changes to ignore, such as pure refactors or test-only edits
- domain terms and cross-links specific to that area

Use [`areas/_template.md`](areas/_template.md) when adding a new area guide.

## Relationship To `AGENTS.md`

Area `AGENTS.md` files may point here, but they should not copy the detailed
documentation workflow. Keep authoring rules in this subtree so the guidance
has one source of truth.

## Contributing

Edits to this subtree usually belong with documentation workflow changes or
release refresh work. If a project's documented area changes shape, update the
matching authoring guide.
