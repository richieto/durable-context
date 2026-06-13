# 0004: Rebrand to durable-context and reference-docs

Status: Accepted
Date: 2026-06-13

## Context

The repository ships two independent practices that were split under decision
0001 but still used the legacy **Code-Anchored Context** umbrella on npm
(`@code-anchored-context/planning` and `@code-anchored-context/reference`),
CLIs, installer metadata, and writing cross-links.

The narrative brands (**Durable Context**, **Reference Docs**) already exist in
`writing/` but did not match install commands or package names. The umbrella
name implied one product; adopters should remember two plain commands.

No public adopters exist on the old scoped names; a clean break is acceptable.

## Decision

1. Publish two **unscoped** npm packages: `durable-context` and
   `reference-docs`, both at **1.0.0**.
2. Rename workspace directories to `packages/durable-context/` and
   `packages/reference-docs/`.
3. Rename CLIs to `durable-context` and `reference-docs` (match package names).
4. Replace installer metadata paths with `.durable-context/install.json` and
   `.reference-docs/install.json`.
5. Replace AGENTS.md markers with `durable-context:*` and `reference-docs:*`.
6. Retire **Code-Anchored Context** from shipped artifacts and `writing/`;
   rename `writing/code-anchored-docs/` to `writing/reference-docs/`.
7. Keep the monorepo; keep installed scaffold paths (`context/`, `decisions/`,
   `reference/`) unchanged in adopter repos.
8. No migration tooling or upgrade guide for old scoped names.

This supersedes the **package naming** in 0001 only. The two-package split and
independence remain in force.

## Consequences

Positive:

- Install commands are plain and memorable: `npx durable-context init`,
  `npx reference-docs init`.
- Product identity matches narrative in `writing/`.
- Clean 1.0.0 under final names.

Negative or tradeoffs:

- Breaking rename for anyone who installed pre-rebrand builds locally (none
  reported).
- Large find-and-replace surface across templates, tests, docs, and writing.
- Historical ADRs and the split-planning-reference initiative retain old names
  as history.

## Alternatives Considered

| Alternative | Why not |
| --- | --- |
| Keep `@code-anchored-context/*` scope | Retains legacy umbrella brand |
| Two GitHub repos | Loses shared writing and decision history without decoupling benefit |
| Backward-compatible migrate command | No adopters; unnecessary scope |
| Rename installed `context/` path | High churn; path is the product contract |

## Origin

- Initiative: `context/initiatives/rebrand-packages/`
- Release tag, PR, or commit: TBD at implementation closeout

## Links

- `context/initiatives/rebrand-packages/architecture.md`
- `context/initiatives/rebrand-packages/interface.md`
- `decisions/0001-split-into-planning-and-reference-packages.md` (structural split; naming updated here)
