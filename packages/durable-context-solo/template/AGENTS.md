# Agent Guidance - PROJECT_NAME

Area-specific `AGENTS.md` files layer on top of this one.

<!-- durable-context-solo:start -->
## Durable Context Solo

Use [`context/`](context/) for disposable planning and [`decisions/`](decisions/)
for self-contained accepted architectural decisions. Read
[`context/project-profile.md`](context/project-profile.md) instead of
rediscovering stable repository capabilities for each initiative.
Initiatives live under `context/cycles/<cycle-id>/initiatives/`. Read the
current cycle and local cycle policy from the project profile. Pre-cycle
`context/initiatives/` folders are implicit members of `default` and are not
moved automatically.

Recommended invocation-only front door:

- [`durable-context-solo`](.agents/skills/durable-context-solo/SKILL.md) — continue a named meaningful initiative to its next boundary.

Advanced direct entry points:

- [`project-profile-baseline`](.agents/skills/project-profile-baseline/SKILL.md) — establish the repository concern inventory.
- [`project-profile-refresh`](.agents/skills/project-profile-refresh/SKILL.md) — refresh stable capabilities that changed.
- [`plan-with-context`](.agents/skills/plan-with-context/SKILL.md) — evaluate every profiled concern and draft `plan.md`.
- [`challenge`](.agents/skills/challenge/SKILL.md) — optionally challenge a recommendation.
- [`dive-into-plan`](.agents/skills/dive-into-plan/SKILL.md) — work through Material concerns one at a time.
- [`backfill-with-context`](.agents/skills/backfill-with-context/SKILL.md) — reconstruct context from existing work.

Small fixes use normal agent planning. Meaningful initiatives distribute
Material concerns before implementation.
<!-- durable-context-solo:end -->
