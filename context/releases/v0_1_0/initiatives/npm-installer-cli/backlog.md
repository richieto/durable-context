# Backlog

## Status Legend

- `Todo`
- `In Progress`
- `Blocked`
- `Done`
- `Deferred`

## Work Items

| Status | Item | Area | Notes |
| --- | --- | --- | --- |
| Done | Add npm package metadata | Packaging | `package.json` defines binary, files, scripts, and engines. |
| Done | Add initializer CLI | CLI | `bin/code-anchored-context.js` installs agent context into a target repo. |
| Done | Add smoke tests | Testing | Node test coverage for empty target and repeated dry-run. |
| Done | Document adoption and publish flow | README | Root README now shows `npx` usage and publish commands. |
| Done | Confirm npm package name | Delivery | `code-anchored-context` is published on npm at `0.1.0`. |
| Done | Verify package contents | Delivery | `npm pack --dry-run --cache /private/tmp/code-anchored-context-npm-cache` succeeds and excludes the internal initiative from package contents. |
| Done | Refine docs authoring voice | Docs | Docs now default to product-readable, technically anchored prose with progressive depth. |
| Done | Preserve existing agent guidance files | CLI | Existing `AGENTS.md` files are appended, and common case variants such as `Agents.md` are reused instead of creating duplicates. |
| Done | Guard case-variant generated paths | CLI | Existing `docs` variants are skipped, and `.agents/skills/README.md` variants are reused for skill index updates. |
| Done | Rename template folders | Template | The template now installs `context/`, `docs/`, and `.agents/skills/code-anchored-context/`. |

## Deferred

Use this section only for work deferred within the active initiative.

If a deferred item should outlive this initiative as future isolated work,
create a backlog item from `context/_templates/backlog-item.md` under:

```text
context/backlog/items/<originating-initiative-slug>--<item-slug>.md
```

- None yet.
