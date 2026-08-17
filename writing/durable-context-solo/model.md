# Durable Context Solo: The Model And Rationale

`durable-context-solo` is the single-owner edition of Durable Context. It is
for one accountable human working across coding agents, sessions, and branches
on work whose reasoning is too large to remain in chat history or one
`plan.md`.

It is not the "small project" edition. A solo-maintained system can contain
infrastructure as code, delivery pipelines, public interfaces, operational
constraints, and architectural decisions that must survive for years. What is
smaller is the coordination model: there is no need to simulate team roles,
approval gates, reviewer availability, or hand-off state when one person owns
the conclusion.

## What Is Preserved

The edition preserves the ideas that motivated Durable Context 1.1.x:

- planning and decisions are owned by the repository, not an agent session;
- a stable project profile gives later agents a source-backed map of the
  system;
- each meaningful initiative evaluates the concerns the project actually has;
- material concerns receive focused documents instead of competing for
  attention in an ever-growing plan;
- cross-concern consequences are synthesized before implementation;
- accepted decisions that must outlive the initiative go to root `decisions/`.

Small fixes and routine changes still use the agent's native planning mode.
Durable context starts only when the user opts in.

## Profile Once, Evaluate Every Initiative

Repeated discovery is expensive and inconsistent. If a repository has IaC,
CI/CD, public APIs, operational procedures, or release documentation, every
agent should not have to rediscover those facts from scratch.

`context/project-profile.md` records a stable concern inventory. Each concern
is classified as `Present`, `External`, or `Absent`, with evidence and the
project-specific sources or commands that should be checked. The inventory is
refreshed when the repository's stable shape changes, not merely because a new
initiative begins.

The profile also contains the project-owned Cycle Policy And State section.
Cycles are generic initiative containers, not prescribed sprints or releases.
Fresh installations select `default`, while projects may later point to any
locally meaningful cycle ID. An omitted cycle uses the current pointer.
`durable-context-solo cycle init <cycle-id>` creates a cycle container and
makes it the sole current cycle without assigning goals, dates, or status.
Package update moves pre-cycle flat initiatives into the canonical `default`
cycle without adding Solo resume metadata.

No cycle plan, goal, capacity, schedule, or project backlog is maintained here;
those belong in Jira, GitHub, or the project's equivalent. An initiative-local
`backlog.md` remains useful as a bounded trace of its implementation state.

For a meaningful initiative, every `Present` and `External` concern is
evaluated. An `Absent` concern is checked for whether the work introduces it.
The initiative records one of:

- `Material` — needs focused analysis;
- `No impact` — evaluated with a concise reason;
- `External` — consequence exists but its maintained destination is elsewhere;
- `Introduced` — the initiative adds a capability absent from the profile;
- `TBD` — not yet understood and therefore not ready for implementation.

This is deliberate bounded evaluation, not a requirement to create every
possible document.

## Focus Documents Are Cognitive Architecture

The distribution step was not invented as team ceremony. A long `plan.md` is
hard for humans to navigate and can make a coding agent compress or skip
independent areas as it becomes eager to implement. One topic at a time gives
each concern enough attention to expose its constraints and evidence.

`plan.md` is therefore the integration map: scope, dependencies, sequencing,
and links to focused concern documents. Material concerns are explored in
separate passes, then reconciled across boundaries. The user confirms which
documents add value. `No impact` concerns remain concise table entries rather
than empty files.

## Lightweight Continuity

Solo work still spans days and agents. Each initiative README carries a small
resume marker with status, last checkpoint, next action, and blockers. It is a
bookmark, not a lifecycle engine. It does not impose six phases, validate
transitions, authenticate authority, or prevent the owner from changing
direction.

The front-door `durable-context-solo` skill reads that marker and the initiative
artifacts, performs the next safe piece of work, and records a checkpoint at a
meaningful stopping point. The user needs to remember only the front-door skill;
specialist skills remain available for direct use.

## Clarifying Intent Without Inventing It

Repository evidence establishes facts, but it cannot choose the owner's desired
outcome or trade-offs. When that distinction could materially change the work,
the workflow uses a focused intent interview: state the ambiguity, distinguish
evidence from interpretation and human choice, ask one decision-bearing question
or a small coherent group, and reflect the answer for correction.

This Socratic technique belongs inside planning, focused analysis, and
challenge. It is not another lifecycle phase or a questionnaire over every
concern. Questions stop once the next safe boundary is clear, and repository-
answerable facts or routine implementation choices stay with the agent.

The durable result is the conclusion, not the transcript. Initiative artifacts
keep only the information needed to resume or understand the work: settled
direction, rationale and constraints, evidence or a stable link, unresolved
material questions or risks, and the next action. Detail grows with uncertainty,
impact, risk, and cost of reversal; routine narration, generic advice, and
duplicated background are omitted.

## Backfill When Small Work Grows

Some branches begin as ordinary native-agent plans and become large only after
several sessions. Requiring foresight would punish exactly the case the system
is meant to help.

`backfill-with-context` reconstructs an explicitly named initiative from the
merge-base, commits, diff, tests, configuration, and user-provided session
context. It keeps observed facts, human-confirmed intent, inferences, and
unknowns separate. A diff can prove what changed; it usually cannot prove why.
Backfill never fabricates earlier planning, review, or approval.

After reconstruction, the same profile-driven concern evaluation and focused
analysis apply to the remaining work.

## Decisions Keep The Same Threshold

The architectural threshold does not become lower because one person owns the
work. A self-contained accepted decision that future maintainers or agents need
to understand belongs in root `decisions/`, with stable commit, PR, or release
provenance when available. It must remain understandable after the initiative
and its disposable cycle are deleted.

What changes is the route. Unsettled alternatives stay in `plan.md` or a focus
document. Once the owner accepts a significant conclusion, it can be written
directly as an ADR. Solo does not require a local ADR staging area, reviewer
resolution record, or promotion gate.

## What The Collaborative Edition Adds

The full `durable-context` package adds explicit lifecycle phases, checkpoint
validation, adversarial-review challenge resolution, negotiated artifact
routing, follow-up transfer or waiver, and PR-readiness rules. Those features
make distributed ownership visible across people and time.

Solo removes that coordination machinery, not the engineering analysis. The
editions are mutually exclusive because both own `context/`, `decisions/`, and
the same specialist skill paths. Choose the ownership model at installation;
switching editions is an explicit migration rather than an in-place update.

## Why This Is A Separate Package

A mode flag would make every skill explain two governance models and make
updates harder to reason about. A separate package keeps the Solo contract
coherent and lets adoption feedback change it independently. The 1.0 release
uses the published Durable Context 1.1.2 behavior as its historical baseline,
with the profile inventory, front-door continuity, and backfill improvements
layered on top.

The split also preserves reversibility: maintainers can compare the historical
baseline with the released Solo behavior and can evolve either edition without
pretending that one workflow is universally correct.
