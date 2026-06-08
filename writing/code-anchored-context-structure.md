# Code-Anchored Context: The Structure

This is the companion to the
[reasoning article](code-anchored-context-why.md). It covers how working
context is laid out so both humans and agents can navigate it.

## Denormalize Navigation, Not Knowledge

Agents and IDEs do not always open from the repo root. They may start in
product code, CI/CD config, infrastructure code, generated artifacts, or a
nested app. If all guidance lives at the top, it gets missed. If each area
keeps its own plans, cross-project work fragments.

> Denormalize navigation, not knowledge.

Local `AGENTS.md` files point agents toward the right place. But plans, specs,
decisions, testing strategy, delivery notes, and infrastructure context live
centrally, in the two roots described below.

## Three Kinds Of Truth

There are three kinds of truth, and they live in three places:

```text
context/     What you are planning and building right now.
             Disposable working bench; archive when done.
decisions/   Why the system is the way it is.
             Durable, append-only decision log.
reference/   What the system does as of a release tag.
             Refreshed per release.
```

Each root has its own lifetime. `context/` is allowed to drift and be thrown
away. `decisions/` is permanent. `reference/` tracks released behavior. The
working bench is laid out flat:

```text
context/
  initiatives/<slug>/
  project-profile.md
  _templates/initiative/
decisions/
  0001-some-decision.md
  0002-another-decision.md
```

Structure follows delivery concerns, not technologies. Name a file for the
knowledge it preserves, not the tool that produced it.

## Initiatives

The main unit of active work is an initiative, one folder per piece of work in
progress:

```text
context/initiatives/<slug>/
  README.md   plan.md   spec.md   interface.md   architecture.md
  testing.md  delivery.md  infrastructure.md  operations.md
  backlog.md  decisions/  release-doc-notes.md
```

The most important file is `plan.md` — the working alignment space. It can be
messy with notes, options, and tradeoffs, with one rule:

> `plan.md` may be messy, but it must not be the only place settled truth lives.

Once something stabilizes, it moves to a durable file:

```text
spec.md              What the system should do.
interface.md         How clients, APIs, config, or tools interact with it.
architecture.md      Internal shape, boundaries, data flow, tradeoffs.
testing.md           Verification strategy, coverage, gates, known gaps.
delivery.md          CI/CD, build, deployment, promotion, release toggles.
infrastructure.md    Environments, IaC, networking, identity, storage, secrets.
operations.md        Runtime/support: observability, failure modes, rollback.
backlog.md           Trackable work items and progress.
decisions/           Local ADR drafts; accepted ones promote to ../../decisions/.
release-doc-notes.md What should become reference later.
```

Not every initiative needs every file. The point is to give stable knowledge a
place to land — testing, delivery, and infrastructure are first-class context,
not afterthoughts buried in pipeline files or PRs.

Treat the template as a starting point to tune, not a checklist to satisfy.
Start with the files the work actually needs — often just `README.md`,
`plan.md`, and a `spec.md` — and add the rest only when there is real knowledge
to put in them. Empty stubs train everyone to skim past these files; trim the
template down to your project and grow it deliberately.

## Durable Decisions

`context/` is a disposable bench — it drifts by design and is archived once the
work it described has shipped. That makes it the wrong home for the decisions
you want to keep. Architecture and design choices need to outlive the
initiative that produced them.

So accepted decisions are promoted out of an initiative's local `decisions/`
into the top-level log:

```text
decisions/
  0001-some-decision.md      Status: Accepted
  0002-another-decision.md   Status: Superseded by 0003
  0003-revised-decision.md   Status: Accepted
```

The log is append-only and numbered in order. You do not rewrite history: when
a decision changes, you add a new entry and mark the old one `Superseded`. Each
entry records its status (`Accepted`, `Superseded`, `Deprecated`), the context,
the decision, its consequences, and a backlink to where it was made. To see
what is in force right now, you read the entries marked `Accepted` — no digging
through months of folders required.

The planning workflow is what distills the bench into these durable artifacts:

```mermaid
flowchart LR
  Plan["plan.md<br/>messy working surface"]
  Distribute["per-concern docs<br/>spec, architecture, testing, ..."]
  Decisions["decisions/<br/>accepted ADRs"]

  Plan --> Distribute
  Distribute -->|"promote accepted decisions"| Decisions
```

## Two Packages, One Umbrella

This layout ships as two small, independent packages under one umbrella, in an
npm workspaces monorepo:

```text
packages/planning/    @code-anchored-context/planning  (context/ + decisions/)
packages/reference/   @code-anchored-context/reference (reference/)
writing/              shared narrative (not published)
```

Adopt either or both — they share one idea but have no hard dependency on each
other:

```bash
npx @code-anchored-context/planning init --project-name "My App"
npx @code-anchored-context/reference init --project-name "My App"
```

The planning package installs the disposable bench, the durable decision log,
and the invocation-only planning skills (`plan-with-context`,
`grill-and-distribute`). The reference package installs the `reference/` tree
and its own skills (`reference-from-tags`, `reference-baseline`), and works
whether or not anyone uses planning.

With the layout in place, the next question is how the stable half stays true.
See the companion article,
[Code-Anchored Context: Keeping Reference In Sync](code-anchored-context-reference-sync.md),
and then
[Code-Anchored Context: Markdown For Work, HTML For People](code-anchored-context-formats.md)
for what format the context should live in.
