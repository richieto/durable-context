# Project Profile

Project: PROJECT_NAME
Last reviewed: Not recorded

Repo-wide operating facts and project-owned cycle policy for agents.
Initiative-specific detail lives under `context/cycles/<cycle-id>/initiatives/`.
Record source-backed facts only; use `Unknown` when not yet reviewed.

## Cycle Policy And State

The package treats a cycle only as an initiative container. This project may
map it to a sprint, release, milestone, quarter, or another meaningful cadence.

<!-- durable-context:cycle:start -->
- Current cycle: default
- Naming: Project-defined
- Retention: Project-defined
- Local validation: None
- Repository rules: None
<!-- durable-context:cycle:end -->

Use one safe path segment for a cycle ID. An omitted cycle resolves to the
single current-cycle field. Fresh installations start in `default`; change the
pointer when the project adopts a more meaningful cycle. The project backlog,
prioritization, capacity, and scheduling remain in Jira, GitHub, or the
project's equivalent.

## Repository Shape

| Concern | Location | Notes |
| --- | --- | --- |
| Application or package code | Unknown | |
| Tests | Unknown | |
| CI/CD and delivery | Unknown | |
| Infrastructure and config | Unknown | |
| Generated artifacts | Unknown | |
| Reference material | `reference/` | If reference-docs is installed |
| Decision log | `decisions/` | Append-only |
| Working context | `context/` | Disposable cycle and initiative context |

## Stack And Runtime

| Layer | Technology | Source | Notes |
| --- | --- | --- | --- |
| Runtime or language | Unknown | | |
| Package manager | Unknown | | |
| Frameworks | Unknown | | |
| Data stores or services | Unknown | | |
| Hosting or runtime platform | Unknown | | |

## Commands

| Concern | Command | Source | Notes |
| --- | --- | --- | --- |
| Install dependencies | Unknown | | |
| Run locally | Unknown | | |
| Build | Unknown | | |
| Lint, format, or typecheck | Unknown | | |
| Unit or integration tests | Unknown | | |
| E2E or smoke tests | Unknown | | |
| Package or release | Unknown | | |

## Verification Profile

- Default test expectation: Unknown.
- Required release gates: Unknown.
- Manual checks: Unknown.
- Test data and environment dependencies: Unknown.

## Delivery Profile

- CI/CD workflow files: Unknown.
- Deployment entry points: Unknown.
- Environments and promotion flow: Unknown.
- Artifacts and publishing flow: Unknown.

## Infrastructure And Configuration

- IaC or config roots: Unknown.
- Managed services: Unknown.
- Secrets references (names only): Unknown.
- Environment dependencies: Unknown.

## Operations Profile

- Logs, metrics, alerts: Unknown.
- Rollback and repair tooling: Unknown.
