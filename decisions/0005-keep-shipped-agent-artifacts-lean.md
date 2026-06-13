# 0005: Keep shipped agent artifacts lean

Status: Accepted
Date: 2026-06-13

## Context

Skills and templates installed into adopter repos compete for agent context
window space. Skills load on invocation; `AGENTS.md` sections and initiative
templates may load repeatedly. Several shipped files duplicated checklists and
prose across skills, templates, and `_authoring/workflow.md`, inflating token
use without adding behavior.

Industry guidance (Cursor, Anthropic) recommends keeping `SKILL.md` concise and
using progressive disclosure — detail in sibling files loaded only when needed.

## Decision

Apply a **context-footprint policy** to everything copied by the installers:

1. **One job per file** — skills = do; templates = shape. Cut non-operational
   prose from shipped artifacts; do not treat monorepo `writing/` as an offload
   target (adopters never see it).
2. **Precise, not padded** — every sentence must change agent behavior; no
   line-count targets.
3. **Templates offload boilerplate** — doc shapes and section intent live in
   `context/_templates/initiative/` (and reference equivalents); skills link
   to them instead of re-describing each file.
4. **No redundant lists** — change-surface checklist in `plan-with-context`;
   do not repeat across initiative template files.
5. **Progressive disclosure** — skills point to `_authoring/workflow.md` or
   template paths for detail loaded at the relevant step.

The planning closeout skill is renamed from `grill-and-distribute` to
**`dive-into-plan`** (confirmed; see initiative plan).

## Consequences

Positive:

- Lower context load for adopters on every planning or reference session.
- Clearer separation between operational instructions and narrative docs.

Negative or tradeoffs:

- Editors must resist re-expanding templates with helpful prose over time.
- Rationale removed from skills is discarded or lives in monorepo `writing/` for
  maintainers only — not an adopter-facing surface.

## Alternatives Considered

| Alternative | Why not |
| --- | --- |
| Hard line-count targets or CI gates | Wrong metric; precision and template offload matter more |
| Leave verbosity as-is | Conflicts with invocation-only value prop |
| Split every skill into reference.md files now | Premature; trim inline first |

## Origin

- Initiative: `context/initiatives/rebrand-packages/`
- Release tag, PR, or commit: TBD at implementation closeout

## Links

- `context/initiatives/rebrand-packages/architecture.md` (footprint table)
- `context/initiatives/rebrand-packages/testing.md` (manual checklist)
- `decisions/0003-make-planning-skills-invocation-only.md`
