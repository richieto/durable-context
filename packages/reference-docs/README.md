# reference-docs

Invocation-only skills and a scaffold for release-anchored reference
documentation.

## Install

```bash
npx reference-docs init --project-name "My App"
```

The default root is `reference/`. Choose a case-preserving or nested relative
root during initialization when the project requires it:

```bash
npx reference-docs init --project-name "My App" --reference-root Reference
npx reference-docs init --project-name "My App" --reference-root docs/reference
```

The configured root is stored in `.reference-docs/install.json` and is
immutable after initialization. Absolute paths and `.` or `..` segments are
rejected.

The package works independently of any planning workflow. A tag diff is the
source of truth; `context/` and `decisions/` are optional enrichment when they
exist. Reference pages must remain understandable after disposable planning
context and closed cycles are deleted.

## Use

```text
Create a baseline reference for this repo.
Refresh reference from <previous-tag> to <new-tag>.
```

Skills are invocation-only and never run automatically.

## Project Extensions

Put durable local authoring rules in
`<reference-root>/_authoring/project.md`. Package updates never overwrite this
file, terminology, area guides, templates, release history, reference pages, or
unknown files.

The package manages the two reference skills plus the generic authoring README
and workflow. Marker-delimited sections in `AGENTS.md` and the skills README are
also refreshed safely.

## Safe Updates

```bash
npx reference-docs@latest update
```

Updates preflight every managed file. If a managed file was edited, deleted, or
replaced with unmanaged content, the command writes nothing and lists all
conflicts. Move project rules to the project overlay, then retry. `--force`
replaces only conflicted package-managed files; it never removes whole
directories or unknown project files.

Existing 1.x installations migrate automatically when their managed files are
unchanged. Existing case variants such as `Reference/` are inferred during the
metadata upgrade. For a repository with no installation metadata, run `init`
with its existing root; initialization merges missing files without replacing
project content.

Commands/options: `init`, `update`, `status`, `--target`, `--project-name`,
`--reference-root`, `--dry-run`, and `--force`.
