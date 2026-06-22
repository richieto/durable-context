# Agent Guidance - PROJECT_NAME

Area-specific `AGENTS.md` files layer on top of this one.

<!-- durable-context:start -->
## Durable Context

Working context under [`context/`](context/); durable decisions under [`decisions/`](decisions/).
Initiatives under [`context/initiatives/`](context/initiatives/) are disposable; promote accepted decisions to [`decisions/`](decisions/).

Invocation-only skills — ask by name:

- [`project-profile-baseline`](.agents/skills/project-profile-baseline/SKILL.md) — populate [`context/project-profile.md`](context/project-profile.md).
- [`project-profile-refresh`](.agents/skills/project-profile-refresh/SKILL.md) — refresh stable repo-wide profile facts.
- [`plan-with-context`](.agents/skills/plan-with-context/SKILL.md) — draft a plan in `plan.md`.
- [`devils-advocate`](.agents/skills/devils-advocate/SKILL.md) — critique a draft plan before distribution.
- [`dive-into-plan`](.agents/skills/dive-into-plan/SKILL.md) — interrogate gaps, distribute into per-concern docs, promote to [`decisions/`](decisions/).

[`context/project-profile.md`](context/project-profile.md) — repo-wide stack, commands, and test facts when populated.
<!-- durable-context:end -->
