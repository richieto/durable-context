# Plan

Use this file as the working alignment space for humans and agents. It may
contain rough thinking, questions, options, partial plans, and notes from
collaboration sessions.

`plan.md` is allowed to be messy, but it must not become the only place where
settled truth lives. Promote stable conclusions into the appropriate
initiative files:

- `spec.md` for settled behavior and acceptance criteria
- `interface.md` for settled UI, API, config, or human workflow details
- `architecture.md` for settled internal shape, boundaries, flows, and data
- `testing.md` for settled verification strategy, coverage, and release gates
- `delivery.md` for settled CI/CD, build, deployment, and promotion behavior
- `infrastructure.md` for settled environment shape, IaC, and dependencies
- `operations.md` only for actionable runtime, support, failure, rollback, and
  repair notes
- `backlog.md` for executable work items
- `decisions/ADR-*.md` for durable decisions
- `release-doc-notes.md` for future reference impact

## Current Alignment

Ship the template as a zero-dependency npm package with a `bin` entry named
`code-anchored-context`. The first command is `init`, which installs the
template files into a target repository rather than expecting agents to load
the package from `node_modules`.

## Working Notes

- The existing repository files are the package template. Avoid a duplicate
  `template/` directory so the package cannot drift from the repo's own
  guidance.
- Existing `AGENTS.md` files should be preserved. The initializer appends a
  bounded Code-Anchored Context section when needed.
- Existing generated directories should be skipped unless `--force` is
  supplied.

## Open Questions

- Confirm whether the public package name should remain
  `code-anchored-context` or move to a scoped name before publishing.

## Options Considered

| Option | Pros | Cons | Status |
| --- | --- | --- | --- |
| npm CLI initializer | Fast adoption, works in any existing repo, no runtime dependency needed | Requires publishing and versioning a package | Selected |
| GitHub template only | Easy to inspect and fork | Awkward for existing repos and repeated installs | Rejected for primary flow |
| Package consumed from `node_modules` | Conventional dependency shape | Agents need repo-root files, so discovery would be weaker | Rejected |

## Notes To Promote

Use this section as a short queue of stable points that should be moved into
the canonical initiative files.

- [x] Move settled behavior into `spec.md`
- [x] Move settled interface details into `interface.md`
- [x] Move settled technical shape into `architecture.md`
- [x] Move settled verification strategy into `testing.md`
- [x] Move settled delivery and pipeline behavior into `delivery.md`
- [x] Move executable work into `backlog.md`
- [ ] Move multi-release context into `context/programs/`
- [ ] Move isolated deferred work into `context/backlog/items/`
- [ ] Move durable decisions into `decisions/`
- [x] Move reference impact into `release-doc-notes.md`
