# Plan

## Current Alignment

Retire the legacy **Code-Anchored Context** umbrella completely. Ship two
independently branded **unscoped** npm packages from one monorepo:

| Today | Target (settled) |
| --- | --- |
| `@code-anchored-context/planning` in `packages/planning/` | `durable-context` in `packages/durable-context/` |
| `@code-anchored-context/reference` in `packages/reference/` | `reference-docs` in `packages/reference-docs/` |
| CLI `code-anchored-context-planning` | CLI `durable-context` |
| CLI `code-anchored-context-reference` | CLI `reference-docs` |
| Metadata `.code-anchored-context/planning.json` | `.durable-context/install.json` |
| Metadata `.code-anchored-context/reference.json` | `.reference-docs/install.json` |
| AGENTS marker `code-anchored-context:planning:*` | `durable-context:*` |
| AGENTS marker `code-anchored-context:reference:*` | `reference-docs:*` |

**Settled product decisions**

| # | Decision |
| --- | --- |
| 1 | **npm:** unscoped `durable-context` and `reference-docs` (no `@org/` prefix) |
| 2 | **CLI bin names:** `durable-context` and `reference-docs` (match package names; see note below) |
| 3 | **Metadata:** per-package dotdirs `.durable-context/` and `.reference-docs/` |
| 4 | **Umbrella brand:** retire "Code-Anchored Context" everywhere in shipped artifacts and writing |
| 5 | **Writing folder:** rename `writing/code-anchored-docs/` → `writing/reference-docs/` |
| 6 | **GitHub repo slug:** human renames later; does not block this work |
| 7 | **Migration:** clean break; no early adopters; no upgrade guide |
| 8 | **Version:** ship **1.0.0** under new names |
| 9 | **Footprint policy:** skills stay precise and minimally verbose; templates hold structure so skills do not repeat boilerplate (see Context-Window Footprint Principle) |
| 11 | **Skill rename:** `grill-and-distribute` → **`dive-into-plan`** (confirmed) |
| 10 | **Dogfood:** sync root `context/_templates/` (and related scaffold) from package templates during this initiative |

**What stays the same**

- Monorepo with npm workspaces (`packages/*`).
- Installed scaffold paths in adopter repos: `context/`, `decisions/`,
  `reference/`.
- Skill names: `plan-with-context`, **`dive-into-plan`** (renamed from
  `grill-and-distribute`), `reference-from-tags`, `reference-baseline`.
- Invocation-only behavior, idempotent `init`, shared per-package installer
  pattern, and coexistence of both packages in one adopter repo.
- Flat working-context model and append-only `decisions/` log (decisions 0002,
  0003).

**Monorepo vs two repositories**

Recommendation: **keep the monorepo**.

| Factor | Monorepo | Two repos |
| --- | --- | --- |
| Shared `writing/` narrative | One tree, cross-linked | Duplicate or extract to a third repo |
| Decision history | Preserved in place | Split or lose continuity |
| Installer duplication | Already accepted per package | Still duplicated |
| Release cadence | Independent per package either way | Same |
| CI / publish | One workspace, two `npm publish --workspace` | Two pipelines |
| Coupling | Packages are already independent at install time | No meaningful decoupling gain |

There is no strong technical reason to split. The packages are independent for
adopters already; the monorepo is an authoring convenience.

## Working Notes

- `writing/` already uses **Durable Context** and **Code-Anchored Docs** as
  narrative brands. Aligning npm with `durable-context` and `reference-docs`
  means renaming the `writing/code-anchored-docs/` folder to
  `writing/reference-docs/` and updating cross-links.
- Packages are at **0.1.0** with no published migration path documented yet.
  A clean break on markers and metadata is acceptable if called out in release
  notes; a `migrate` command is optional and likely not worth the scope at this
  stage.
- The root private package is still named `code-anchored-context-monorepo`; it
  should be renamed to something neutral (proposed: `durable-context-monorepo`
  or simply reflect the GitHub repo name once decided).
