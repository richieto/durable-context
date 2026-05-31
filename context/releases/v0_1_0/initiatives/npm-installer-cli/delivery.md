# Delivery

Capture how the npm initializer is packaged, checked, and published.

## Pipeline Impact

No dedicated pipeline exists yet. A future pipeline should run `npm test` and
`npm pack --dry-run` on pull requests.

## Build And Release Gates

| Gate | Applies to | Notes |
| --- | --- | --- |
| `npm test` | Merge and publish | Runs CLI smoke tests. |
| `npm pack --dry-run` | Publish | Verifies package contents before registry upload, including that companion `writing/` files are excluded. |

## Deployment Flow

No build step is required. Release check:

```bash
npm test
npm pack --dry-run
```

Publish:

```bash
npm publish --access public
```

If using a scoped package name, update `package.json` first and use the same
publish command.

## Feature Flags And Toggles

No runtime feature flags or release toggles are required.

## Delivery Automation

`package.json` exposes:

- `npm test`
- `npx code-anchored-context init` after publish

Companion writing and presentation drafts live under `writing/` in this
repository only. They are intentionally outside the npm `files` list.

Version `0.2.3` is the package shape that uses `reference/` for
release-anchored accepted behavior.
Version `0.2.4` adds `context/project-profile.md` as the repo-wide operating
profile starter.

## Rollout Notes

Publish the next registry version after `npm test` and `npm pack --dry-run`
pass. If the unscoped name is not available in another environment, publish
under a personal or organization scope.
