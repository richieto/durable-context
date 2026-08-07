# Reference Authoring Guide

This subtree separates package-managed reference guidance from project-owned
knowledge for material under `REFERENCE_ROOT/`.

## Start Here

- [`workflow.md`](workflow.md) is the package-managed generic workflow.
- [`project.md`](project.md) is the project-owned overlay for local conventions
  and exceptions. Package updates never overwrite it.
- [`terminology.md`](terminology.md) holds project and domain language.
- [`areas/`](areas/) contains one project-owned guide per documented area.

Skills read the generic workflow first, then the project overlay and relevant
area guides. When local guidance differs, the more specific project or area
guidance applies without requiring edits to package-managed skills.

## Area Guide Pattern

Create one guide per documented area:

```text
REFERENCE_ROOT/_authoring/areas/<area-slug>.md
```

Each area guide should identify:

- source locations that own the behavior, including product code, tests,
  configuration, CI/CD, infrastructure, and generated artifacts
- the reference root under `REFERENCE_ROOT/`
- feature pages that should exist
- behavior that matters at release time
- changes to ignore
- useful search terms, terminology, dependencies, and cross-links

Use [`areas/_template.md`](areas/_template.md) when adding an area.

## Ownership And Updates

The package manages this README and `workflow.md`, with conflict protection for
direct edits. Put durable project rules in `project.md`; keep terminology, area
guides, release history, templates, and reference pages project-owned.

If an update reports a conflict in a managed file, move local rules into the
project overlay and retry. Use `--force` only to replace the reported managed
files; it never removes whole directories or unknown project files.

Keep root and area `AGENTS.md` files lean. Point them here rather than copying
the detailed authoring workflow.