- **Context-window footprint** is a first-class constraint for this initiative,
  not a polish pass. Skills load when invoked; templates and `AGENTS.md` sections
  may load repeatedly during normal agent work. Both must stay as short as
  possible while remaining accurate and actionable.

## Context-Window Footprint Principle

Everything the installer copies into an adopter repo should earn its tokens.
There is **no line-count target**. A skill is the right size when it states
what to do precisely and nothing more. Templates carry the rest.

**Division of labor (installed product only)**

| Layer | In adopter repo? | Role | Verbosity |
| --- | --- | --- | --- |
| **Skills** | Yes (`.agents/skills/`) | Invoked workflow: steps, boundaries, where to write | Minimal — procedural only |
| **Templates** | Yes (`context/`, `reference/`, etc.) | File shape: section headers, one-line intent | Stubby — forms, not essays |
| **Package README** | No — npm registry / package root only | Install and use summary | Short; not copied by `init` |

**`writing/` is not part of the product.** It lives only in this monorepo for
the maintainer to elaborate on *why* these practices exist. Installers never
copy, reference, or depend on it. Adopters never see it. Do not tell skills to
"move rationale to `writing/`" — cut non-operational prose from shipped
artifacts instead; `writing/` is unrelated to install behavior.

Templates are the main lever for keeping skills short. If a checklist or doc
shape belongs in every initiative, it lives in installed
`context/_templates/initiative/` (or reference equivalents), and the skill
says "promote into `spec.md`" rather than re-listing what each file contains.

| Asset | When it hits context | Priority |
| --- | --- | --- |
| Agent skills (`SKILL.md`) | On explicit invocation | High — precise workflow only |
| Root `AGENTS.md` marker section | Often, on every task | High — pointers to skills; no duplication |
| Initiative templates | When starting or distributing work | Medium — structure, not repeated skill prose |
| `context/project-profile.md` | During planning skills | Medium — sparse facts only |
| Reference `_authoring/` guides | During reference skills | Medium–high — procedural; deduped vs skills |

**Review rules**

1. **One job per file** — skills = do; templates = shape. Non-operational prose
   is cut from shipped artifacts, not relocated.
2. **Every sentence earns its place** — if removing it does not change agent
   behavior, cut it.
3. **No redundant lists** — change-surface checklist in `plan-with-context`;
   per-concern file purposes in templates; do not repeat both in every file.
4. **Progressive disclosure** — skills link to templates and `_authoring/` for
   detail the agent reads when that step runs.
5. **Accurate and current** — trim stale naming and retired concepts while editing.

Baseline inventory (pre-rebrand paths; for review scope only, not line targets):

| File | Lines | Review focus |
| --- | ---: | --- |
| `reference-baseline/SKILL.md` | 192 | Dedupe vs `workflow.md` |
| `grill-and-distribute/SKILL.md` | 118 | Rename + compress |
| `plan-with-context/SKILL.md` | 105 | Point to templates for doc shapes |
| `reference-from-tags/SKILL.md` | 99 | Procedural steps only |
| `reference/_authoring/workflow.md` | 221 | Dedupe vs skills |
| `context/project-profile.md` | 133 | Sparse tables; cut instructional prose |
| `context/_templates/initiative/plan.md` | 68 | Stub; link to `plan-with-context` for checklist |

## Skill Rename

Replace **`grill-and-distribute`** with **`dive-into-plan`** (confirmed).

Pairs with `plan-with-context`: draft plan → dive into gaps and promote into
durable docs.

Example invocation: *"Dive into the plan."*

**Implementation surface**

- Skill directory and `SKILL.md` frontmatter (`name`, `description`, trigger phrases)
- `durable-context` bin `skills` array and `AGENTS.md` template links
- Cross-references in `plan-with-context/SKILL.md`, root `AGENTS.md`, smoke tests,
  and dogfood `.agents/skills/` if present
- Decision 0003 is not rewritten; new name recorded in this initiative and 0005

## Change Surface

### Application or runtime code

**1. Rename package directories**

```text
packages/planning/     → packages/durable-context/
packages/reference/    → packages/reference-docs/
```

Use `git mv` so history follows the folders.

