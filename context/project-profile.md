# Project Profile

Project: PROJECT_NAME
Baseline status: Not populated yet.
Last reviewed: Not recorded.

This file captures repo-wide operating facts that agents should know before
changing behavior. It is for stable project facts such as stack, source roots,
commands, verification layers, delivery flow, infrastructure, observability,
and generated artifacts.

Do not put initiative-specific planning here. Use release initiatives under
`context/releases/` for work-specific behavior, testing, delivery,
infrastructure, and operations context.

## When To Populate Or Refresh

Populate or refresh this file when a human explicitly asks for a project
profile, tech-stack baseline, or repository operating baseline, or when a
concrete repo-wide fact is discovered during work and would help future
agents.

Record facts that can be traced to source files. Do not guess. If something is
not known yet, mark it as `Unknown` and include the source paths that still
need review.

## Source Scan Checklist

Use this checklist during a baseline pass:

- package manifests, lockfiles, language/runtime version files, and build
  config
- source roots, application boundaries, libraries, services, APIs, jobs, and
  generated artifacts
- test configuration, e2e tooling, fixtures, seeded data, and test
  environments
- CI/CD workflows, deployment scripts, release toggles, artifact publishing,
  and environment promotion
- infrastructure as code, service configuration, secrets references, and
  environment dependencies
- observability, logs, metrics, traces, alerts, dashboards, support tools,
  rollback, and repair procedures

## Repository Shape

| Concern | Location | Notes |
| --- | --- | --- |
| Application or package code | Unknown | TBD |
| Tests | Unknown | TBD |
| CI/CD and delivery | Unknown | TBD |
| Infrastructure and config | Unknown | TBD |
| Generated artifacts | Unknown | TBD |
| Reference material | `reference/` | Release-anchored or baseline behavior. |
| Working context | `context/` | Plans, initiatives, programs, ADRs, backlog, and release notes. |

## Stack And Runtime

| Layer | Technology | Source | Notes |
| --- | --- | --- | --- |
| Runtime or language | Unknown | TBD | TBD |
| Package manager | Unknown | TBD | TBD |
| Frameworks | Unknown | TBD | TBD |
| Data stores or services | Unknown | TBD | TBD |
| Hosting or runtime platform | Unknown | TBD | TBD |

## Commands

| Concern | Command | Source | Notes |
| --- | --- | --- | --- |
| Install dependencies | Unknown | TBD | TBD |
| Run locally | Unknown | TBD | TBD |
| Build | Unknown | TBD | TBD |
| Lint, format, or typecheck | Unknown | TBD | TBD |
| Unit or integration tests | Unknown | TBD | TBD |
| E2E or smoke tests | Unknown | TBD | TBD |
| Package or release | Unknown | TBD | TBD |

## Verification Profile

- Default test expectation: Unknown.
- Required release gates: Unknown.
- Manual checks: Unknown.
- Test data and environment dependencies: Unknown.
- Known verification gaps: Unknown.

Use initiative `testing.md` files for work-specific additions, exceptions, and
release gates.

## Delivery Profile

- CI/CD workflow files: Unknown.
- Deployment entry points: Unknown.
- Environments and promotion flow: Unknown.
- Release approvals or gates: Unknown.
- Artifacts and publishing flow: Unknown.
- Delivery automation CLIs or scripts: Unknown.

Use initiative `delivery.md` files for work-specific pipeline, build,
deployment, or release changes.

## Infrastructure And Configuration

- IaC, manifests, or config roots: Unknown.
- Managed services and resources: Unknown.
- Secrets and configuration references: Unknown.
- Environment dependencies: Unknown.
- Compatibility or migration constraints: Unknown.

Use initiative `infrastructure.md` files for work-specific environment or IaC
changes.

## Operations Profile

- Logs: Unknown.
- Metrics, traces, or dashboards: Unknown.
- Alerts and health checks: Unknown.
- Support tooling: Unknown.
- Rollback, recovery, and repair tooling: Unknown.

Use initiative `operations.md` files only for actionable runtime, support,
observability, rollback, or repair concerns tied to a specific change.

## Agent Notes

- Keep this file factual and source-backed.
- Prefer commands already defined by the repo over ad hoc alternatives.
- Mention specific tools only when they affect how agents should verify,
  ship, deploy, observe, or support the project.
- If a generated file or managed artifact should not be edited directly,
  record that here with the owning source location.
