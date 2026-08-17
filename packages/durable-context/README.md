# durable-context

Invocation-only skills and repository scaffolding for planning large initiatives,
resuming them across sessions, and preserving architectural conclusions.

```bash
npx durable-context init --project-name "My App"
```

This adds `context/`, `decisions/`, and the recommended `durable-context`
front-door skill. Invoke it with an explicit initiative name:

```text
Use durable-context for initiative customer-import.
```

If no name is supplied, the skill lists candidates and asks. It never treats a
branch name as the initiative identity. For small work it recommends ordinary
agent planning and creates nothing unless the human opts in.

## Cycles

Initiatives live under `context/cycles/<cycle-id>/initiatives/`. A cycle is a
generic container: each project may map it to a sprint, release, milestone,
quarter, or another meaningful cadence. Fresh installations provision and
select `default`; an omitted cycle resolves to the current cycle recorded with
project-owned policy in `context/project-profile.md`.

On update, pre-cycle `context/initiatives/` folders move into `default` after a
collision check. Their lifecycle metadata is not changed. The package does not
create cycle plans, capacity, schedules, or project backlogs; those remain in
Jira, GitHub, or the project's equivalent.

## Lifecycle

New initiatives start with only `README.md` and `plan.md` and track:

```text
Planning -> Plan Review -> Detailed Design -> Implementation
         -> Verification -> PR Preparation
```

Conditions are `Active`, `Paused`, `Blocked`, `Complete`, and `Abandoned`.
Checkpoints preserve the next action and evidence across users, agents, and
sessions. Challenge review is advisory; once a material challenge is
recorded, only its dependent work is blocked until a human concludes Retain,
Revise, Replace, or Accept Risk.

Detailed Design confirms each concern as Local, External, Hybrid, or Not
applicable before creating documents. `backlog.md` is a bounded trace of work
inside the initiative. `follow-up.md` records work handed elsewhere and is
created only when needed. PR readiness requires each follow-up to be completed,
transferred, or explicitly transfer-waived by a human; the destination system
owns transferred work.

When repository evidence cannot settle human intent, the skills pause at the
current boundary and ask focused, decision-bearing questions. They preserve the
result, not the conversation: artifacts keep the minimum information needed to
resume or understand the work—conclusions, rationale and constraints, evidence,
material unknowns, and the next action—without transcripts or routine narration.

## Advanced Entry Points

All skills are invocation-only:

- `project-profile-baseline` and `project-profile-refresh`
- `plan-with-context`
- `challenge`
- `dive-into-plan`
- `backfill-with-context` for work that grew beyond an ordinary plan
- `checkpoint-context` for deterministic lifecycle validation and state capture

Existing initiatives without lifecycle markers remain on the legacy workflow
and never receive lifecycle metadata automatically. Accepted root decisions
must remain understandable after disposable cycles are deleted.

## Update

```bash
npx durable-context@latest update
```

Update refreshes package-managed skills and marked guidance, moves flat
initiatives into the canonical `default` cycle, and preserves their contents
and legacy status. It retires the former package-managed `devils-advocate`
skill in favor of `challenge`.

Use `npx durable-context cycle init <cycle-id>` to create or select the sole
current cycle.

Commands/options: `init`, `update`, `status`, `cycle init`, `--target`,
`--dry-run`, and `--force` for `init`.

For release-anchored shipped-behavior documentation, see `reference-docs`.
