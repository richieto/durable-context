# durable-context-solo

Focused repository-owned planning for one accountable human working across
coding agents and sessions.

```bash
npx durable-context-solo init --project-name "My App"
```

Invoke the recommended front door with an explicit initiative name:

```text
Use durable-context-solo for initiative billing-retry.
```

Small fixes keep using the agent's normal planning behavior. Meaningful
initiatives preserve their reasoning in `context/` and accepted architectural
decisions in `decisions/`.

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

## Invocation-Only Skills

- `durable-context-solo` — recommended front door
- `project-profile-baseline`
- `project-profile-refresh`
- `plan-with-context`
- `devils-advocate`
- `dive-into-plan`
- `backfill-with-context`

## Ownership And Compatibility

Project profiles, initiatives, concern templates, and decisions are
project-owned after initialization. Package update refreshes managed skills and
marked guidance without replacing them.

`durable-context-solo` and `durable-context` are alternative editions that use
the same repository roots and cannot manage the same project concurrently.

```bash
npx durable-context-solo@latest update
```

Commands/options: `init`, `update`, `status`, `--target`, `--dry-run`, and
`--force` for `init`.
