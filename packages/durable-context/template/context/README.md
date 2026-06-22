# context/

Working bench for PROJECT_NAME — disposable planning context for work in progress.

Persists elsewhere: [`../decisions/`](../decisions/) (durable log); `reference/` if reference-docs is installed.

## Start Here

- `initiatives/` — one folder per piece of work
- `project-profile.md` — repo-wide stack, commands, tests, delivery (when populated)
- `_templates/initiative/` — copy to start a new initiative

## Flow

```text
project-profile-baseline/refresh -> project-profile.md
plan-with-context                -> initiatives/<slug>/plan.md
devils-advocate                  -> critique before distribution
dive-into-plan                   -> per-concern docs + ../decisions/
```

1. Copy `_templates/initiative/` to `initiatives/<slug>/`.
2. Invoke `project-profile-baseline` when repo-wide commands and operating facts are not yet populated.
3. Invoke `plan-with-context` to draft `plan.md`.
4. Optionally invoke `devils-advocate` to challenge a meaningful recommendation.
5. When settled, invoke `dive-into-plan` to distribute and promote decisions.

Settled truth must not live only in `plan.md`. Do not edit `reference/` from here — use `release-doc-notes.md` for future reference impact.
