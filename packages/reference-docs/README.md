# reference-docs

Invocation-only skills and scaffold for release-anchored reference documentation.

Install into a project:

```bash
npx reference-docs init --project-name "My App"
```

Adds `reference/` and skills `reference-from-tags` and `reference-baseline`.

Works independently of any planning workflow — the tag diff is the source of truth.

## Use

```text
Create a baseline reference for this repo.
Refresh reference from <previous-tag> to <new-tag>.
```

Skills are invocation-only — they do not run automatically.

Update managed agent assets without replacing project work:

```bash
npx reference-docs@latest update
```

Commands/options: `update`, `status`, `--target`, `--dry-run`, and `--force`
for `init`.
