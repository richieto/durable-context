# Agent Guidance - PROJECT_NAME

Area-specific `AGENTS.md` files layer on top of this one.

<!-- durable-context:start -->
## Durable Context

Working context under [`context/`](context/); durable decisions under [`decisions/`](decisions/).
Initiatives under `context/cycles/<cycle-id>/initiatives/` are disposable; promote accepted decisions to [`decisions/`](decisions/). Read the current cycle and local cycle policy from [`context/project-profile.md`](context/project-profile.md). The package updater moves pre-cycle `context/initiatives/` folders into `default`.

For unclear intent, inspect repository evidence first and then interview the
human with focused, decision-bearing questions. Keep artifacts to the minimum
sufficient record: conclusions, decision-relevant rationale and constraints,
evidence, unresolved material questions, and the next action. Omit transcripts,
routine narration, generic advice, and duplicated facts.

Recommended invocation-only front door:

- [`dc`](.agents/skills/dc/SKILL.md) — continue a named initiative to its next meaningful boundary.

Advanced direct entry points:

- [`project-profile-baseline`](.agents/skills/project-profile-baseline/SKILL.md) — populate [`context/project-profile.md`](context/project-profile.md).
- [`project-profile-refresh`](.agents/skills/project-profile-refresh/SKILL.md) — refresh stable repo-wide profile facts.
- [`plan-with-context`](.agents/skills/plan-with-context/SKILL.md) — draft a plan in `plan.md`.
- [`challenge`](.agents/skills/challenge/SKILL.md) — critique a draft plan before distribution.
- [`dive-into-plan`](.agents/skills/dive-into-plan/SKILL.md) — interrogate gaps, distribute into per-concern docs, promote to [`decisions/`](decisions/).
- [`backfill-with-context`](.agents/skills/backfill-with-context/SKILL.md) — reconstruct context after existing work grows into an initiative.
- [`checkpoint-context`](.agents/skills/checkpoint-context/SKILL.md) — validate and record lifecycle state.

[`context/project-profile.md`](context/project-profile.md) — repo-wide facts plus project-owned cycle policy and current-cycle state.
<!-- durable-context:end -->
