---
name: dive-into-plan
description: Interrogate each Material Solo concern in a separate focused pass, distribute settled truth into project-owned documents, and synthesize cross-concern consistency before implementation. Use ONLY when the human explicitly invokes dive-into-plan, distribute the plan, or durable-context-solo routes a settled plan into focused analysis.
---

# Dive Into Plan

Protect reasoning focus by working one concern at a time. Prefer
`durable-context-solo` unless the human intentionally enters this pass.

## Workflow

1. Resolve an explicit cycle or the project profile's Current cycle, using
   `default` when an upgraded profile has no cycle section. Treat a flat
   pre-cycle folder as the fallback for `default/<slug>` without moving it.
2. Read the named initiative README and plan, project profile, relevant accepted
   decisions, and project-owned concern templates.
3. Confirm that every profiled concern has Material, No impact, External, or
   Introduced disposition. Return TBD and unexplained Unknown entries to
   planning.
4. For each Material or Introduced concern, create its focused document and
   interrogate it separately: behavior, interface, architecture/data, testing,
   delivery, infrastructure/configuration, operations, backlog, or release-doc
   impact. Ground conclusions in repository evidence.
5. For No impact, preserve the concise reason in the README. For External,
   record the stable destination and the local implication without inventing
   external completion.
6. Link focus documents from README and `plan.md`. Keep settled details in the
   owning document rather than duplicating them across every file.
7. Perform a synthesis pass across all selected documents. Resolve conflicting
   assumptions, sequencing, contracts, failure behavior, verification gaps,
   and implementation dependencies.
8. Keep unsettled architectural options in planning. Once the human accepts an
   architecturally significant decision that is implemented or ready to govern
   the work, record it directly as the next self-contained root ADR and update
   indexes. Do not require an initiative-local ADR staging directory.
9. Update the resume block with the next concrete action.

Do not create empty N/A files, ownership routing, review gates, or PR-readiness
state. Do not edit shipped-behavior reference docs during feature work; capture
their impact locally or at the external destination.
