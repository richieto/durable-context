# Area Name

## Scope

- Code root: `path/to/code`
- Documentation root: `Documentation/<Area>/`
- Owner or reviewer: TBD

Describe what this area owns and what it intentionally does not own.

## Feature Inventory

| Feature | Documentation page | Notes |
| --- | --- | --- |
| TBD | `Documentation/<Area>/features/<feature>.md` | TBD |

## What Matters At Release Time

Document behavior changes that affect:

- user, operator, or API-visible behavior
- permissions, validation, or error handling
- data creation, mutation, retention, or migration
- integrations or external contracts
- observability, support, or operational procedures
- configuration, environment shape, or deployment behavior

## What To Ignore

Ignore changes that do not alter released behavior:

- pure refactors
- internal renames
- formatting or lint-only changes
- test-only changes
- dependency bumps with no behavior impact
- temporary migration scaffolding that will not ship as behavior

## Code Orientation

List the files, folders, entry points, or search terms that help an agent map a
release diff to documentation pages.

## Terminology

List area-specific terms or link to `Documentation/_authoring/terminology.md`.

## Cross-Links

List related areas and when docs should cross-link instead of duplicating
behavior.
