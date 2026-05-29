# Release Documentation Notes

Use this file to capture product-documentation impact while development is
in progress. At release time, these notes help refresh `Documentation/`
against the final shipped behavior.

Do not edit `Documentation/` from normal development work unless a human
explicitly asks for a documentation refresh or a specific documentation fix.

## Product Behavior Changes

- The template can now be adopted through `npx code-anchored-context init`
  instead of manual copying.
- `--no-documentation`, `--dry-run`, `--force`, `--target`,
  `--project-name`, and `--release` control installation behavior.
- Starter documentation guidance now tells agents to write from behavior
  outward: product-readable first, technically anchored where details affect
  shipped behavior, operations, support, or auditability.

## Candidate Documentation Areas

- Root `README.md` adoption and publishing sections.
- `Documentation/_authoring/workflow.md` writing focus and documentation
  modes.
- Future release documentation only if this template repo begins documenting
  its own shipped CLI as product behavior.

## QA Or Support Notes

- Ask users to run `--dry-run` first when adopting into a mature repo with an
  existing `AGENTS.md`, `.agents/`, `Development/`, or `Documentation/`.

## Exclusions

Record details that were considered but should not be documented because
they are internal implementation details, temporary scaffolding, or did not
ship.

- Internal recursive-copy implementation details do not need product docs.

## Release-Time Checklist

- [ ] Compare this initiative against the final shipped code.
- [ ] Update the relevant product documentation only after release-doc work
      is explicitly requested.
- [ ] Add the release row if the documentation workflow requires it.
