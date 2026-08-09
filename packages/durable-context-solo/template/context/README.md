# context/

Disposable planning bench for one accountable human working across agents and
sessions in PROJECT_NAME. Durable accepted architectural decisions live in
[`../decisions/`](../decisions/).

## Start Here

- `project-profile.md` — source-backed capabilities and concern inventory
- `initiatives/<slug>/` — explicitly named meaningful work
- `_templates/initiative/` — project-owned focus-document library

Invoke `durable-context-solo` with an initiative name. Small fixes should keep
using the agent's ordinary planning behavior.

For meaningful work:

1. Establish the project profile once and refresh it only when stable
   capabilities change.
2. Start an initiative with `README.md` and `plan.md`.
3. Evaluate every Present or External profiled concern and whether the work
   introduces an Absent concern.
4. Discuss the decomposition with the human.
5. Create and interrogate focused documents for Material concerns one at a
   time.
6. Synthesize cross-concern constraints before implementation.
7. Update the compact resume block at substantial session boundaries.
8. Record accepted decisions in root `decisions/` only when their rationale
   must outlive the initiative.

The resume block is continuity, not governance. Solo has no lifecycle phases,
review gates, ownership routing, transfer states, or PR-readiness validator.
Its status is only `Active`, `Paused`, `Complete`, or `Abandoned`; the checkpoint
and next action carry the useful detail.
