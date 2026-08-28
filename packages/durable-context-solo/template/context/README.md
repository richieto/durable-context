# context/

Disposable planning bench for one accountable human working across agents and
sessions in PROJECT_NAME. Durable accepted architectural decisions live in
[`../decisions/`](../decisions/).

## Start Here

- `project-profile.md` — source-backed capabilities plus cycle policy and state
- `cycles/<cycle-id>/initiatives/<slug>/` — explicitly named meaningful work
- `_templates/initiative/` — project-owned focus-document library

A cycle is only a container. This package does not decide whether it represents
a sprint, release, milestone, quarter, or something else. Fresh installations
start with current cycle `default`. An initiative name without an explicit cycle
uses the current cycle. Project backlog, prioritization, capacity, and scheduling
belong in Jira, GitHub, or the project's equivalent.
The directory path is the cycle allocation; do not duplicate it in the resume
marker. Closed cycles may be deleted once their decisions and reference outputs
are self-contained.

Invoke `dc` with an initiative name. Small fixes should keep
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

The package updater moves pre-cycle folders under `initiatives/` into the
canonical `default` cycle without adding resume metadata. `backlog.md` remains
a bounded trace of implementation state inside an initiative; it does not
replace the project's external backlog.

## Writing Standard

Use the minimum sufficient record. Preserve settled conclusions,
decision-relevant rationale and constraints, evidence, unresolved material
questions, and the next action. Ask focused questions when intent is unclear,
but store conclusions rather than the interview transcript. Prefer links over
duplicated facts and expand detail only in proportion to uncertainty, impact,
risk, or cost of reversal.
