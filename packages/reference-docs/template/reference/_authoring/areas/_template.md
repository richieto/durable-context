# Area Name

## Scope

- Source orientation: `path/to/runtime-or-product-code`, `path/to/contracts`,
  `path/to/tests`, `path/to/ci-or-delivery`, `path/to/infra-or-config`
- Reference root: `reference/<Area>/`
- Owner or reviewer: TBD

Describe what this area owns and what it intentionally does not own.

## Audience And Depth

State any area-specific audience or depth rules. By default, write for
Product Owners, QA, support, operators, customer engineers, and technical
readers who need behavior, rules, data effects, permissions, errors, and
operational expectations without private implementation detail.

## Feature Inventory

| Feature | Reference page | Notes |
| --- | --- | --- |
| TBD | `reference/<Area>/features/<feature>.md` | TBD |

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

## Baseline Discovery Notes

Use this section when creating first-pass documentation for an existing
project. List stable workflows, important entry points, source references,
known gaps, and questions that should not yet appear in product-facing docs.

## Terminology

List area-specific terms or link to `reference/_authoring/terminology.md`.

## Cross-Links

List related areas and when reference should cross-link instead of duplicating
behavior.
