# Agent Guidance - PROJECT_NAME

Area-specific `AGENTS.md` files layer on top of this one.

<!-- durable-context:start -->
## Durable Context

Working context under [`context/`](context/); durable decisions under [`decisions/`](decisions/).
Initiatives under [`context/initiatives/`](context/initiatives/) are disposable; promote accepted decisions to [`decisions/`](decisions/).

Invocation-only skills — ask by name:

- [`plan-with-context`](.agents/skills/plan-with-context/SKILL.md) — draft a plan in `plan.md`.
- [`dive-into-plan`](.agents/skills/dive-into-plan/SKILL.md) — interrogate gaps, distribute into per-concern docs, promote to [`decisions/`](decisions/).

[`context/project-profile.md`](context/project-profile.md) — repo-wide stack, commands, and test facts when populated.
<!-- durable-context:end -->
