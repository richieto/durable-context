# Project Reference Conventions

This file is project-owned. Record durable authoring rules and exceptions here;
`reference-docs update` never overwrites it.

## Audience And Scope

- Default audience: QA, product, support, customer engineering, and operators.
- Project-specific audience or scope exceptions: None.

## Release Convention And Cadence

- Release tag format: `release/vMAJOR_MINOR_PATCH` unless the project uses a
  different convention.
- Refresh cadence exceptions: None.

## Optional Context Sources

- Project profile: `context/project-profile.md` when present.
- Release documentation notes: `context/**/release-doc-notes.md` when present.
- Accepted decisions: `decisions/` when present.
- Alternate project-specific paths: None.

These sources are optional hints. Verify released behavior against the tag diff
and implementation sources.

## Validation

- Required documentation checks: `git diff --check`.
- Additional project commands: None.

## Area Exceptions

Record project-wide ownership, cadence, generated-documentation, or cross-area
exceptions here. Put source orientation and feature inventories in the matching
area guide under `areas/`.
