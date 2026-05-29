# Release Doc Notes

Use this file to capture product-documentation impact while development is
in progress. At release time, these notes help refresh `docs/`
against the final shipped behavior.

Do not edit `docs/` from normal development work unless a human
explicitly asks for a documentation refresh or a specific documentation fix.

## Product Behavior Changes

- The template can now be adopted through `npx code-anchored-context init`
  instead of manual copying.
- The installed folder names are now `context/` for working context and
  `docs/` for release-anchored product docs.
- `--no-docs`, `--dry-run`, `--force`, `--target`,
  `--project-name`, and `--release` control installation behavior.
- Existing `AGENTS.md` files are preserved and receive a bounded
  Code-Anchored Context section. Common case variants such as `Agents.md` are
  reused rather than duplicated.
- Existing generated path variants are handled conservatively: `docs`
  variants are skipped unless replaced with `--force`, and
  `.agents/skills/README.md` variants are reused for the skill index.
- Starter documentation guidance now tells agents to write from behavior
  outward: product-readable first, technically anchored where details affect
  shipped behavior, operations, support, or auditability.

## Candidate Docs Areas

- Root `README.md` adoption and publishing sections.
- `docs/_authoring/workflow.md` writing focus and documentation
  modes.
- Future release documentation only if this template repo begins documenting
  its own shipped CLI as product behavior.

## QA Or Support Notes

- Ask users to run `--dry-run` first when adopting into a mature repo with an
  existing `AGENTS.md`, `.agents/`, `context/`, or `docs/`.

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
