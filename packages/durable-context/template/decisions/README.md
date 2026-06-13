# Decisions

This is the durable, append-only decision log for PROJECT_NAME.

Working context under [`context/`](../context/) is a disposable bench and will
be archived over time. Architecture and design decisions must outlive it, so
accepted decisions are promoted here where they stay findable.

## How It Works

- One file per decision: `NNNN-short-title.md`, numbered in order.
- Decisions are append-only. Do not rewrite history. When a decision changes,
  add a new decision and mark the old one `Superseded by NNNN`.
- Each decision records its status, date, context, the decision, consequences,
  alternatives, and backlinks to where it was made.
- Copy [`0000-template.md`](0000-template.md) to start a new entry.

## Statuses

- `Proposed` - drafted, not yet accepted.
- `Accepted` - in force.
- `Superseded` - replaced by a later decision; kept for history.
- `Deprecated` - no longer applies, with no direct replacement.

To see what is currently in force, read the entries with status `Accepted`.

## Promotion From Initiatives

The `dive-into-plan` skill promotes accepted decisions out of an
initiative's scratch `context/initiatives/<slug>/decisions/` folder into this
log, assigns the next number, and links back to the originating initiative and
to the release tag, PR, or commit where the decision was made.

## Index

| Number | Title | Status | Date |
| --- | --- | --- | --- |
| 0000 | (template) | - | - |
