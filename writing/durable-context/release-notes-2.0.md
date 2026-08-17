# Durable Context 2.0: Cycles And Durable Boundaries

Date: 2026-08-17  
Package: `durable-context`  
Feature release: `2.0.0`  
First announced patch: `2.0.2`

This is a maintainer release and migration record. It is not installed package
documentation.

## Why This Release Exists

Initiatives had a lifecycle but no generic container for the cadence in which
teams performed them. Projects needed to group work by a release, sprint,
milestone, quarter, or another locally meaningful boundary without making that
choice part of the package's worldview.

At the same time, deleting old working context exposed an important durability
test: accepted decisions and shipped-behavior reference must remain useful when
the initiative and its cycle no longer exist.

## Cycle Model

- Initiatives use `context/cycles/<cycle-id>/initiatives/<slug>/`.
- Fresh installations create and select `default`.
- `context/project-profile.md` contains one marked, project-owned cycle policy
  and current-cycle section.
- `cycle init <cycle-id>` creates the container and makes it the sole current
  cycle. The former cycle is left untouched and merely stops being current.
- A cycle is a namespace only. The package does not define dates, goals,
  capacity, scheduling, status, or whether the cycle is a sprint or release.
- Project planning and backlog management remain in Jira, GitHub, or the
  project's equivalent.

## Upgrade Normalization

Package update moves pre-cycle `context/initiatives/*` folders into
`context/cycles/default/initiatives/*`. It checks every destination before
writing and stops on a name collision rather than guessing which initiative is
authoritative. Known repository-root Markdown links are rewritten to the new
path.

Moving an initiative assigns a cycle; it does not invent lifecycle history.
An initiative without lifecycle markers remains legacy after the move.

The `2.0.2` patch adds this deterministic normalization, the `cycle init`
command, focused intent interviews, and proportionate artifact guidance before
the 2.0 line is publicly announced.

## Other Naming And Boundary Changes

- `devils-advocate` is retired in favor of `challenge`.
- Planning, detailed design, and challenge use a focused intent interview when
  repository evidence cannot settle a decision-bearing human choice. This is a
  technique within those skills, not a new lifecycle phase or a questionnaire.
- Working artifacts retain the minimum sufficient record—conclusions,
  rationale and constraints, evidence, material unknowns, and the next
  action—rather than conversational transcripts or routine narration.
- `backlog.md` remains bounded implementation state inside one initiative; it
  is not the project backlog.
- `follow-up.md` remains a final disclosure of completed, transferred, or
  explicitly waived work. Its external destination owns tracking after
  transfer.
- Closed cycles are disposable. Root decisions must be self-contained and use
  stable commit, PR, or release provenance rather than depending on context.
- Reference pages must describe released behavior without requiring retained
  planning artifacts.

## Validation

Cycle mechanics reject unsafe IDs, malformed or duplicate current-cycle state,
and flat/default destination collisions. Lifecycle validation remains separate:
cycle allocation does not convert a legacy initiative into a managed one.