**2. Per-package `package.json`**

For each package, update:

- `name` → `durable-context` / `reference-docs` (or scoped name if human
  chooses a scope; see open questions)
- `bin` → `{ "durable-context": "bin/durable-context.js" }` and
  `{ "reference-docs": "bin/reference-docs.js" }`
- `description`, `keywords` — drop "Code-Anchored Context" phrasing; use product
  names

**3. CLI entry points**

Rename and rewrite:

- `bin/code-anchored-context-planning.js` → `bin/durable-context.js`
- `bin/code-anchored-context-reference.js` → `bin/reference-docs.js`

Update each file's `config`:

| Field | durable-context | reference-docs |
| --- | --- | --- |
| `cliName` | `durable-context` | `reference-docs` |
| `metadataPath` | `.durable-context/install.json` | `.reference-docs/install.json` |
| `agents.start` | `<!-- durable-context:start -->` | `<!-- reference-docs:start -->` |
| `agents.end` | `<!-- durable-context:end -->` | `<!-- reference-docs:end -->` |
| `summaryLabel` | keep "Plan With Durable Context" | keep "Release-Anchored Reference" |

**4. Installer library**

`lib/installer.js` in each package: update the header comment ("Generic
installer shared by the Code-Anchored Context packages" → product-neutral
wording). No logic change expected unless metadata path conventions require it.

**5. Agent skills review (durable-context)**

Path: `packages/durable-context/template/.agents/skills/`

For each skill (`plan-with-context`, `dive-into-plan` after rename):

- Keep YAML frontmatter (`name`, `description`) — description is the primary
  routing signal; tighten to one dense sentence.
- Collapse repeated "when to use" / "do not auto-trigger" blocks (state once).
- Replace narrative with numbered workflow steps agents can follow.
- Cut non-operational rationale from skills; do not point adopters at `writing/`
  (monorepo-only; never installed).
- Drop duplicate change-surface enumerations where a pointer to `plan.md`
  structure suffices.
- After edit: re-read invoked path end-to-end; if an agent can complete the
  workflow with less text, cut again.

**6. Agent skills review (reference-docs)**

Path: `packages/reference-docs/template/.agents/skills/`

For each skill (`reference-from-tags`, `reference-baseline`):

- Same compression rules as above.
- `reference-baseline` — highest priority: dedupe vs `workflow.md`; keep
  invariants + steps only
- `reference-from-tags` — ensure tag-resolution and area-guide steps are
  procedural, not explanatory.
- Confirm skills point to `_authoring/workflow.md` for detail rather than
  inlining it.

**7. Template review (durable-context scaffold)**

Paths: `template/context/`, `template/decisions/`, `template/AGENTS.md`

| File / area | Review focus |
| --- | --- |
| `context/README.md` | One-page orientation; dedupe with initiative README agent notes |
| `context/project-profile.md` | Keep sparse-table shape; shorten instructional prose; empty cells stay empty |
| `context/_templates/initiative/plan.md` | Minimal stub: alignment + open questions; link to skill for change-surface checklist |
| `context/_templates/initiative/README.md` | Status, summary, touched areas only; trim "source of truth" boilerplate |
| Per-concern stubs (`spec`, `architecture`, `testing`, …) | Section headers + one-line "what belongs here"; remove duplicate promote-to lists |
| `decisions/0000-template.md`, `decisions/README.md` | Short ADR shape only |

Also sync this repo's dogfood scaffold from the package template (**required**
for this initiative):

- Root `context/_templates/initiative/*` ← `packages/durable-context/template/context/_templates/initiative/*`
- Root `context/project-profile.md` ← package template when structure changes
- Root `context/README.md` ← package template when structure changes
- Root `context/AGENTS.md` is repo-specific; update paths/branding only

Use the package template as canonical; dogfood copies should match after the
template review pass.

**8. Template review (reference-docs scaffold)**

Paths: `template/reference/`, `template/AGENTS.md`

