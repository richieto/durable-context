# Durable Context Solo 1.0: Focused Context For One Owner

Date: 2026-08-17  
Package: `durable-context-solo`  
Feature release: `1.0.0`  
First announced patch: `1.0.2`

This is the first stable Solo release record. The package keeps repository-owned
planning, focused concern analysis, backfill, and durable decisions while
removing collaborative lifecycle governance that provides no value to one
accountable owner.

## Included

- One `durable-context-solo` front door and invocation-only specialist skills.
- A source-backed project concern inventory reused across initiatives.
- Focus documents for material concerns, followed by cross-concern synthesis.
- A small resume marker with status, checkpoint, next action, and blocker.
- Evidence-conscious backfill when ordinary work grows beyond its initial plan.
- Focused, decision-bearing intent interviews inside planning, analysis, and
  challenge when repository evidence cannot determine the owner's direction.
- Minimum-sufficient artifacts that preserve conclusions, rationale,
  constraints, evidence, material unknowns, and next action—not transcripts.
- Direct creation of self-contained accepted ADRs in root `decisions/`.
- The neutral `challenge` skill in place of `devils-advocate`.
- Mutual exclusion with collaborative Durable Context because both editions own
  the same repository paths and specialist skill names.

## Cycles

Solo uses the same generic cycle mechanics as the collaborative edition:

- `context/cycles/<cycle-id>/initiatives/<slug>/` is canonical.
- Fresh installations select `default`.
- `cycle init <cycle-id>` creates or selects the sole current cycle.
- The project decides whether a cycle means a release, sprint, milestone,
  quarter, or something else.
- External tools continue to own project backlog, prioritization, capacity, and
  scheduling.

Package update moves pre-cycle flat initiatives into `default` after collision
preflight. Location does not imply workflow metadata: an unmarked initiative
remains legacy and is left unchanged by the Solo skills unless the human
explicitly requests migration.

The `1.0.2` patch adds deterministic normalization, generic cycle
initialization and validation, the explicit legacy-marker guard, focused intent
interviews, and proportionate artifact guidance before the 1.0 line is publicly
announced.

## Durable Boundary

`context/` and its cycles are disposable working memory. Accepted root
decisions must remain understandable after that context is deleted and should
carry stable commit, PR, or release provenance. When Reference Docs is also
used, shipped-behavior pages follow the same self-contained rule.
