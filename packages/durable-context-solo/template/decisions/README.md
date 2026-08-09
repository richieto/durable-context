# Decisions

This is the durable, append-only decision log for PROJECT_NAME.

Working context under [`context/`](../context/) is a disposable bench and will
be archived over time. Architecture and design decisions must outlive it, so
accepted decisions are promoted here where they stay findable.

## How It Works

- One file per decision: `NNNN-short-title.md`, numbered in order.
- Decisions are append-only. Do not rewrite history. When a decision changes,
  add a new decision and link both directions with `Supersedes` and `Superseded by`.
- Each decision records status, date, area, scope, tags, supersession, context,
  decision, consequences, alternatives, origin, and links.
- Copy [`0000-template.md`](0000-template.md) to start a new entry.

## When To Write An ADR

Write an ADR only for architecturally significant decisions: choices that cross
team boundaries, have multiple credible options, or are costly to reverse.
Routine implementation choices belong in initiative notes, specs, plans, or
code review.

## Metadata

- `Area` is the most specific stable repo path or bounded product area.
- `Scope` is the functional boundary affected by the decision.
- `Tags` are lowercase retrieval terms.
- `Supersedes` and `Superseded by` are explicit links or `None`.

## Statuses

- `Accepted` - in force.
- `Superseded` - replaced by a later decision; kept for history.
- `Deprecated` - no longer applies, with no direct replacement.

Use `Proposed` or `Recommended` only in local `context/**/decisions/` folders
while work is active or planned. To see what is currently in force, read root
entries with status `Accepted`.

## Promotion From Initiatives

The `dive-into-plan` skill promotes accepted decisions out of an
initiative's scratch `context/initiatives/<slug>/decisions/` folder into this
log when the decision is accepted and implemented, or when a human explicitly
says it is ready for root history. On promotion, assign the next number,
preserve or complete metadata, update indexes, and link back to the origin.

## Secondary Indexes

Secondary indexes are navigation aids. They do not replace ADR files or this
root index.

- [Index guidance](indexes/README.md)
- [By area](indexes/by-area.md)
- [By status](indexes/by-status.md)
- [By origin](indexes/by-origin.md)

## Index

| Number | Title | Status | Date | Area | Scope | Origin |
| --- | --- | --- | --- | --- | --- | --- |
| 0000 | (template) | - | - | - | - | - |
