# durable-context

Invocation-only skills and scaffold for durable planning in the repo.

Install into a project:

```bash
npx durable-context init --project-name "My App"
```

Adds `context/`, `decisions/`, and skills `plan-with-context` and `dive-into-plan`.

## Use

```text
Plan with durable context: <what you want to build>
Dive into the plan.
```

Skills are invocation-only — they do not run automatically.

Options: `--target`, `--dry-run`, `--force`, `status`.

For release-anchored documentation, see the `reference-docs` package.
