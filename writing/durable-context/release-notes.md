# Durable Context 1.2.0: Release Notes And Decision Record

Date: 2026-08-07  
Package: `durable-context`  
Release: `1.2.0`

This is a maintainer decision record, not installed package documentation. It
preserves why 1.2.0 exists, the choices made while designing it, and the
assumptions that adoption feedback may prove wrong.

## Why This Release Exists

Durable Context was designed for large initiatives, not every bug fix or small
change. Ordinary work should still use the coding agent's native planning
capability and ship without ceremony.

The missing case was the boundary between small and large. Work can start as a
normal plan, grow through one long session or several sessions on the same
working branch, and become architecturally or operationally significant only
near PR creation. At that point the code exists, but the repository may contain
none of the development reasoning, review conclusions, or ADR candidates that
would have existed if the work had begun as a declared initiative.

This exposed three related gaps:

1. **Backfill:** reconstruct durable context honestly from existing work without
   pretending the initiative was planned first.
2. **State:** show where a multi-day or multi-person initiative currently is and
   what must happen next, so another user or agent does not repeat the
   investigation or accidentally skip an unresolved dependency.
3. **Adaptive distribution:** decide which concerns deserve local documents,
   which live in external systems, which need both, and which do not apply,
   before creating a directory full of empty templates.

A fourth gap became clear during discussion: the devil's-advocate skill could
produce a strong critique but had no durable conclusion model. A critique can
be more sophisticated than the current user's response without necessarily
being the better product or engineering decision. Other humans may need time to
assess whether either side's trade-offs are acceptable. The framework needed a
way to pause, retain the challenge, and later record what humans concluded.

Earlier project-specific extensions, especially the Adra experience, also
showed the value of project-profile awareness, area-specific guidance, release
notes, validation rules, and explicit completion criteria. Those lessons
influenced this release, but the package remains repository-neutral and does
not couple Durable Context to Adra, `reference-docs`, or any external operations
system.

## Design Principles Carried Forward

- Durable Context remains opt-in for meaningful initiatives.
- The repository owns the working context, not an agent session or vendor.
- `context/` is a disposable working bench; `decisions/` is isolated durable
  architectural history.
- Code proves what changed, but rarely proves why it changed.
- Human judgment remains authoritative. An agent can challenge, investigate,
  validate, and propose; it cannot authenticate organizational authority.
- Validation should prevent known contradictions without turning every useful
  practice into a mandatory ceremony.
- The merged initiative is a PR-time snapshot, not a post-merge status tracker.

## Decisions Made In 1.2.0

### One recommended front door

`durable-context` is the only skill name ordinary users need to remember. It
selects the next applicable workflow from recorded state and advances work only
to the next meaningful boundary.

The specialist skills remain independently invokable for advanced use and
backward compatibility:

- `project-profile-baseline`
- `project-profile-refresh`
- `plan-with-context`
- `devils-advocate`
- `dive-into-plan`
- `backfill-with-context`
- `checkpoint-context`

All are invocation-only. They recommend the front door unless a human
intentionally enters that stage directly. Separate specialist skills were kept
instead of pretending they could be private or hidden; installed skills are
discoverable even when omitted from onboarding.

### Explicit initiative identity

The user names or selects the initiative. The framework never derives identity
from the Git branch because branch names may describe something else, contain
an external system ID, or cover several concerns. When no name is supplied, the
front door lists lifecycle-managed Active, Paused, and Blocked initiatives and
lists legacy folders separately.

For small work, the front door recommends normal agent planning. Invoking the
router is not by itself a second opt-in to scaffold an initiative; the human
must explicitly choose durable context after that recommendation.

### Six phases and five conditions

The lifecycle phases are:

1. Planning
2. Plan Review
3. Detailed Design
4. Implementation
5. Verification
6. PR Preparation

Completion is a condition, not another phase. Conditions are Active, Paused,
Blocked, Complete, and Abandoned.

