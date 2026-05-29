---
name: code-anchored-context
description: Use central repository context for planning and implementation. Use when starting, changing, reviewing, or documenting behavior-changing work; when checking or updating context/current.md, context/releases/*/initiatives/*, context/programs/*, context/programs/*/planned-initiatives/*, context/backlog/items/*, specs, plans, interface notes, architecture notes, testing notes, delivery notes, infrastructure notes, actionable operations notes, ADRs, backlog, release-doc-notes.md; when promoting planned initiatives during release transitions; or when deciding whether docs/ should be left untouched.
---

# Code-Anchored Context

## Overview

Use this skill to connect code work back to the central working context
under `context/`. The goal is to keep initiative knowledge centralized,
preserve durable multi-release context in programs, and keep deferred
isolated work discoverable in the context backlog. Scoped future program
work belongs in planned initiatives until the target release becomes current.
Working context should also cover delivery concerns such as testing,
delivery pipelines, and infrastructure when they affect how the work is
verified, shipped, deployed, or hosted.

## Workflow

### 1) Read The Local Rules

Read the nearest `AGENTS.md` files for the workspace and area being changed.
Respect area-specific engineering rules first.

### 2) Find The Current Context

Open `context/current.md` from the repository root. It points to the
active release folder.

Use `context/terminology.md` as the canonical vocabulary for programs,
planned initiatives, release initiatives, backlog items, statuses, and
promotion.

If the workspace starts inside a subfolder, navigate upward to the repository
root when the environment allows it. If `context/` is not available in
the workspace, mention that limitation in the task summary.

### 3) Match Existing Context

Search these places for matching context:

- active release initiatives under `context/releases/<current-release>/initiatives/`
- durable programs under `context/programs/`
- scoped future program work under `context/programs/<program>/planned-initiatives/`
- deferred items under `context/backlog/items/`

Search for:

- the feature or bug name
- affected concern names, such as product code, APIs, contracts, tests,
  delivery, CI/CD, infrastructure, config, generated artifacts, or automation
- related domain terms, APIs, jobs, entities, routes, config names, or tickets

Use an existing initiative when the work belongs to it, even if the code
change is local to one project. If the initiative is part of a multi-release
effort, link it to the relevant program.

### 4) Create An Initiative When Needed

Create a new initiative for non-trivial behavior changes, cross-project
work, release-significant work, or anything likely to need future product
documentation.

Use `context/_templates/initiative/` as the source. Copy it to:

```text
context/releases/<current-release>/initiatives/<initiative-slug>/
```

Update the copied `README.md` first so future agents can quickly understand
status, scope, touched areas, open questions, and implementation state. Use
`plan.md` for live alignment with the human before the stable initiative
files settle.

For tiny localized fixes that do not belong to an initiative, do not invent
process. Summarize that no initiative was needed.

### 5) Capture Planned Future Initiatives

If future program work is known well enough to scope, split, or preserve
implementation intent, create a planned initiative under the parent program:

```text
context/programs/<program-slug>/planned-initiatives/<initiative-slug>/
```

Use `context/_templates/planned-initiative/` as the source.

Use a planned initiative when:

- the work belongs to a program
- the target release is not current yet
- the future phase is clear enough for a plan, spec, or backlog
- capturing it only in `roadmap.md` or `releases/<version>.md` would lose
  useful scope or implementation context

Do not create a future `context/releases/<version>/` initiative just to
hold planned work unless that release is being made current or release
planning has explicitly begun.

### 6) Carry Context Forward When Scope Changes

Use the right outliving path when initiative context needs to survive beyond
the current release:

- `context/programs/<program-slug>/`: multi-release efforts, phases,
  roadmaps, durable decisions, and release-slice history
- `context/programs/<program-slug>/planned-initiatives/<initiative-slug>/`:
  scoped future delivery slices that are not in the current release yet
- `context/backlog/items/<originating-initiative-slug>--<item-slug>.md`:
  isolated deferred work cut from an initiative

When creating a backlog item, use `context/_templates/backlog-item.md`
and link to the originating initiative and release.

When picking up a backlog item later, keep the item as a historical record.
Mark it as promoted and link to the new release initiative.

### 7) Transition The Current Release

When asked to set a new current release, treat it as a release transition,
not just a `current.md` edit.

Use `context/_templates/release-transition.md` as the checklist:

1. Update `context/current.md`.
2. Create `context/releases/<target-release>/` from
   `context/_templates/release-context/` if missing.
3. Scan `context/programs/*/planned-initiatives/*/README.md` for
   `Target release: <target-release>`.
4. Promote each match into:

```text
context/releases/<target-release>/initiatives/<initiative-slug>/
```

5. Update the planned initiative metadata to `Status: Promoted`, with
   `Promoted to:` and `Promoted on:`.
6. Link both directions between the program/planned initiative and the
   promoted release initiative.

Planned initiatives are promoted, not moved silently. Leave the planned
initiative in place as historical planning context.

### 8) Update The Right Files

Use these files as the standard map:

- `README.md`: entry point, status, touched areas, links, open questions
- `plan.md`: working alignment space for rough notes, questions, options,
  and notes to promote
- `spec.md`: what the system should do
- `interface.md`: how humans, clients, APIs, config, or tools interact with it
- `architecture.md`: internal shape, boundaries, flows, contracts, data
  Use Mermaid for diagrams when a flow or relationship is clearer visually;
  it remains readable Markdown for agents and renders for humans.
- `testing.md`: verification strategy, coverage, test data, release gates
- `delivery.md`: CI/CD, build behavior, deployment flow, environment
  promotion, release toggles, delivery automation
- `infrastructure.md`: environment shape, IaC, resources, networking,
  identity, storage, secrets, environment dependencies
- `operations.md`: optional actionable runtime/support context such as
  observability, failure modes, rollback, repair, and support tooling
- `backlog.md`: work slices and implementation progress
- `decisions/ADR-*.md`: meaningful choices and their consequences
- `release-doc-notes.md`: product-documentation impact to review at release

Not every initiative needs every file. Mark a file as not applicable or omit
it after copying the template when it genuinely does not apply.

`plan.md` is allowed to be messy, but it must not become the only place where
settled truth lives. Promote stable conclusions into `spec.md`,
`interface.md`, `architecture.md`, `testing.md`, `delivery.md`,
`infrastructure.md`, `operations.md` when actionable, `backlog.md`, ADRs, or
`release-doc-notes.md` as appropriate.

### 9) Preserve The Docs Boundary

Do not edit `docs/` as part of normal feature work, bug fixes,
refactors, or planning. Instead, update the initiative's
`release-doc-notes.md`.

Only update `docs/` when a human explicitly asks for release
documentation work, a specific page update, or a demonstrable documentation
fix.

## Knowledge Ownership

Denormalize navigation, not knowledge.

Local `AGENTS.md` files may point to `context/`, but initiative specs,
plans, ADRs, and release-doc notes should live in the central initiative
folder. Do not create area-local copies of initiative documents.

## Completion Check

Before finishing behavior-changing work:

- The matching initiative was read or a reason was given for why none exists.
- Matching programs or context backlog items were checked when the work
  appears phased, deferred, or multi-release.
- Planned initiatives were checked or created when future program scope is
  already clear but outside the current release.
- Any changed behavior, interface, architecture, testing, delivery,
  infrastructure, actionable operations, or backlog state was reflected in the
  initiative when appropriate.
- Future product-documentation impact was captured in `release-doc-notes.md`.
- `docs/` was left untouched unless explicitly requested.
