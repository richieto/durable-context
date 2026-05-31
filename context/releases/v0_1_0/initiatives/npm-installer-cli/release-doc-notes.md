# Release Doc Notes

Use this file to capture reference impact while development is
in progress. At release time, these notes help refresh `reference/`
against the final shipped behavior.

Do not edit `reference/` from normal development work unless a human
explicitly asks for a reference refresh or a specific reference fix.

## Product Behavior Changes

- The template can now be adopted through `npx code-anchored-context init`
  instead of manual copying.
- The installed folder names are now `context/` for working context and
  `reference/` for release-anchored reference.
- `--no-reference`, `--dry-run`, `--force`, `--target`,
  `--project-name`, and `--release` control installation behavior.
- Existing `AGENTS.md` files are preserved and receive a bounded
  Code-Anchored Context section. Common case variants such as `Agents.md` are
  reused rather than duplicated.
- Existing `docs/` folders are preserved because the installed reference
  scaffold now lives under `reference/`.
- Existing generated path variants are handled conservatively:
  `reference` variants are skipped unless replaced with `--force`, and
  `.agents/skills/README.md` variants are reused for the skill index.
- Companion article and presentation drafts are kept under `writing/` in this
  repository and are not installed into consumer projects.
- Starter reference guidance now tells agents to write from behavior
  outward: product-readable first, technically anchored where details affect
  shipped behavior, operations, support, or auditability.
- The template now installs `context/project-profile.md` as an optional
  source-backed repo baseline for stack, commands, verification, delivery,
  infrastructure, observability, and generated artifacts.
- Agent guidance now directs repo-specific toolchain facts into
  `context/project-profile.md` rather than the reusable skill.

## Candidate Reference Areas

- Root `README.md` adoption and publishing sections.
- `context/project-profile.md` starter guidance.
- `.agents/skills/code-anchored-context/SKILL.md` project-profile workflow.
- `reference/README.md` root orientation.
- `reference/_authoring/workflow.md` writing focus and reference
  modes.
- Future release reference only if this template repo begins documenting
  its own shipped CLI as product behavior.

## QA Or Support Notes

- Ask users to run `--dry-run` first when adopting into a mature repo with an
  existing `AGENTS.md`, `.agents/`, `context/`, or `reference/`.
- Existing `docs/` folders are intentionally left alone.

## Exclusions

Record details that were considered but should not be documented because
they are internal implementation details, temporary scaffolding, or did not
ship.

- Internal recursive-copy implementation details do not need reference.

## Release-Time Checklist

- [ ] Compare this initiative against the final shipped code.
- [ ] Update the relevant reference only after reference refresh work
      is explicitly requested.
- [ ] Add the release row if the reference workflow requires it.