An optional post-merge phase was rejected. The initiative is reviewed as part
of the code PR and should not generate documentation-only updates on the main
branch. Later fixes or changed conclusions belong in new code-changing work.

### Checkpoints at meaningful boundaries

The initiative README contains a marker-delimited current-state block, phase
record, artifact-routing table, and append-only checkpoint history. A
checkpoint records phase, condition, next action, blockers, time, summary, and
evidence.

Checkpoints are updated after material decisions, phase changes, pauses, review
resolutions, implementation milestones, and before ending substantial sessions.
Updating only at phase changes was considered too sparse for planning that may
span weeks; updating only on explicit user request was too easy to forget.

### Legacy initiatives stay legacy

Existing initiatives without lifecycle markers are reported as legacy and are
not migrated automatically. Most existing initiatives are expected to finish
under their current workflow. Package update must not rewrite project-owned
context or decisions.

For new initiatives in an updated repository, the skills use a project-owned
lifecycle-capable template when available and fall back to package-managed skill
assets when the repository still has an old template. This gives new work the
new behavior without rewriting the old template.

### Backfill is evidence plus a normalized plan

Backfill creates `backfill.md` in addition to `plan.md`; it does not replace the
plan. The evidence record separates:

- facts observed in code, tests, configuration, commits, and diffs;
- intent confirmed by a human after the fact;
- agent inferences that still require confirmation;
- unknowns that available evidence cannot resolve.

The normalized goal, scope, options, and remaining work go into `plan.md`.
Backfill sets the initiative to its actual phase and never fabricates earlier
review, approval, or planning. A retrospective challenge does not move an
implemented initiative backward to Plan Review; it pauses only dependent next
work.

`backfill.md` remains disposable initiative evidence. It is not promoted to the
root decision log.

### Devil's advocate is advisory; material challenges are not disposable

Running the devil's-advocate review is optional because its value varies and
mandatory use can produce diminishing returns. Skipping it is visible as `Not
run` but requires no waiver.

Once the review records a material challenge, that known objection cannot
silently disappear. Review records use Open, Awaiting Review, Resolved, or
Superseded. They identify the phases that depend on their conclusion.

A human resolves a challenge as:

- Retain
- Revise
- Replace
- Accept Risk

The conclusion records rationale, accepted trade-offs, resolver, date, and
affected artifacts. No reviewer role is configured or enforced: teams differ,
the framework does not know their real responsibilities, and the agent cannot
authenticate a title. If the desired human is unavailable, the review can wait
without pretending that the agent's critique became a decision.

When Revise or Replace is chosen, affected plan, code, or artifacts must change
before the review is marked Resolved. Retain and Accept Risk must state the
costs humans knowingly accepted. Unrelated investigation may continue while a
challenge waits.

Full challenge records remain in disposable initiative context. Only a
self-contained architectural conclusion may become an ADR.

### Artifact routing precedes scaffolding

New initiatives begin with only `README.md` and `plan.md`. During Detailed
Design, every concern is discussed and routed as:

- Local
- External
- Hybrid
- Not applicable

The route records its local file, external destination, evidence or reason, and
whether it blocks merge. Local files are created only for Local and Hybrid
routes. Not-applicable concerns receive a reason instead of an empty file.

This specifically supports cases such as operations work that belongs in
another system. The repository still records where the obligation went and
whether it blocks the PR. The agent must not claim an external action happened
without evidence.

### Follow-ups are final PR disclosures

`follow-up.md` is created only when work cannot or should not finish before
merge. Items are Open, Completed, Transferred, or Transfer Waived and record a
trigger, reason, merge-blocking status, destination, responsibility, evidence,
resolver, and resolution date.

PR readiness normally requires completion or transfer. Humans may explicitly
waive transfer with rationale, resolver, and date. We chose to treat a complete
waiver as satisfying validation without a continuing warning. The disclosure
remains visible in the merged initiative, but the file does not promise future
status updates.

### Root decisions stay independent

