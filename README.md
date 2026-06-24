# durable-context · reference-docs

Two independent npm packages for keeping agent context close to the code:

- **durable-context** — plan in `context/`, promote decisions to `decisions/`
- **reference-docs** — keep `reference/` accurate from release tag diffs

Adopt either or both. No hard dependency between them.

## Quick Start

```bash
npx durable-context init --project-name "My App"
npx reference-docs init --project-name "My App"
```

Planning:

```text
Plan with durable context: <what you want to build>
Dive into the plan.
```

Reference (after a release tag):

```text
Refresh reference from <previous-tag> to <new-tag>.
```

Both installers are idempotent and expose `status`, `--target`, and `--dry-run`.

## Mental Model

| Folder | Meaning | Lifetime | Package |
| --- | --- | --- | --- |
| `context/` | What you are planning and building | Disposable bench | durable-context |
| `decisions/` | Why the system is the way it is | Durable log | durable-context |
| `reference/` | What the system does as of a release | Per-release refresh | reference-docs |

## Skills

**durable-context:** `plan-with-context`, `dive-into-plan`

**reference-docs:** `reference-from-tags`, `reference-baseline`

All invocation-only — ask by name; they do not auto-run.

## Repository Layout

```text
packages/durable-context/   npm: durable-context
packages/reference-docs/    npm: reference-docs
writing/                    maintainer narrative (not installed)
```

```bash
npm test --workspaces
```

Maintainer writing (not part of the installable product): [`writing/`](writing/).
