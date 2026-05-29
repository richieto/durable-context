# Agent Guidance - PROJECT_NAME

This file applies to the whole repo. Area-specific `AGENTS.md` files in
subfolders layer on top of it. Read those too when working in a given area.

## Working Context

In-progress specs, plans, ADRs, backlog, implementation context, and
release-documentation notes live under [`context/`](context/).
Start with [`context/current.md`](context/current.md).

For behavior-changing work, use the repo-wide skill at
[`.agents/skills/code-anchored-context/SKILL.md`](.agents/skills/code-anchored-context/SKILL.md).
Keep initiative knowledge centralized under `context/`; area
`AGENTS.md` files should point there rather than copying active plans.

## Docs Authoring

### When To Edit `docs/`

Do not edit `docs/` as a side effect of feature work, bug fixes,
refactors, or other code changes. Docs in this model are release-anchored:
they describe the behavior of a specific release tag, not the partial state of
a working branch.

Touch `docs/` only when:

- A human explicitly asks you to refresh the docs for a release, typically
  after a release tag is cut and QA has signed off.
- A human explicitly asks you to create or refresh baseline documentation for
  an existing project.
- A human explicitly asks you to update a specific page.
- A human asks you to fix a demonstrable error in an existing page, such as a
  broken link or factual inaccuracy.

If you are unsure whether the request is one of these, ask before editing.

If a project has documentation that intentionally follows a different cadence,
document that exception in the area's README and in
`docs/_authoring/areas/`.

### Where The Authoring Guidance Lives

All documentation workflow, per-area authoring guides, and domain terminology
live under [`docs/_authoring/`](docs/_authoring/). Start
with [`docs/_authoring/README.md`](docs/_authoring/README.md).

If you are refreshing docs, the per-area guides in
[`docs/_authoring/areas/`](docs/_authoring/areas/) tell you
what matters and what to ignore for each area.

`AGENTS.md` files stay lean. They are for coding conventions and agent
restrictions, not detailed documentation guidance. If you have doc rules to
add, add them under `_authoring/`.
