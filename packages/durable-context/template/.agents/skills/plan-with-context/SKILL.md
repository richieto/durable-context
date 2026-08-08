---
name: plan-with-context
description: Draft or refine a durable initiative plan grounded in repository evidence and the full change surface. Use ONLY when the human explicitly invokes plan-with-context or durable-context routes a named initiative through Planning; do not trigger for ordinary planning or small tasks.
---

# Plan With Context

Draft `plan.md` for a named initiative. Prefer `durable-context` unless the
human intentionally enters Planning directly.

## Start

1. Read the nearest `AGENTS.md`, `context/project-profile.md` when present, and
   relevant accepted and initiative-local decisions.
2. Require an initiative name; never infer it from the branch. For work that
   remains small, recommend native agent planning and create no initiative
   unless the human explicitly opts in.
3. For a new initiative, create only `README.md` and `plan.md`. Prefer a
   project-owned template whose README has lifecycle markers; otherwise use the
   managed `durable-context` skill assets. Do not copy the whole initiative
   template directory or overwrite project-owned templates.
4. If the README lacks lifecycle markers, continue the legacy workflow without
   inserting or migrating lifecycle state.

## Plan

1. Use the agent's native planning capability and ground claims in repository
   evidence. Do not guess.
2. Settle the goal, success criteria, audience, in/out scope, constraints,
   options, trade-offs, and open questions with the human.
3. Cover or disposition the applicable change surface: application code,
   tests/e2e, interfaces, data/security, IaC, CI/CD, configuration, operations,
   rollback, project-profile impact, ADR impact, and reference/release impact.
4. Consider an ADR only for architecturally significant choices crossing
   boundaries, having credible alternatives, or being costly to reverse.
5. Keep settled planning truth in `plan.md`; do not create concern documents
   until artifact routing is confirmed during `dive-into-plan`.

## Handoff

For lifecycle-managed work, checkpoint at the Planning boundary and return
control. The human may use the advisory `devils-advocate` review or proceed to
Detailed Design through `durable-context`.
