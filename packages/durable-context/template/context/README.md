# context/

Disposable working bench for PROJECT_NAME. Durable architectural conclusions
belong in [`../decisions/`](../decisions/); shipped-behavior reference may be
managed separately when reference-docs is installed.

## Start Here

- `cycles/<cycle-id>/initiatives/` — meaningful work grouped by a generic cycle
- `project-profile.md` — stable repo-wide facts plus cycle policy and current cycle
- `_templates/initiative/` — project-owned source templates; do not copy every
  file into a new initiative

A cycle is only a container. This package does not decide whether it represents
a sprint, release, milestone, quarter, or something else. Fresh installations
start with current cycle `default`. An initiative name without an explicit cycle
uses the current cycle. Project backlog, prioritization, capacity, and scheduling
belong in Jira, GitHub, or the project's equivalent.
The directory path is the cycle allocation; do not duplicate it as initiative
lifecycle metadata. Closed cycles may be deleted once their decisions and
reference outputs are self-contained.

Invoke `durable-context` with an initiative name. It is the only workflow name
most users need to remember.

```text
Planning -> Plan Review -> Detailed Design -> Implementation
         -> Verification -> PR Preparation
```

New initiatives begin with only `README.md` and `plan.md`. During Detailed
Design, agree whether each concern is Local, External, Hybrid, or Not applicable,
then create only applicable local files. The challenge pass is advisory,
but a material recorded challenge blocks the phases that depend on its human
conclusion.

Use `backfill-with-context` directly only when intentionally reconstructing
context from existing work, and `checkpoint-context` when intentionally
validating state. The planning, challenge, dive, and project-profile skills remain
advanced direct entry points.

Legacy initiatives without lifecycle markers stay on their existing workflow
and are not migrated automatically. Pre-cycle folders under `initiatives/` are
treated as members of `default` without being moved; use `default/<slug>` to
address one explicitly after another cycle becomes current.

Both `backlog.md` and `follow-up.md` remain bounded initiative traces.
`backlog.md` records the implementation state inside this initiative;
`follow-up.md` records work handed to an external destination. Neither replaces
the project's backlog or tracks transferred work after handover.
