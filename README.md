# Code-Anchored Context Template

This repository is a reusable starting point for keeping repository-local
development context and release-anchored product documentation close to the
code they describe.

It separates two kinds of truth:

| Folder | Meaning | Updated when |
| --- | --- | --- |
| `Development/` | What the team is planning, building, deciding, validating, shipping, hosting, deferring, and learning. | During normal development. |
| `Documentation/` | What the product does as of a known release or tag. | Only during explicit documentation refresh work. |

The goal is to give humans and AI agents enough structured context to change a
codebase without relying on chat history, tribal memory, or scattered planning
notes.

## What This Template Contains

- `AGENTS.md` with repo-wide agent guidance.
- `.agents/skills/development-initiative-context/SKILL.md` for the recurring
  development-context workflow.
- `Development/` with terminology, release context, backlog/program structure,
  initiative templates, and a human-readable article and brief.
- `Documentation/` with a generic release-anchored documentation workflow,
  authoring guide structure, and area/page templates.

## Adopting This In A Project

1. Copy the files into a repository root.
2. Replace `PROJECT_NAME` placeholders with the project name.
3. Set the first active release in `Development/current.md`.
4. Add or revise area-specific `AGENTS.md` files so they point back to
   `Development/` and `Documentation/_authoring/`.
5. Create `Documentation/_authoring/areas/<area>.md` for each documented
   product or code area.
6. Keep product or domain-specific documentation out of this template repo.

## Working Rule

Development context can evolve with the branch. Product documentation should
stay stable and release-accurate. When behavior changes during development,
record future documentation impact in the relevant initiative's
`release-doc-notes.md`; refresh `Documentation/` only when that work is
explicitly requested.
