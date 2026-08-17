---
name: checkpoint-context
description: Validate and checkpoint the lifecycle state of a named durable-context initiative across sessions, users, and agents. Use ONLY when the human explicitly invokes checkpoint-context or durable-context routes a named lifecycle-managed initiative to a meaningful boundary.
---

# Checkpoint Context

Validate and record the current state of a named lifecycle-managed initiative.
Prefer `durable-context` unless the human intentionally enters this stage.

## Workflow

1. Require the initiative name. Do not infer it from the branch. Resolve an
   explicit cycle or the project profile's Current cycle. A flat pre-cycle
   folder is the fallback for `default/<slug>` and is never moved implicitly.
2. Read [the lifecycle protocol](references/lifecycle.md) completely.
3. If lifecycle markers are absent, report a legacy initiative and do not
   insert or migrate state.
4. Run ordinary state validation:

   ```bash
   node .agents/skills/checkpoint-context/scripts/validate-initiative.mjs \
     context/cycles/<cycle-id>/initiatives/<slug>
   ```

   Before moving into another phase, add `--advance "<phase>"`. This checks
   whether an unresolved challenge blocks that transition without rejecting an
   honest snapshot already inside a partly blocked phase.

5. Resolve hard errors before advancing dependent work. Present warnings as
   useful review points, not compulsory ceremony.
6. Update the lifecycle block, phase record, and append one concise checkpoint
   row after a decision, phase change, pause, review resolution, implementation
   milestone, or substantial session.
7. Record evidence links and one concrete next action. Use `Blocked` only for a
   dependency that prevents the next action; use `Paused` when work can resume
   without resolving a blocker.
8. Run the validator again. Use `--pr-ready` when declaring the PR snapshot
   ready.

Do not authenticate organizational roles. Human resolutions and waivers must
record the resolver supplied by the human.