The root `decisions/` directory must never become a general archive of reviews,
backfills, or initiative discussions. A promoted ADR must explain its context,
decision, consequences, alternatives, and stable origin without requiring the
initiative to exist. A PR URL, commit, or release tag is stable origin;
initiative paths are optional provenance.

This preserves the intended lifetime boundary: initiative context can be
archived or deleted without erasing why the architecture is the way it is.

### Dependency-aware validation

The validator uses hard errors only for known contradictions or declared
dependencies:

- malformed lifecycle fields or invalid states;
- contradictory phase, condition, and PR-readiness values;
- a requested `--advance` transition blocked by an unresolved material review;
- missing local artifacts after a Local or Hybrid route is confirmed;
- unconfirmed or incomplete routing at PR readiness;
- malformed follow-ups or PR readiness with Open follow-ups;
- incomplete transfer evidence or human waiver fields.

Warnings cover advisory or quality signals such as review not run, skipped
normal stages, thin evidence, stale checkpoints, and external destinations that
are still pending before PR readiness.

Originally, unresolved reviews were checked against the initiative's current
phase. Forward testing showed that this was too coarse for backfill: an
initiative can honestly be in Implementation while only one implementation
slice is waiting. Validation now uses `--advance <phase>` to test an intended
transition and `--pr-ready` for the final snapshot, while ordinary validation
accepts the truthful stored state.

## Alternatives Rejected

- **Create initiatives for every change:** rejected because small fixes should
  retain normal agent planning and low ceremony.
- **Associate initiatives automatically with branches:** rejected because a
  branch is evidence and provenance, not reliable identity.
- **Put backfill evidence only in `plan.md`:** rejected because it blurs proven
  facts, retrospective intent, and inference.
- **Delete `backfill.md` before the PR:** rejected because it is useful evidence
  for how the reconstructed plan was derived.
- **Make devil's advocate mandatory:** rejected because the review can have
  diminishing returns.
- **Keep material critiques advisory forever:** rejected because a known
  objection affecting dependent work needs an explicit human conclusion.
- **Let the devil decide when its reasoning is stronger:** rejected because
  analytical sophistication does not grant product or organizational authority.
- **Require configured reviewer roles:** rejected because roles vary by team and
  cannot be verified by the framework.
- **Store full challenge records in root `decisions/`:** rejected because the
  durable log is for architectural conclusions, not working review history.
- **Create every concern document and mark unused ones N/A:** rejected because
  empty template directories create noise and train readers to skim.
- **Require every external follow-up to have a destination:** softened by the
  explicit Transfer Waived outcome for cases where humans accept disclosure
  without maintained external tracking.
- **Add a Post-Merge Follow-up phase:** rejected because merged initiative files
  will not be routinely maintained afterward.
- **Automatically migrate old initiatives:** rejected to avoid rewriting active,
  project-owned work near completion.
- **Use only warnings:** rejected because declared blockers and contradictory
  readiness would become easy to ignore.
- **Use a hard universal checklist:** rejected because applicability differs and
  adoption friction would undermine the practice.
- **Hide internal skills:** rejected because installed skills are discoverable;
  clear front-door guidance is more honest than simulated privacy.

## Assumptions To Revisit After Adoption

These are deliberate defaults, not permanent truths.

### The single front door is enough for adoption

Assumption: users will remember `durable-context` and advanced users will still
benefit from direct specialist entry points.

Watch for: users invoking specialists in the wrong order, agents failing to
route correctly, or onboarding still requiring knowledge of multiple names.

Possible change: make old names compatibility wrappers, consolidate more logic
into the router, or improve generated AGENTS guidance.

### The small-work recommendation is understandable

Assumption: agents can reasonably identify work where durable context would add
more ceremony than value, with the human making the final opt-in choice.

Watch for: inconsistent recommendations across agents, initiatives created too
late, or users feeling they must argue with the router.

Possible change: add project-owned threshold guidance or concrete heuristics,
without making file counts or diff size universal policy.

### Six phases are the right granularity

