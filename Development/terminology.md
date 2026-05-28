# Development Terminology

This glossary defines the terms used by the Code-Anchored Context practice in
`Development/`. Use these terms consistently in programs, initiatives,
backlog items, ADRs, agent summaries, and release-transition work.

## Core Folders

| Term | Meaning |
| --- | --- |
| `Development/` | Working development context: plans, specs, ADRs, implementation notes, delivery-surface context, future scope, and release-documentation notes. |
| `Documentation/` | Released product documentation. It describes shipped behavior for a release/tag and is not edited during normal development work. |
| `Development/current.md` | Pointer to the current active release context. Updating this is a release transition. |
| `Development/releases/<version>/` | Release-scoped development context for one version. |
| `Development/programs/` | Durable multi-release development context. |
| `Development/backlog/items/` | Deferred isolated work cut from initiatives but worth preserving. |

## Work Containers

| Term | Meaning | Lives in |
| --- | --- | --- |
| Program | A cross-release parent effort with durable context, roadmap, phase history, and program-level decisions. | `Development/programs/<program-slug>/` |
| Planned initiative | A scoped future delivery slice that belongs to a program but is not in the current release yet. | `Development/programs/<program-slug>/planned-initiatives/<initiative-slug>/` |
| Release initiative | An active or historical delivery slice for a specific release. | `Development/releases/<version>/initiatives/<initiative-slug>/` |
| Development backlog item | Isolated deferred work that was cut from an initiative and may be picked up later. | `Development/backlog/items/<originating-initiative>--<item>.md` |
| Program release slice | A program-level summary of what a release is expected to do or did for the program. | `Development/programs/<program-slug>/releases/<version>.md` |

## Choosing The Right Container

Use a release initiative when work is active in the current release or is
historical delivery context for a specific release.

Use a program when the work spans releases, has phases, has durable decisions,
or needs a roadmap beyond one release.

Use a planned initiative when future program work is clear enough to plan,
specify, or split, but the target release is not current yet.

Use a development backlog item when an isolated piece of work was cut from
scope and should be preserved, but it does not need program-level context.

## Files

The structure follows delivery concerns, not technologies. Use concern names
such as `testing.md`, `delivery.md`, and `infrastructure.md`; name specific
tools inside those files only when the tools matter.

Mermaid is the preferred diagram syntax for development context because it is
both readable Markdown for agents and renderable visual context for humans.

| Term | Meaning |
| --- | --- |
| `README.md` | Entry point for a folder. It should explain status, scope, links, and where to start. |
| `plan.md` | Working alignment space for humans and agents. It may be messy, but settled truth must move into stable files. |
| `spec.md` | Stable description of what the system should do. |
| `interface.md` | Stable description of how humans, clients, APIs, config, reports, or tools interact with the work. |
| `architecture.md` | Stable description of internal shape, boundaries, data flow, contracts, and tradeoffs. |
| `testing.md` | Stable description of verification strategy, automated and manual coverage, test data, and release gates. |
| `delivery.md` | Stable description of CI/CD, build behavior, deployment flow, environment promotion, release toggles, and delivery automation. |
| `infrastructure.md` | Stable description of environment shape, IaC, resources, networking, identity, storage, secrets, and environment dependencies. |
| `operations.md` | Optional actionable runtime support context: observability, failure modes, rollback, repair, support procedures, and tooling. |
| `backlog.md` | Trackable work items for the containing initiative or program. |
| `release-doc-notes.md` | Notes for future product documentation refresh work. This is the bridge to `Documentation/`. |
| ADR | Architecture Decision Record. Use for durable decisions and tradeoffs. |
| `brief.html` | Optional human-friendly presentation layer. |

## Status Terms

| Status | Meaning |
| --- | --- |
| Draft | Early context exists, but scope or direction is not settled. |
| Planned | Future scope is known, but it is not active in the current release. |
| Active | Work is part of the current release's delivery scope. |
| Implementing | Code or documentation work is actively being changed. |
| Blocked | Work cannot proceed until a dependency, decision, or external condition changes. |
| Parked | Intentionally paused, but not abandoned. |
| Deferred | Removed from current scope and kept for possible later work. |
| Promoted | Planned or backlog work has been materialized into a release initiative. |
| Superseded | Replaced by another plan, initiative, decision, or backlog item. |
| Released | Delivered and preserved as historical release context. |

## Promotion

Promotion materializes future or deferred work into a release initiative.
Promotion is explicit and traceable.

Planned initiatives are promoted when their target release becomes current or
when release planning explicitly begins:

```text
Development/programs/<program>/planned-initiatives/<initiative>/
  -> Development/releases/<version>/initiatives/<initiative>/
```

Backlog items are promoted when someone decides to pick them up:

```text
Development/backlog/items/<originating-initiative>--<item>.md
  -> Development/releases/<version>/initiatives/<initiative>/
```

Promotion does not silently move or delete the original context. Leave the
original planned initiative or backlog item in place, update its status to
`Promoted`, and link to the release initiative.

## Release Transition

A release transition is the act of changing `Development/current.md` to a new
release. This is not just a line edit.

During a release transition, agents should:

- create the release folder if missing
- scan programs for planned initiatives targeting the new release
- promote matching planned initiatives into the release's `initiatives/`
  folder
- update links both ways
- leave planned initiatives as historical planning context

Use `Development/_templates/release-transition.md` as the checklist.