| File / area | Review focus |
| --- | --- |
| `reference/README.md` | Boundary rules in few bullets; pointer to `_authoring/` |
| `reference/_authoring/workflow.md` | Procedural steps; dedupe against skills |
| `reference/_authoring/terminology.md` | Keep minimal; empty starter |
| `reference/_authoring/areas/_template.md` | Area guide stub only |
| `reference/_templates/area/*` | Feature/page stubs; no long examples |
| `reference/releases/index.md` | Table header + one example row at most |

**9. Package templates (branding pass)**

Files under each package's `template/`:

- `template/AGENTS.md` — new marker comments (must match bin config exactly)
- Scan skills and scaffold READMEs for `@code-anchored-context/*`, old CLI
  names, and "Code-Anchored Context" umbrella phrasing; update install examples
  only where they appear

**10. Root repo files**

- `package.json` — update `name`, `description`, `keywords`
- `AGENTS.md` — update package paths, npm names, and skill file paths under
  `packages/durable-context/` and `packages/reference-docs/`
- `README.md` — reframe as two independent products; update quick-start commands,
  mental-model table, and layout diagram

### Skills and template verification

No automated line-count gate today. Manual checklist per edited file:

- [ ] Invoked skill completes its workflow without duplicating template or
  `_authoring/` prose inline
- [ ] New initiative from template is usable with only initiative `README.md` +
  `plan.md` read first
- [ ] No legacy package names, retired concepts, or old skill name
  (`grill-and-distribute`) in shipped templates

Optional follow-up (out of scope unless requested): a small test or script that
warns when any `template/**/SKILL.md` exceeds a line budget.

### Unit and integration tests

Update each package's `tests/smoke.test.js`:

- CLI path under `bin/`
- AGENTS.md marker regexes
- Metadata file path under the new dot-directories
- Temp dir prefixes (`cac-planning-` → `durable-context-`, etc.) — cosmetic but
  aids log reading

Run from root after changes:

```bash
npm test --workspaces
```

### End-to-end tests

**Not applicable.** Smoke tests install into temp directories and assert file
layout; that remains the verification layer.

### Infrastructure as code and environment changes

**Not applicable.** No IaC, hosting, or managed services in this repository.

### CI/CD pipelines and build/release behavior

**No CI workflows exist today** (no `.github/workflows/`). When CI is added
later, workspace names in publish scripts must use the new package names.

Document updated publish commands (human runs npm):

```bash
npm publish --workspace durable-context --access public
npm publish --workspace reference-docs --access public
```

If scoped, adjust accordingly. Deprecate old scoped packages on npm if they
were ever published:

```bash
npm deprecate @code-anchored-context/planning "Renamed to durable-context"
npm deprecate @code-anchored-context/reference "Renamed to reference-docs"
```

### Configuration, feature flags, and secrets

**Not applicable.** No secrets or runtime configuration beyond Node >= 18.

### Observability, rollback, and operational impact

**Not applicable** for a CLI scaffold tool. Rollback for adopters who already
ran the old installer: re-run `init` after the rebrand (updates marker section)
or manually replace AGENTS.md markers and metadata paths. Document this in
package READMEs if any early adopters exist.

### Security, permissions, and data handling

**Not applicable.** Installers only write documentation scaffolding and skill
files into the target repo.

### Reference and release-documentation impact

**`writing/` — monorepo maintainer narrative only (not the product)**

`writing/` explains why this repository and its practices exist. It is **not**
included in npm package `files` for install payloads, **not** copied by
`init`, and **not** visible to adopters. Rebrand work updates it for consistency
with new product names so the maintainer's own docs stay accurate.

| Asset | Change |
| --- | --- |
| `writing/code-anchored-docs/` | Rename to `writing/reference-docs/`; update inbound links |
| `writing/code-anchored-context.html` | Retire; fix brief HTML nav if needed |
| `writing/README.md`, cross-links, npx examples | Align with `durable-context` / `reference-docs` naming |

Installed product docs: package `README.md` (npm), templates, and skills only.

**Decisions**

Add `decisions/0004-rebrand-to-durable-context-and-reference-docs.md`:

