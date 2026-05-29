# Initiative Title

Status: Draft
Release: v0_1_0
Primary area: TBD
Program: None

## Summary

Briefly describe the change, why it exists, and what outcome it should
produce.

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

Mark files as not applicable if they do not matter for this initiative.
Create or keep `operations.md` only when there is actionable runtime,
support, observability, rollback, or repair context.

## Carry-Forward Context

- Program: None
- Deferred backlog items: None

## Open Questions

- None yet.

## Implementation Status

- Not started.

## Agent Notes

- Keep initiative knowledge in this folder.
- Use `plan.md` for live alignment, questions, options, and rough thinking.
  Promote settled conclusions into the stable initiative files.
- Update `release-doc-notes.md` when shipped behavior or product-facing
  behavior changes.
- Do not update `docs/` from this initiative unless a human
  explicitly asks for release documentation work.
