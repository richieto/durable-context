# Development

This folder is the working memory for active and historical development
context in this repository.

Use it for specs, interface notes, architecture notes, testing notes, delivery
notes, infrastructure notes, actionable operations notes, ADRs, backlog items,
implementation plans, and release-documentation notes. Do not use
`Documentation/` for in-progress development planning.

## Start Here

- `code-anchored-context.html` is a human-friendly visual brief for this
  opinionated context practice.
- `giving-ai-agents-context-around-code.md` is an article-form explanation of
  Code-Anchored Context for human-agent collaboration.
- `terminology.md` defines the shared vocabulary.
- `current.md` points to the active release context.
- `programs/` contains durable multi-release development context.
- `backlog/` contains deferred isolated work cut from initiatives.
- `releases/` contains release-scoped development context.
- `_templates/initiative/` contains the standard initiative shape.
- `_templates/planned-initiative/` contains the standard future initiative
  shape for scoped program work outside the current release.
- `_templates/release-context/` contains the standard release folder shell.

## Relationship To Documentation

`Development/` and `Documentation/` serve different jobs:

| Folder | Meaning | Updated when |
| --- | --- | --- |
| `Development/` | What we are planning, building, deciding, or validating. | During normal development. |
| `Documentation/` | What the product does as of a release or tag. | Only during explicit documentation refresh work. |

Development notes can feed release documentation, but they are not product
documentation. Capture that bridge in each initiative's
`release-doc-notes.md`.

## Core Model

The vocabulary for this context model is defined in `terminology.md`.

Release initiatives are the durable unit of release-scoped development
context. An initiative may touch one project, many projects, IaC, automation,
tests, or all of them. Keep the release story in one initiative folder even
when the code changes span several areas.

Some context needs to outlive a single release initiative:

| Place | Use for |
| --- | --- |
| `Development/programs/` | Long-lived multi-release efforts, phase history, roadmaps, and durable decisions. |
| `Development/programs/<program>/planned-initiatives/` | Scoped future delivery slices that belong to a program but are not in the current release yet. |
| `Development/backlog/items/` | Deferred isolated work cut from an initiative but worth preserving. |
| `Development/releases/<version>/initiatives/` | Release-scoped delivery slices and historical implementation context. |

The rule is:

> Active work belongs in a release initiative. Multi-release context belongs in
> a program. Scoped future program work belongs in a planned initiative.
> Deferred isolated work belongs in the development backlog.

The delivery-surface rule is:

> Structure follows delivery concerns, not technologies.

Use `testing.md`, `delivery.md`, and `infrastructure.md` for concern-based
context. Mention specific tools inside those files only when the tools matter.

Mermaid diagrams are encouraged for flows, dependencies, and lifecycle maps
because they stay readable as Markdown for agents while rendering as visible
diagrams for humans.

The navigation rule is:

> Denormalize navigation, not knowledge.

Area `AGENTS.md` files should point agents back to this folder. They should
not copy specs, plans, or ADRs into area-local documents.

## Standard Layout

```text
Development/
  current.md
  programs/
    <program-slug>/
      README.md
      context.md
      roadmap.md
      backlog.md
      decisions/
      planned-initiatives/
        <planned-initiative-slug>/
          README.md
          plan.md
          spec.md
      releases/
        v0_1_0.md
  backlog/
    README.md
    items/
      <originating-initiative-slug>--<item-slug>.md
  releases/
    v0_1_0/
      README.md
      backlog.md
      initiatives/
        <initiative-slug>/
          README.md
          plan.md
          spec.md
          interface.md
          architecture.md
          testing.md
          delivery.md
          infrastructure.md
          operations.md
          backlog.md
          decisions/
            ADR-0000-template.md
          release-doc-notes.md
          brief.html
```

## Programs

Programs preserve durable context for work that spans releases or phases. Use a
program when the larger effort has a roadmap, several release slices, important
decisions, or remaining scope that should stay visible after a release
initiative closes.

Use `planned-initiatives/` inside a program when future work is already clear
enough to scope, split, or preserve implementation intent, but the target
release is not current yet. Planned initiatives are promoted into release
initiatives when their target release becomes current.

Release initiatives should link to their program when one exists. Programs
should link back to the release initiatives that delivered each slice.

Do not use a program for a small leftover task. Use
`Development/backlog/items/` for deferred isolated work.

