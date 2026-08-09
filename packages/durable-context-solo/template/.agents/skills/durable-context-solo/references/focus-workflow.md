# Profile-Driven Focus Workflow

## Use The Profile Instead Of Rediscovery

Treat `context/project-profile.md` as the source-backed inventory of stable
repository capabilities. For each meaningful initiative:

1. Evaluate every concern marked Present or External.
2. Evaluate Absent concerns only for whether the initiative introduces them.
3. Resolve Unknown profile facts before relying on them.
4. Inspect profile evidence paths selectively when the current diff touches
   them or they appear stale; do not rescan the whole repository by default.

Use these initiative impacts:

- `Material` — the concern has independent questions or consequences; create or
  update its focused document.
- `No impact` — record a concise, evidence-backed reason.
- `External` — record the stable destination and the local implication.
- `Introduced` — treat as Material and refresh the project profile.
- `TBD` — planning is incomplete; do not begin implementation.

## Preserve Focus

Interrogate one Material concern at a time. Keep `plan.md` as the integration
map: goal, scope, recommendation, cross-cutting constraints, concern
dispositions, links, and unresolved contradictions. Move settled detailed truth
to the focused document that owns it.

After individual passes, perform a synthesis pass across behavior, interface,
architecture, testing, delivery, infrastructure, operations, and release-doc
impact. Resolve contradictions and sequencing dependencies before coding.

Do not use document length as the only signal. A short plan can still hide
several independent topics, while a long narrative may describe only one.
