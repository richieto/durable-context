# INITIATIVE_TITLE

<!-- durable-context:lifecycle:start -->
- Schema: 1
- Phase: Planning
- Condition: Active
- Started: YYYY-MM-DD
- Last checkpoint: YYYY-MM-DD
- Next action: Settle the initiative direction in plan.md.
- Blockers: None
- Plan review: Not run
- Artifact routing: Pending
- PR readiness: Not ready
<!-- durable-context:lifecycle:end -->

## Summary

TBD

## Phase Record

| Phase | Status | Evidence |
| --- | --- | --- |
| Planning | In progress | `plan.md` |
| Plan Review | Not started | — |
| Detailed Design | Not started | — |
| Implementation | Not started | — |
| Verification | Not started | — |
| PR Preparation | Not started | — |

## Artifact Routing

Confirm this table during detailed design. Create local documents only for
`Local` and `Hybrid` routes.

| Concern | Route | Local artifact | External destination | Evidence or reason | Merge blocking |
| --- | --- | --- | --- | --- | --- |
| Specification | TBD | `spec.md` | — | TBD | TBD |
| Interface | TBD | `interface.md` | — | TBD | TBD |
| Architecture | TBD | `architecture.md` | — | TBD | TBD |
| Testing | TBD | `testing.md` | — | TBD | TBD |
| Delivery | TBD | `delivery.md` | — | TBD | TBD |
| Infrastructure | TBD | `infrastructure.md` | — | TBD | TBD |
| Operations | TBD | `operations.md` | — | TBD | TBD |
| Backlog | TBD | `backlog.md` | — | TBD | TBD |
| Release documentation | TBD | `release-doc-notes.md` | — | TBD | TBD |

Allowed routes: `Local`, `External`, `Hybrid`, `Not applicable`, or `TBD` while
routing is pending.

`Backlog` means the bounded implementation trace for this initiative. Project
prioritization, capacity, scheduling, and post-handover tracking stay in the
named external system.

## Decisions

Keep proposed ADRs under this initiative. Promote only approved and implemented
architectural conclusions into the self-contained root `decisions/` history.

- None yet.

## Open Questions

- None yet.

## Checkpoints

| At | Phase | Condition | Summary | Next action | Evidence |
| --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | Planning | Active | Initiative created. | Settle direction. | `plan.md` |
