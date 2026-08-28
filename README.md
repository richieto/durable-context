# durable-context · durable-context-solo · reference-docs

Three npm packages for keeping agent context close to the code:

- **durable-context** — collaborative initiative lifecycle, planning, and decisions
- **durable-context-solo** — focused planning and continuity for one accountable human
- **reference-docs** — keep `reference/` accurate from release tag diffs

Choose one Durable Context edition; they are mutually exclusive because both
own the same `context/`, `decisions/`, and skill paths. Either edition can be
used independently from `reference-docs`.

## Quick Start

```bash
npx durable-context init --project-name "My App"
npx durable-context-solo init --project-name "My App"
npx reference-docs init --project-name "My App"
```

Use `durable-context` when several people need explicit lifecycle, review, and
handoff state. Use `durable-context-solo` when one accountable human still needs
repository-owned reasoning across large initiatives, agents, and sessions.

Projects that require another reference root can configure one at install time:

```bash
npx reference-docs init --project-name "My App" --reference-root Reference
```

Planning:

```text
/dc <name>
/dc <cycle>/<name>
```

Solo planning:

```text
/dc <name>
/dc <cycle>/<name>
```

Both editions provision `context/cycles/default/initiatives/` and make
`default` current. Projects may map later cycles to any meaningful cadence;
project-level scheduling and backlog management stay in external tools.

```bash
npx durable-context cycle init release-2
npx durable-context-solo cycle init quarter-3
```

Initializing a cycle creates its initiative container and makes it the sole
current cycle without defining what the cycle means.

Reference (after a release tag):

```text
Refresh reference from <previous-tag> to <new-tag>.
```

Both installers are idempotent and expose `status`, `--target`, and `--dry-run`.
`reference-docs` updates use managed-file conflict detection and preserve
project-owned authoring overlays and reference content.

## Mental Model

| Folder | Meaning | Lifetime | Package |
| --- | --- | --- | --- |
| `context/` | Cycle-grouped planning and delivery memory | Disposable bench | one Durable Context edition |
| `decisions/` | Why the system is the way it is | Durable log | one Durable Context edition |
| `reference/` | What the system does as of a release | Per-release refresh | reference-docs |

## Skills

**durable-context:** `dc` (recommended front door); advanced
`plan-with-context`, `challenge`, `dive-into-plan`,
`backfill-with-context`, and `checkpoint-context`

**durable-context-solo:** `dc` (recommended front door);
advanced `plan-with-context`, `challenge`, `dive-into-plan`, and
`backfill-with-context`

**reference-docs:** `reference-from-tags`, `reference-baseline`

All invocation-only — ask by name; they do not auto-run.

## Repository Layout

```text
packages/durable-context/   npm: durable-context
packages/durable-context-solo/ npm: durable-context-solo
packages/reference-docs/    npm: reference-docs
```

```bash
npm test --workspaces
```
