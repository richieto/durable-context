# Initiative Lifecycle Protocol

## Current state

Store current state between these exact README markers:

```markdown
<!-- durable-context:lifecycle:start -->
- Schema: 1
- Phase: Planning
- Condition: Active
- Started: 2026-08-07
- Last checkpoint: 2026-08-07
- Next action: Settle the initiative direction in plan.md.
- Blockers: None
- Plan review: Not run
- Artifact routing: Pending
- PR readiness: Not ready
<!-- durable-context:lifecycle:end -->
```

Allowed phases, in order:

1. `Planning`
2. `Plan Review`
3. `Detailed Design`
4. `Implementation`
5. `Verification`
6. `PR Preparation`

Allowed conditions: `Active`, `Paused`, `Blocked`, `Complete`, `Abandoned`.

Allowed plan-review states: `Not run`, `No material challenge`,
`Open challenges`, `Resolved`. Review is advisory while `Not run`. Once a
material challenge exists, its declared dependent phases are blocked until a
human conclusion resolves or supersedes it.

Allowed artifact-routing states: `Pending`, `Confirmed`. Allowed PR-readiness
states: `Not ready`, `Ready`.

Maintain a phase table with one row per phase and status `Not started`,
`In progress`, `Complete`, or `Skipped`. Explain skipped work in Evidence.
Maintain an append-only checkpoint table with date/time, phase, condition,
summary, next action, and evidence.

## Material challenges

Store material reviews as `reviews/NNNN-topic.md`:

```markdown
# Review 0001: Topic

- Status: Open
- Blocks phases: Detailed Design, Implementation
- Outcome: Pending
- Resolver: Pending
- Resolved: Pending

## Commitment
...

## Challenge
...

## Trade-offs
...

## Affected Artifacts
- `plan.md`
```

Allowed statuses: `Open`, `Awaiting Review`, `Resolved`, `Superseded`.
Allowed resolved outcomes: `Retain`, `Revise`, `Replace`, `Accept Risk`.
Persuasive critique is not authorization. A human must provide the conclusion.
For Revise or Replace, update affected artifacts before resolving the review.
For Retain or Accept Risk, state the accepted trade-offs.

Validate a proposed phase transition with `--advance "<phase>"`. An unresolved
review errors only when it names that requested phase, or at PR readiness. This
allows an initiative to record its actual phase and continue unrelated work
while the dependent slice waits.

## Artifact routing

Record each concern in the README routing table as `Local`, `External`,
`Hybrid`, or `Not applicable`; use `TBD` only before routing is confirmed.
Capture local path, external destination, evidence/reason, and whether the
concern blocks merge. Create local documents only for Local and Hybrid routes.
Do not claim an external action occurred without a stable link or other
evidence; record a follow-up instead.

## Follow-ups

Create `follow-up.md` only when needed. Represent each item as:

```markdown
## F-001: Title

- State: Open
- Trigger: After merge
- Reason: ...
- Merge blocking: No
- Destination: Pending
- Responsibility: Pending
- Evidence: Pending
- Resolver: Pending
- Resolved: Pending
```

Allowed states: `Open`, `Completed`, `Transferred`, `Transfer Waived`.
Before PR readiness, every item must be Completed, Transferred, or Transfer
Waived. A transfer waiver requires human rationale in Reason, Resolver, and
Resolved date and satisfies validation without another warning. The merged
file is disclosure, not a post-merge tracker.

## Durable decisions

Root decisions must explain their context, choice, consequences, alternatives,
and stable origin without requiring initiative files. Use a PR URL, commit, or
release tag as stable origin; initiative links are optional provenance. Keep
full reviews and backfill evidence in disposable initiative context.
