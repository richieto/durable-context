# context/

Disposable working bench for PROJECT_NAME. Durable architectural conclusions
belong in [`../decisions/`](../decisions/); shipped-behavior reference may be
managed separately when reference-docs is installed.

## Start Here

- `initiatives/` — one explicitly named folder per meaningful piece of work
- `project-profile.md` — stable repo-wide commands and operating facts
- `_templates/initiative/` — project-owned source templates; do not copy every
  file into a new initiative

Invoke `durable-context` with an initiative name. It is the only workflow name
most users need to remember.

```text
Planning -> Plan Review -> Detailed Design -> Implementation
         -> Verification -> PR Preparation
```

New initiatives begin with only `README.md` and `plan.md`. During Detailed
Design, agree whether each concern is Local, External, Hybrid, or Not applicable,
then create only applicable local files. The devil's-advocate pass is advisory,
but a material recorded challenge blocks the phases that depend on its human
conclusion.

Use `backfill-with-context` directly only when intentionally reconstructing
context from existing work, and `checkpoint-context` when intentionally
validating state. The planning, devil, dive, and project-profile skills remain
advanced direct entry points.

Legacy initiatives without lifecycle markers stay on their existing workflow
and are not migrated automatically.
