# Agent Guidance - context/

Scope: everything under `/context`.

## Purpose

This folder is the working bench for this repository: the live planning and
implementation context for work in progress. It is disposable by design.
Initiatives accumulate here while active and can be archived once their durable
conclusions have been distilled out.

The two things that persist are the append-only decision log under
[`../decisions/`](../decisions/) and, for projects that use it, release-anchored
behavior under `reference/`.

## Editing Rules

- Keep one folder per piece of work under `context/initiatives/<slug>/`. There
  are no release folders, programs, or promotion machinery in this model.
- Start a new initiative by copying `context/_templates/initiative/`.
- Use `plan.md` as the messy alignment space, but do not let settled truth live
  only there. Promote it into the per-concern docs (`spec.md`, `interface.md`,
  `architecture.md`, `testing.md`, `delivery.md`, `infrastructure.md`,
  `operations.md`, `backlog.md`) and into `release-doc-notes.md`.
- Promote accepted architecture and design decisions into the repo-wide
  `decisions/` log only when they cross the ADR threshold. Routine choices
  belong in initiative notes, specs, plans, or code review.
- Use `project-profile.md` for stable repo-wide operating facts (stack,
  commands, test layers, CI/CD, infrastructure, observability).
- Do not edit `reference/` from working context. Capture future reference impact
  in an initiative's `release-doc-notes.md`.

Consider these rules if they affect your changes.
