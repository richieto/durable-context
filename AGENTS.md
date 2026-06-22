# Agent Guidance

npm workspaces monorepo publishing **durable-context** and **reference-docs**.

## Repository Layout

- `packages/durable-context/` — planning skills plus `context/` and `decisions/` scaffold
- `packages/reference-docs/` — reference skills plus `reference/` scaffold
- `writing/` — maintainer-only narrative; never installed by either package
- `context/` and `decisions/` — this repo's working bench and decision log (dogfood)

Change installed behavior in each package's `template/`, not root `context/` or `decisions/` directly — sync dogfood from the template after template changes.

## Working On This Repo

In-progress work: [`context/`](context/). Durable decisions: [`decisions/`](decisions/).

Planning skills (invocation-only):

- [`packages/durable-context/template/.agents/skills/project-profile-baseline/SKILL.md`](packages/durable-context/template/.agents/skills/project-profile-baseline/SKILL.md)
- [`packages/durable-context/template/.agents/skills/project-profile-refresh/SKILL.md`](packages/durable-context/template/.agents/skills/project-profile-refresh/SKILL.md)
- [`packages/durable-context/template/.agents/skills/plan-with-context/SKILL.md`](packages/durable-context/template/.agents/skills/plan-with-context/SKILL.md)
- [`packages/durable-context/template/.agents/skills/devils-advocate/SKILL.md`](packages/durable-context/template/.agents/skills/devils-advocate/SKILL.md)
- [`packages/durable-context/template/.agents/skills/dive-into-plan/SKILL.md`](packages/durable-context/template/.agents/skills/dive-into-plan/SKILL.md)

Reference scaffold: `packages/reference-docs/template/reference/`. No top-level `reference/` here.

## Conventions

- Node >= 18, ESM, no build step
- `npm test --workspaces`
- Keep `AGENTS.md` lean; workflow detail belongs in skills
