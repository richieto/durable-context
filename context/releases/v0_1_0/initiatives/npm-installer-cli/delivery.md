# Delivery

Capture how the npm initializer is packaged, checked, and published.

## Pipeline Impact

No dedicated pipeline exists yet. A future pipeline should run `npm test` and
`npm pack --dry-run` on pull requests.

## Build And Release Gates

| Gate | Applies to | Notes |
| --- | --- | --- |
| `npm test` | Merge and publish | Runs CLI smoke tests. |
| `npm pack --dry-run` | Publish | Verifies package contents before registry upload. |

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

## Rollout Notes

The first publish should use version `0.1.0`. If the unscoped name is not
available, publish under a personal or organization scope.
