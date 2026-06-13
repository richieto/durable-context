# Testing

## Strategy

No e2e layer. Verification is per-package smoke tests (`node --test`) that
install into temp directories and assert layout, markers, and metadata.

## Required updates

Each package `tests/smoke.test.js`:

- CLI path: `bin/durable-context.js` / `bin/reference-docs.js`
- AGENTS.md marker regexes: `durable-context:*`, `reference-docs:*`
- Metadata paths: `.durable-context/install.json`,
  `.reference-docs/install.json`
- Temp dir prefixes: `durable-context-*`, `reference-docs-*` (cosmetic)
- Cross-package negative assertions unchanged (planning package does not install
  `reference/`, etc.)

## Release gate

From repository root:

```bash
npm test --workspaces
```

Must pass before human publishes 1.0.0.

## Manual checklist (skills and templates)

After compression pass, verify:

- [ ] Skills are precise; no duplicated template or `_authoring/` prose inline
- [ ] Templates carry doc shapes so skills stay short
- [ ] No legacy names; skill folder is `dive-into-plan` not `grill-and-distribute`

## Out of scope

- Automated line-count CI gate
- Install tests against real npm registry (human verifies publish separately)

## Known gaps

None for this initiative.
