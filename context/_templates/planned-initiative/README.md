# Planned Initiative Title

Status: Planned
Target release: vNEXT
Program: `context/programs/<program-slug>/`
Promotion target: `context/releases/vNEXT/initiatives/<initiative-slug>/`
Promoted to: None
Promoted on: None

## Summary

Briefly describe the future delivery slice, why it belongs to the program,
and what outcome it should produce.

## Touched Areas

- Product or runtime code: `path/to/...`
- Interfaces, APIs, or contracts: `path/to/...`
- Tests or verification: `path/to/...`
- Delivery, CI/CD, build, or artifacts: `path/to/...`
- Infrastructure, IaC, or environment config: `path/to/...`
- Docs or release notes: `path/to/...`

Remove entries that do not apply and add the real paths. Prefer naming the
delivery concern over assuming a specific folder layout.

## Current Source Of Truth

- `plan.md`
- `spec.md`
- `interface.md`
- `architecture.md`
- `testing.md`
- `delivery.md`
- `infrastructure.md`
- `operations.md` when actionable
- `backlog.md`
- `release-doc-notes.md`

Mark files as not applicable if they do not matter for this planned
initiative. Create or keep `operations.md` only when there is actionable
runtime, support, observability, rollback, or repair context.

## Promotion Notes

When the target release becomes current, promote this planned initiative into
the target release initiative folder. Do not delete this planned initiative;
leave it as the historical planning record and update the promotion metadata.

## Open Questions

- None yet.

## Agent Notes

- Use this folder when future scope is known well enough to preserve as a
  scoped delivery slice, but the target release is not current yet.
- Keep durable cross-release strategy in the parent program.
- Keep active implementation work in the release initiative after promotion.
