# Project Profile

Project: PROJECT_NAME
Last reviewed: Not recorded

Source-backed stable repository facts and project-owned cycle policy for agents.
Initiative detail belongs under `context/cycles/<cycle-id>/initiatives/`. Use
`Unknown` rather than guessing.

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
pointer with `durable-context-solo cycle init <cycle-id>` when the project
adopts a more meaningful cycle. The project backlog,
prioritization, capacity, and scheduling remain in Jira, GitHub, or the
project's equivalent.

## Concern Inventory

Presence values: `Present`, `External`, `Absent`, or `Unknown`.

Every Present or External concern must be evaluated for each meaningful
initiative. An Absent concern must still be checked for whether the initiative
introduces it.

| Concern | Presence | Evidence | Initiative rule | Default focus artifact |
| --- | --- | --- | --- | --- |
| Product behavior | Unknown | | Always evaluate | `spec.md` |
| Interface | Unknown | | Always evaluate | `interface.md` |
| Architecture and data | Unknown | | Always evaluate | `architecture.md` |
| Testing | Unknown | | Always evaluate | `testing.md` |
| Delivery | Unknown | | Always evaluate | `delivery.md` |
| Infrastructure and configuration | Unknown | | Always evaluate | `infrastructure.md` |
| Operations | Unknown | | Always evaluate | `operations.md` or external destination |
| Backlog tracking | Unknown | | Evaluate when work spans several slices | `backlog.md` |
| Release documentation | Unknown | | Evaluate shipped-behavior impact | `release-doc-notes.md` or external destination |

## Repository Shape

| Concern | Location | Notes |
| --- | --- | --- |
| Application or package code | Unknown | |
| Tests | Unknown | |
| CI/CD and delivery | Unknown | |
| Infrastructure and configuration | Unknown | |
| Operations or observability | Unknown | |
| Generated artifacts | Unknown | |
| Reference material | Unknown | |
| Decision log | `decisions/` | Append-only, self-contained accepted decisions |
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

- IaC or configuration roots: Unknown.
- Managed services: Unknown.
- Secret references (names only): Unknown.
- Environment dependencies: Unknown.

## Operations Profile

- Logs, metrics, traces, dashboards, and alerts: Unknown.
- Rollback and repair tooling: Unknown.
- External operations destination: Unknown.

## Profile Refresh Triggers

- A recorded evidence path disappears or materially changes.
- An initiative introduces or removes a repository capability.
- Commands, delivery, infrastructure, operations, or documentation boundaries
  change.
- The human explicitly requests a refresh.
