# Testing

Use this file for the initiative's verification strategy. Name the concern,
not the tool. Specific test runners, unit test frameworks, contract tests, or
manual scripts can all appear here when they are relevant.

## Test Strategy

Prove that the initializer can install into temporary projects without network
access and that package contents are ready for npm publishing.

## Automated Coverage

List unit, integration, contract, e2e, smoke, regression, or performance tests
that should be added or updated.

| Area | Coverage | Tool or location | Status |
| --- | --- | --- | --- |
| CLI smoke | Empty target install, custom release, `--no-docs`, repeated dry run | `tests/cli-smoke.test.js` | Passing |

## Manual Verification

List any human verification that remains necessary.

- `npm pack --dry-run` was run locally with a temp npm cache and the tarball
  contents were inspected.

## Test Data And Environments

Capture required accounts, seeded data, fixtures, environment assumptions, or
data cleanup needs.

- Tests create temporary directories under the operating system temp folder.
- Node.js 18 or newer is required.

## Release Gates

List the checks that must pass before release.

- `npm test` passes.
- `npm pack --dry-run` includes `AGENTS.md`, `.agents/`, `context/`,
  optional `docs/`, and `bin/`.

## Known Gaps

List accepted test gaps, why they are acceptable, and what would close them.

- No registry publish test is automated. Publishing depends on npm account and
  package name ownership.