Assumption: Planning, Plan Review, Detailed Design, Implementation,
Verification, and PR Preparation express enough state without becoming project
management software.

Watch for: repeated need for a distinct clarification, approval, deployment, or
security-review phase.

Possible change: add project-owned phase extensions or fold phase status into a
smaller capability/gate model. Do not add phases merely because one team uses a
different label.

### Five conditions are enough

Assumption: Active, Paused, Blocked, Complete, and Abandoned distinguish normal
initiative state clearly.

Watch for: teams consistently needing Review Required, Ready, or On Hold as
conditions rather than evidence or next actions.

Possible change: refine condition vocabulary or make it project-configurable,
while retaining deterministic validation.

### Phase-level challenge dependencies are not too coarse

Assumption: naming blocked phases, combined with a concrete next action and
`--advance`, allows unrelated work to continue.

Watch for: reviews repeatedly blocking only one work item within a phase, or
agents interpreting phase dependency as a blanket stop.

Possible change: add structured `Blocks work` identifiers or explicit gate IDs
instead of relying primarily on phases.

### Silent transfer waivers are safe enough

Assumption: rationale, resolver, and date make a Transfer Waived item sufficiently
explicit, so an additional validator warning would add noise.

Watch for: waived local debt being forgotten, waivers becoming the default, or
reviewers missing them in large initiatives.

Possible change: restore a warning, require a PR-summary rollup, or allow
projects to disallow waivers.

### Fourteen days is a useful stale-checkpoint warning

Assumption: a two-week gap is long enough that state deserves confirmation but
short enough not to interrupt normal multi-week planning.

Watch for: teams with slower decision cycles receiving constant noise, or fast
teams finding stale state much sooner.

Possible change: make the threshold project-owned or remove time-based warnings
in favor of evidence-based freshness.

### PR-time completion is the right lifecycle boundary

Assumption: after-merge execution belongs in external systems or new code
changes, and documentation-only status PRs create more noise than value.

Watch for: teams lacking any external system, compliance requirements for
deployment evidence in-repo, or important rollout knowledge repeatedly being
lost.

Possible change: add an explicitly external completion receipt, release-linked
snapshot, or optional project policy. Avoid turning initiatives into permanent
operational trackers by default.

### Legacy initiatives should not migrate automatically

Assumption: preserving active work is more valuable than immediate consistency.

Watch for: long-lived legacy initiatives that cannot use the router, or teams
asking for a safe assisted migration.

Possible change: add an explicit, previewed migration skill that infers state
but requires human confirmation and never runs during package update.

### Duplicate fresh templates and managed skill assets will stay synchronized

Assumption: tests and maintainers can keep the fresh-install project template
and update-safe skill fallback equivalent.

Watch for: new installs and updated installs producing different lifecycle
formats.

Possible change: generate one representation from the other during package
tests or installation while preserving project ownership after init.

## Invariants Not To Change Lightly

- Do not make Durable Context mandatory for small changes.
- Do not infer initiative identity from a branch.
- Do not let an agent critique become a human decision implicitly.
- Do not promote full working reviews or backfill records into root decisions.
- Do not overwrite project-owned context, decisions, or legacy initiatives on
  package update.
- Do not require post-merge documentation-only updates to close an initiative.
- Do not claim external completion without evidence or an explicit human
  waiver.

## Release Verification

Before preparing 1.2.0, the implementation was checked through:

- the full npm workspace suite: 18 tests passed;
- 11 durable-context tests covering installer preservation, lifecycle states,
  dependent challenge blocking, conclusions, routes, follow-ups, waivers,
  legacy detection, and PR readiness;
- skill-creator structural validation for all eight installed skills;
- independent forward tests for the small-work front door and a backfilled
  initiative with an unavailable reviewer and external operations route;
- `npm publish --dry-run --workspace durable-context`.

At preparation time, the npm registry reported `durable-context` 1.1.2 and
`reference-docs` 1.2.0. Publishing was intentionally left as a separate human
action.
