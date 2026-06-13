# Backlog

## Status Legend

- `Todo` · `In Progress` · `Blocked` · `Done` · `Deferred`

## Work Items

| Status | Item | Area | Notes |
| --- | --- | --- | --- |
| Todo | `git mv packages/planning` → `packages/durable-context` | packaging | Preserve history |
| Todo | `git mv packages/reference` → `packages/reference-docs` | packaging | Preserve history |
| Todo | Update root `AGENTS.md` paths after rename | docs | Immediate after mv |
| Todo | durable-context branding pass | packaging | package.json, bin, markers, metadata, README |
| Todo | reference-docs branding pass | packaging | same |
| Todo | Run `npm test --workspaces` after branding | testing | Gate |
| Todo | Rename skill `grill-and-distribute` → `dive-into-plan` | skills | Confirmed |
| Todo | Compress durable-context skills + templates | skills | Templates carry structure; skills stay precise |
| Todo | Sync dogfood `context/` from package template | templates | After template review |
| Todo | Compress reference-docs skills + `_authoring/workflow.md` | skills | Dedupe; templates/skills division |
| Todo | Run `npm test --workspaces` after compression | testing | Gate |
| Todo | Update root README + root package.json | docs | Retire umbrella |
| Todo | Update `writing/` for maintainer docs only | writing | Not in install payload; name/link alignment |
| Todo | Promote decisions 0004 and 0005 | decisions | Update index |
| Todo | Update `decisions/README.md` intro branding | decisions | Drop umbrella name |
| Todo | Human: create npm packages + publish 1.0.0 | delivery | Out of repo |

## Skill review notes (optional)

Use this section during the pass if a file needed heavy cuts — not a line budget.

| File | Notes |
| --- | --- |
| dive-into-plan/SKILL.md (was grill-and-distribute) | Rename + dedupe vs templates |
| plan-with-context/SKILL.md | |
| reference-from-tags/SKILL.md | |
| reference-baseline/SKILL.md | |
| reference/_authoring/workflow.md | |

## Deferred

| Item | Reason |
| --- | --- |
| GitHub repo slug rename | Human will do later |
| CI workflows | No CI in repo today |
| `disable-model-invocation` on all skills | Optional follow-up |
| Automated skill line-count script | Out of scope for 1.0.0 |
| npm deprecate old scoped names | Never published |
