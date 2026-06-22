---
name: plan-with-context
description: Draft a durable plan in an initiative plan.md covering the full change surface. Use ONLY when the human explicitly invokes it ("plan with context", "plan with durable context", "durable plan"). Do not trigger for ordinary planning or small tasks.
---

# Plan With Context

Invocation-only. Produces `plan.md` for a later `dive-into-plan` pass.

## Workflow

1. Read nearest `AGENTS.md` and `context/project-profile.md` when it exists.
2. Find or create `context/initiatives/<slug>/` (copy `context/_templates/initiative/`). Update `README.md`, then work in `plan.md`. Skip initiatives for tiny fixes.
3. Draft in `plan.md`: alignment, options, open questions. For each applicable surface, plan the work or mark N/A with reason:
   - Application code · unit/integration tests · e2e · IaC · CI/CD · config/secrets (names only) · observability/rollback · security/data · reference impact
4. Ground items in real repo tooling (profile or direct inspection). Do not guess.
5. For architectural decisions, consult `decisions/README.md`, relevant `decisions/indexes/`, and local `context/**/decisions/` when present. Use metadata such as Area, Scope, Tags, and supersession links to avoid loading every ADR.
6. Iterate with the human until direction is settled. Do not distribute yet.

## ADR Guidance

Consider an ADR only when a decision is architecturally significant: it crosses
team boundaries, has multiple credible options, or is costly to reverse.
Routine technical choices belong in `plan.md`, specs, or notes.

## Handoff

When a recommendation is ready, invoke `devils-advocate` if the human wants a
challenge pass. When settled, invoke `dive-into-plan`.

## Done when

- Initiative exists (or reason given why not).
- `plan.md` covers every applicable surface.
- Existing accepted and local ADRs were consulted where relevant.
- Open questions visible; settled truth not frozen in `plan.md` alone.
