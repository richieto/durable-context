# Code-Anchored Context Template

This repository is a reusable starting point for keeping repository-local
working context and release-anchored reference close to the
code they describe.

It separates two kinds of truth:

| Folder | Meaning | Updated when |
| --- | --- | --- |
| `context/` | What the team is planning, building, deciding, validating, shipping, hosting, deferring, and learning, plus optional repo-wide operating facts in `project-profile.md`. | During normal development. |
| `reference/` | What the system does as of a known release or explicit baseline. | Only during explicit reference refresh work. |

The goal is to give humans and AI agents enough structured context to change a
codebase without relying on chat history, tribal memory, or scattered planning
notes.

## What This Template Contains

- `AGENTS.md` with repo-wide agent guidance.
- `.agents/skills/code-anchored-context/SKILL.md` for the recurring
  working-context workflow.
- `context/` with terminology, release context, backlog/program structure,
  a repo-wide project profile starter, initiative templates, and
  release-documentation notes.
- `reference/` with a generic release-anchored reference workflow,
  authoring guide structure, and area/page templates.

## Adopting This In A Project

The quickest path is the npm initializer:

```bash
npx code-anchored-context init \
  --project-name "My Project" \
  --release v0_1_0
```

Useful options:

```bash
npx code-anchored-context init --dry-run
npx code-anchored-context init --no-reference
npx code-anchored-context init --target ../existing-project
```

The initializer copies the repo-local agent context into the target project,
adds or updates guidance in `AGENTS.md`, installs the
`code-anchored-context` skill under `.agents/skills/`, and replaces
basic placeholders such as `PROJECT_NAME` and the initial release slug.

Manual adoption still works:

1. Copy the files into a repository root.
2. Replace `PROJECT_NAME` placeholders with the project name.
3. Set the first active release in `context/current.md`.
4. Add or revise area-specific `AGENTS.md` files so they point back to
   `context/` and `reference/_authoring/`.
5. If you want a repo operating profile, ask an agent to populate
   `context/project-profile.md` from source files, manifests, CI/CD,
   infrastructure, test config, and observability tooling.
6. Create `reference/_authoring/areas/<area>.md` for each referenced
   product or code area.
7. Keep product or domain-specific reference content out of this template repo.

## Publishing The Package

From this repository:

```bash
npm test
npm pack --dry-run
npm publish --access public
```

If the unscoped package name is unavailable, rename the package in
`package.json`, for example to `@your-scope/code-anchored-context`, then use:

```bash
npx @your-scope/code-anchored-context init
```

## Working Rule

Working context can evolve with the branch. Reference material should
stay stable and release-accurate. When behavior changes during development,
record future reference impact in the relevant initiative's
`release-doc-notes.md`; refresh `reference/` only when that work is
explicitly requested.
