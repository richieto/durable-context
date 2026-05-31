# Agent Guidance - context/

Scope: everything under `/context`.

## Purpose

This folder is the canonical home for in-progress working context: specs,
interface notes, architecture notes, actionable operations notes, ADRs,
backlogs, implementation plans, and release-documentation notes.
`project-profile.md` is the canonical home for repo-wide operating facts such
as stack, commands, test layers, CI/CD, infrastructure, observability, and
generated artifacts when a baseline has been populated.

Testing, delivery, and infrastructure notes belong here when they affect how
work is verified, shipped, deployed, or hosted. Operational notes belong here
only when they are actionable runtime, support, observability, rollback, or
repair context.

`context/` describes what is being planned, built, debated, or validated.
`reference/` describes what has shipped for a release.

## Editing Rules

- Use `context/terminology.md` as the canonical vocabulary for programs,
  planned initiatives, release initiatives, backlog items, and promotion.
- Use `context/project-profile.md` for stable repo-wide operating facts.
  Populate it only from source-backed discovery or an explicit human request
  for a repository baseline.
- Keep initiative knowledge centralized here. Area `AGENTS.md` files may point
  here, but they should not duplicate initiative content.
- Do not move in-progress plans into `reference/`.
- Use `release-doc-notes.md` inside an initiative to capture what may need to
  become reference later.
- Create initiatives from `context/_templates/initiative/`.
- Create durable multi-release programs from `context/_templates/program/`.
- Create scoped future program work from
  `context/_templates/planned-initiative/` under a program's
  `planned-initiatives/` folder.
- Create deferred isolated backlog items from
  `context/_templates/backlog-item.md`.
- Keep release initiative history in the release folder. Use `programs/` for
  multi-release context, `planned-initiatives/` for scoped future program work,
  and `backlog/items/` for isolated deferred work.
- Treat changes to `context/current.md` as release transitions. Use
  `context/_templates/release-transition.md` and promote matching planned
  initiatives for the new current release.
- When a backlog item is picked up later, mark it as promoted and link to the
  new release initiative instead of rewriting the item into an active plan.
- Keep templates practical. If a file does not apply to an initiative, mark it
  as not applicable or omit it after copying the template.
- Use `operations.md` only for actionable runtime, support, observability,
  rollback, or repair context.
