# Interface

## Human-facing install commands

```bash
npx durable-context init --project-name "My App"
npx reference-docs init --project-name "My App"
```

Shared flags (unchanged): `--target <path>`, `--dry-run`, `--force`,
`--project-name`, `--help`, `--version`.

Status:

```bash
npx durable-context status
npx reference-docs status
```

## npm publish (human)

Unscoped packages publish public by default; `--access public` is not required.

```bash
npm publish --workspace durable-context
npm publish --workspace reference-docs
```

Both packages ship **1.0.0** on first publish under the new names.

Do **not** run `npm deprecate` for `@code-anchored-context/*` unless those names
were actually published to npm (they were not, per human confirmation).

## Agent invocation

Durable context:

```text
Plan with durable context: <what you want to build>
Dive into the plan.
```

(`dive-into-plan` replaces `grill-and-distribute`.)

Reference docs:

```text
Create a baseline reference for this repo.
Refresh reference from <previous-tag> to <new-tag>.
```

## Installed artifacts in adopter repos

| Package | CLI | AGENTS markers | Metadata | Skills | Scaffold |
| --- | --- | --- | --- | --- | --- |
| durable-context | `durable-context` | `<!-- durable-context:start/end -->` | `.durable-context/install.json` | `plan-with-context`, `dive-into-plan` | `context/`, `decisions/` |
| reference-docs | `reference-docs` | `<!-- reference-docs:start/end -->` | `.reference-docs/install.json` | `reference-from-tags`, `reference-baseline` | `reference/` |

Coexistence: both packages may install into the same repo without collision
(distinct markers, metadata dotdirs, and skill directories).

## Root monorepo identity

Rename root `package.json` `name` from `code-anchored-context-monorepo` to
`durable-context-monorepo` (private workspace root only; not published).