## Development Backlog

Use `Development/backlog/items/` for isolated work that was taken out of an
initiative's scope but should be kept for later. Each backlog item records its
origin initiative and release.

When a backlog item is picked up later, keep the backlog item as a historical
record. Mark it as promoted and link to the new release initiative instead of
rewriting the item into the new plan.

## Planned Initiatives

Planned initiatives are scoped children of a program that target a future
release. They preserve clear future scope without pretending that the future
release is already active.

Use a planned initiative when:

- the future phase is clear enough to write a plan, spec, or backlog
- the work belongs to a program
- the target release is known or likely
- the current release should not own active delivery for that scope yet

When the target release becomes current, promote the planned initiative into
the target release's `initiatives/` folder and leave the planned initiative
behind as historical planning context.

## Delivery Concerns

Release initiatives should describe the whole delivery surface when it matters,
not only the application code.

| File | Use for |
| --- | --- |
| `testing.md` | Verification strategy, automated coverage, manual checks, test data, regression risk, and release gates. |
| `delivery.md` | CI/CD, build behavior, deployment flow, environment promotion, release toggles, and delivery automation. |
| `infrastructure.md` | Environment shape, IaC, resources, networking, identity, storage, secrets, and environment dependencies. |

At the program level, use equivalent concern files only when the concern spans
multiple releases. A release-local test plan belongs in the release initiative.
A cross-release migration testing strategy may belong in the program.

## Initiative Files

Required for most initiatives:

| File | Purpose |
| --- | --- |
| `README.md` | Agent entry point, status, scope, touched areas, links, open questions. |
| `plan.md` | Working alignment space for humans and agents; rough notes, questions, options, and points to promote. |
| `spec.md` | What the system should do and which behavior is in or out. |
| `backlog.md` | What is changing now, sliced into trackable work. |
| `release-doc-notes.md` | Product documentation impact to review at release time. |

Use when relevant:

| File | Purpose |
| --- | --- |
| `interface.md` | How humans, clients, APIs, config, reports, or tools interact with it. |
| `architecture.md` | Internal shape, boundaries, data flow, contracts, and tradeoffs. |
| `testing.md` | Test strategy, automated/manual coverage, test data, and release gates. |
| `delivery.md` | CI/CD, build, deployment, environment promotion, and release toggles. |
| `infrastructure.md` | IaC, resources, environment shape, networking, identity, storage, and secrets. |
| `operations.md` | Optional. Use only for actionable runtime, support, observability, rollback, or repair context. |
| `decisions/ADR-*.md` | Why an important choice was made. |
| `brief.html` | Optional human-friendly presentation layer. |

## Carrying Context Forward

When an initiative produces context that needs to survive after the release:

- Move multi-release strategy, roadmap, and durable decisions into
  `Development/programs/<program-slug>/`.
- Move scoped future delivery slices into
  `Development/programs/<program-slug>/planned-initiatives/<initiative-slug>/`.
- Move isolated deferred work into
  `Development/backlog/items/<originating-initiative-slug>--<item-slug>.md`.
- Keep release-scoped plans, implementation history, and final release notes
  inside the original initiative.

## Changing The Current Release

Changing `Development/current.md` is a release transition, not just a line
edit. Use `Development/_templates/release-transition.md` as the checklist.
Create missing release folders from `Development/_templates/release-context/`.

When setting a release as current, agents should scan all program planned
initiatives for matching `Target release:` metadata and promote matching items
into `Development/releases/<version>/initiatives/`.

The promotion rule is:

> Planned initiatives are promoted, not moved silently.

## Agent Workflow

When changing behavior, agents should:

1. Read the local `AGENTS.md`.
2. Open `Development/current.md`.
3. Check the current release's initiatives for matching context.
4. Use `plan.md` for live alignment, open questions, and rough thinking.
   Promote settled conclusions into the stable initiative files.
5. Update the matching initiative when the change affects its scope.
6. Create a new initiative from `_templates/initiative/` for non-trivial
   behavior changes that do not belong to an existing initiative.
7. Create or update a program planned initiative when future scoped work is
   clear but belongs outside the current release.
8. Record future product-doc impact in `release-doc-notes.md`, not in
   `Documentation/`, unless a human explicitly asks for documentation refresh.

The key rule for planning is:

> `plan.md` is allowed to be messy, but it must not become the only place where
> settled truth lives.