- Context: legacy umbrella name no longer matches two independent products
- Decision: new npm names, directory names, CLI names, markers, metadata paths
- Consequences: breaking change for anyone who installed 0.1.0 scoped packages
- Link to this initiative; do not edit 0001 body (historical record)

**Historical initiative**

Mark `context/initiatives/split-planning-reference/` as superseded for naming
only (README status note), or leave as archive — no code changes required there.

## Implementation Order

Suggested sequence to keep the repo testable at each step:

1. **Human confirms** open questions below — **done** (see Settled product
   decisions in Current Alignment).
2. **Rename directories** with `git mv`; fix root `AGENTS.md` paths immediately
   so agents do not point at stale locations.
3. **Branding pass** — package.json, bin scripts, markers, metadata paths,
   READMEs. Run smoke tests after each package.
4. **Skills and templates pass (durable-context)** — rename skill to
   `dive-into-plan` (or confirmed name); compress skills; tighten templates so
   skills stay precise. Sync dogfood `context/_templates/`. Run smoke tests.
5. **Skills and templates pass (reference-docs)** — compress skills; shrink
   `_authoring/workflow.md`; dedupe vs skills. Run smoke tests.
6. **Update root** README and package.json.
7. **Update writing/** — maintainer-only narrative; align names and links (no
   installer behavior).
8. **Add decision 0004** (rebrand + footprint policy).
9. **Human**: npm package creation, publish **1.0.0** as unscoped
   `durable-context` and `reference-docs`.

## Options Considered

| Option | Pros | Cons | Status |
| --- | --- | --- | --- |
| Monorepo (recommended) | Shared writing, one history, simple workspaces | Repo name may feel tied to one product | **Preferred** |
| Two new GitHub repos | Clean per-product identity | Duplicated writing, split history, more publish plumbing | Open — only if human wants separate GitHub presence |
| Keep `@code-anchored-context/*` scope with new package leaf names | Scope continuity | Still carries legacy umbrella brand | Rejected unless human insists |
| Backward-compatible installer (read old markers, write new) | Smoother upgrade | Extra code for ~0 adopters at 0.1.0 | Deferred — document manual re-init instead |
| Rename installed paths (`context/` → something else) | Brand consistency in tree | Breaking for dogfood repo and any adopters; high churn | **Rejected** — scaffold paths are the product contract |

## Grill Record (2026-06-13)

Surfaces interrogated; answers captured from settled alignment and repository
inspection.

| Surface | Outcome |
| --- | --- |
| Unit/integration tests | Update smoke tests for new bin paths, markers, metadata; gate with `npm test --workspaces` |
| E2E | Not applicable — temp-dir install smoke tests remain sufficient |
| IaC / environments | Not applicable |
| CI/CD | Not applicable today; document workspace publish names for when CI exists |
| Config / secrets | Not applicable |
| Observability / ops | Not applicable for CLI scaffolds |
| Security / data | Not applicable — installers write docs/skills only |
| Migration | Clean break; no `@code-anchored-context/*` adopters; no deprecate on npm (never published) |
| Reference / release docs | `writing/` only; see `release-doc-notes.md` |
| Root monorepo `package.json` name | Settle on `durable-context-monorepo` (private, not published) |
| Unscoped publish | `--access public` not required |
| Umbrella HTML links | Must fix brief.html nav when retiring `code-anchored-context.html` |
| `disable-model-invocation` on skills | Deferred — optional follow-up |

No deferred surfaces blocking implementation.

## Open Questions

None — `dive-into-plan` confirmed; `writing/` boundary clarified above.

## Notes To Promote

Distributed via `grill-and-distribute` on 2026-06-13:

- [x] Settled naming table → `architecture.md`, `interface.md`
- [x] Publish commands and version policy → `delivery.md`
- [x] Accepted rebrand → `decisions/0004-...`
- [x] Footprint policy → `decisions/0005-...`
- [x] Executable checklist → `backlog.md`
- [x] Skill/template footprint rules → `architecture.md`
- [x] Review checklist → `testing.md`
- [x] Behavior and acceptance → `spec.md`
