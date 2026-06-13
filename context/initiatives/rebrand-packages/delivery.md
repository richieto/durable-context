# Delivery

## Packaging

- npm workspaces monorepo; root `package.json` is `private`.
- Published packages: unscoped `durable-context` and `reference-docs` at
  **1.0.0**.
- Each package `files` array: `bin/`, `lib/`, `template/`, `README.md`,
  `LICENSE`.
- No build step; ESM Node >= 18.

## Build and test

```bash
npm test --workspaces
```

## Publishing (human)

```bash
npm publish --workspace durable-context
npm publish --workspace reference-docs
```

Unscoped packages are public by default. Scoped `--access public` does not
apply.

Do not deprecate `@code-anchored-context/*` on npm — those names were never
published.

## CI/CD

**Not applicable today.** No `.github/workflows/`. When CI is added later, use
workspace names `durable-context` and `reference-docs`.

## Rollback

Repository rollback: revert the rebrand commit(s). npm rollback: unpublish only
within npm policy window if 1.0.0 was just published; otherwise publish a patch
fixing regressions.

Adopter rollback: not applicable (clean break; no prior public adopters).
