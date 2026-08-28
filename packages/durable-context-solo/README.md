# durable-context-solo

Focused repository-owned planning for one accountable human working across
coding agents and sessions.

```bash
npx durable-context-solo init --project-name "My App"
```

Invoke the recommended front door with an explicit initiative name:

```text
/dc billing-retry
```

Small fixes keep using the agent's normal planning behavior. Meaningful
initiatives preserve their reasoning in `context/` and accepted architectural
decisions in `decisions/`.

## Cycles

Initiatives live under `context/cycles/<cycle-id>/initiatives/`. A cycle is a
generic container: each project may map it to a sprint, release, milestone,
quarter, or another meaningful cadence. Fresh installations provision and
select `default`; an omitted cycle resolves to the current cycle recorded with
project-owned policy in `context/project-profile.md`.

On update, pre-cycle `context/initiatives/` folders move into `default` after a
collision check. Their resume metadata is not changed. The package does not
create cycle plans, capacity, schedules, or project backlogs; those remain in
Jira, GitHub, or the project's equivalent. An initiative-local `backlog.md`
remains a bounded work trace rather than a replacement for that external system.

## Profile Once, Evaluate Every Initiative

`context/project-profile.md` records source-backed capabilities such as public
interfaces, tests, CI/CD, IaC, operations, and reference documentation. The
baseline scan happens once; refresh runs only when those stable capabilities or
their evidence change.

Every Present or External concern is evaluated for meaningful work. Material
concerns receive focused documents and separate reasoning passes before
implementation. No-impact concerns retain a concise reason instead of an empty
file.

## Lightweight Continuity

Each initiative stores only:

- Status (`Active`, `Paused`, `Complete`, or `Abandoned`)
- Last checkpoint
- Next action
- Optional blocker

There are no lifecycle phases, reviewer roles, coordination gates, ownership
routing, transfer states, or PR-readiness validator.

`backfill-with-context` reconstructs planning when ordinary work grows into an
initiative, separating Observed, Human-confirmed, Inferred, and Unknown facts.

When repository evidence cannot settle human intent, the skills ask focused,
decision-bearing questions before choosing a direction. They preserve the
result, not the conversation: artifacts keep the minimum information needed to
resume or understand the work—conclusions, rationale and constraints, evidence,
material unknowns, and the next action—without transcripts or routine narration.

## Invocation-Only Skills

- `dc` — recommended front door
- `project-profile-baseline`
- `project-profile-refresh`
- `plan-with-context`
- `challenge`
- `dive-into-plan`
- `backfill-with-context`

## Ownership And Compatibility

Project profiles, initiatives, concern templates, and decisions are
project-owned after initialization. Package update refreshes managed skills and
marked guidance, renames the package-managed front door from
`durable-context-solo` to `dc`, moves flat initiatives into the canonical
`default` cycle, and preserves their contents and legacy status. It retires the
former package-managed `devils-advocate` skill in favor of `challenge`.

Accepted root decisions must remain understandable after disposable cycles are
deleted.

`durable-context-solo` and `durable-context` are alternative editions that use
the same repository roots and cannot manage the same project concurrently.

```bash
npx durable-context-solo@latest update
```

Use `npx durable-context-solo cycle init <cycle-id>` to create or select the sole
current cycle.

Commands/options: `init`, `update`, `status`, `cycle init`, `--target`,
`--dry-run`, and `--force` for `init`.
