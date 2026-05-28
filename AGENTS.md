# Agent Guidance - PROJECT_NAME

This file applies to the whole repo. Area-specific `AGENTS.md` files in
subfolders layer on top of it. Read those too when working in a given area.

## Development Context

In-progress specs, plans, ADRs, backlog, implementation context, and
release-documentation notes live under [`Development/`](Development/).
Start with [`Development/current.md`](Development/current.md).

For behavior-changing work, use the repo-wide skill at
[`.agents/skills/development-initiative-context/SKILL.md`](.agents/skills/development-initiative-context/SKILL.md).
Keep initiative knowledge centralized under `Development/`; area
`AGENTS.md` files should point there rather than copying active plans.

## Documentation Authoring

### When To Edit `Documentation/`

Do not edit `Documentation/` as a side effect of feature work, bug fixes,
refactors, or other code changes. Docs in this model are release-anchored:
they describe the behavior of a specific release tag, not the partial state of
a working branch.

Touch `Documentation/` only when:

- A human explicitly asks you to refresh the docs for a release, typically
  after a release tag is cut and QA has signed off.
- A human explicitly asks you to update a specific page.
- A human asks you to fix a demonstrable error in an existing page, such as a
  broken link or factual inaccuracy.

If you are unsure whether the request is one of these, ask before editing.

If a project has documentation that intentionally follows a different cadence,
document that exception in the area's README and in
`Documentation/_authoring/areas/`.

### Where The Authoring Guidance Lives

All documentation workflow, per-area authoring guides, and domain terminology
live under [`Documentation/_authoring/`](Documentation/_authoring/). Start
with [`Documentation/_authoring/README.md`](Documentation/_authoring/README.md).

If you are refreshing docs, the per-area guides in
[`Documentation/_authoring/areas/`](Documentation/_authoring/areas/) tell you
what matters and what to ignore for each area.

`AGENTS.md` files stay lean. They are for coding conventions and agent
restrictions, not detailed documentation guidance. If you have doc rules to
add, add them under `_authoring/`.
