# Interface

## Purpose

Define the npm package and command-line interface used to install the context
template into a repository.

## Surfaces

- CLI: `code-anchored-context init`
- Package binary: `npx code-anchored-context init`
- Configuration: command-line flags only

## Workflows

Install into the current working directory:

```bash
npx code-anchored-context init --project-name "My App"
```

Preview changes:

```bash
npx code-anchored-context init --dry-run
```

Install into another directory:

```bash
npx code-anchored-context init --target ../my-existing-project
```

## Inputs And Outputs

| Surface | Inputs | Outputs |
| --- | --- | --- |
| `init` | `--target`, `--project-name`, `--release`, `--no-docs`, `--force`, `--dry-run` | Installed context files and a console summary |
| `--help` | None | Usage text |
| `--version` | None | Package version |

## States And Feedback

- Success: the command prints each action and a final ready message.
- Dry run: each action is prefixed with `[dry-run]`.
- Existing files: generated directories are skipped unless `--force` is used.
- Invalid release: the command exits with an error before writing.

## Permissions

The command writes only to the target project directory selected by the human.
Publishing the package requires npm registry permissions for the chosen package
name or scope.

## Terminology

- "initializer" means the npm CLI command that copies the template into a
  target repository.
- "target" means the repository root receiving the generated context files.
