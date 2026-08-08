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

## Lifecycle

New initiatives start with only `README.md` and `plan.md` and track:

```text
Planning -> Plan Review -> Detailed Design -> Implementation
         -> Verification -> PR Preparation
```

Conditions are `Active`, `Paused`, `Blocked`, `Complete`, and `Abandoned`.
Checkpoints preserve the next action and evidence across users, agents, and
sessions. Devil's-advocate review is advisory; once a material challenge is
recorded, only its dependent work is blocked until a human concludes Retain,
Revise, Replace, or Accept Risk.

Detailed Design confirms each concern as Local, External, Hybrid, or Not
applicable before creating documents. `follow-up.md` is created only when
needed. PR readiness requires each follow-up to be completed, transferred, or
explicitly transfer-waived by a human.

## Advanced Entry Points

All skills are invocation-only:

- `project-profile-baseline` and `project-profile-refresh`
- `plan-with-context`
- `devils-advocate`
- `dive-into-plan`
- `backfill-with-context` for work that grew beyond an ordinary plan
- `checkpoint-context` for deterministic lifecycle validation and state capture

Existing initiatives without lifecycle markers remain on the legacy workflow
and are never migrated automatically.

## Update

```bash
npx durable-context@latest update
```

Update refreshes package-managed skills and marked guidance without replacing
project-owned `context/`, `decisions/`, or legacy initiatives.

Commands/options: `init`, `update`, `status`, `--target`, `--dry-run`, and
`--force` for `init`.

For release-anchored shipped-behavior documentation, see `reference-docs`.
