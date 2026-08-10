# Durable Context Solo 0.1.1: Initial Release Notes

Date: 2026-08-10  
Package: `durable-context-solo`  
Release: `0.1.1`

This is the first Solo release: the Durable Context 1.1.x foundation adapted
for one accountable human working across agents and sessions, without the
collaborative lifecycle and coordination machinery added to `durable-context`.

## Why It Exists

Solo ownership does not imply a small or simple system. Repository-owned plans,
focused concern documents, and durable ADRs remain valuable when one person
maintains substantial interfaces, CI/CD, IaC, operations, and release surfaces.

The separate package keeps that analysis while avoiding artificial reviewer
roles, approval gates, hand-off state, and PR-readiness validation.

## Included

- A single `durable-context-solo` front door with invocation-only specialists.
- A source-backed project concern inventory, established once and evaluated for
  every meaningful initiative.
- Separate focus documents for material concerns, followed by cross-concern
  synthesis; `plan.md` remains the integration map.
- Lightweight resume state across sessions, not a lifecycle state machine.
- Evidence-conscious backfill when ordinary work unexpectedly grows large.
- Direct promotion of accepted, long-lived architectural decisions to root
  `decisions/`.
- Mutual exclusion with the collaborative edition because both packages own
  the same scaffold and specialist skill paths.

Small fixes continue to use the agent's native planning mode. Adoption feedback
should determine whether the concern vocabulary, resume marker, and document
decomposition need further simplification or stronger validation.
