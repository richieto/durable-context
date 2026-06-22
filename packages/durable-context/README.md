# durable-context

Invocation-only skills and scaffold for durable planning in the repo.

Install into a project:

```bash
npx durable-context init --project-name "My App"
```

Adds `context/`, `decisions/`, and invocation-only skills:

- `project-profile-baseline`
- `project-profile-refresh`
- `plan-with-context`
- `devils-advocate`
- `dive-into-plan`

## Use

```text
Plan with durable context: <what you want to build>
Devil's advocate.
Dive into the plan.
```

Skills are invocation-only — they do not run automatically.
Use `project-profile-baseline` once to populate repo-wide commands and
operating facts; use `project-profile-refresh` when those stable facts change.

Options: `--target`, `--dry-run`, `--force`, `status`.

For release-anchored documentation, see the `reference-docs` package.
