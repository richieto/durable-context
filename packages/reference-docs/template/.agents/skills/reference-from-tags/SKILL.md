---
name: reference-from-tags
description: Refresh REFERENCE_ROOT/ from a release-tag diff, update a requested reference page, or fix a demonstrable documentation error. Use ONLY when the human explicitly requests that documentation work. Do not trigger during feature work or refactors.
---

# Reference From Tags

Documentation only. Do not change executable behavior.

## Invariants

- Read the nearest `AGENTS.md`, `REFERENCE_ROOT/_authoring/workflow.md`, the
  optional `REFERENCE_ROOT/_authoring/project.md`, relevant area guides, and
  `REFERENCE_ROOT/releases/index.md` first.
- The resolved tag diff is the source of truth. Existing documentation,
  `context/**/release-doc-notes.md`, `context/project-profile.md`, and accepted
  records under `decisions/` are optional hints that must be verified.
- Extend and correct existing pages. Do not wipe project reference material.

## Workflow

1. Resolve base and target tags from the request and release index. Ask only
   when the range is ambiguous.
2. Read each affected area's authoring guide and scope the source diff:

   ```bash
   git diff --name-status <base>..<target> -- <area-source-paths>
   ```

3. Read relevant optional release notes and accepted decisions, then verify
   material claims against the diff, source, tests, configuration, or IaC.
4. Update area summaries and feature pages for observable behavior changes.
   Ignore formatting, lint, internal refactors, test-only changes, and
   dependency bumps with no behavior impact.
5. Append or update the target row in `REFERENCE_ROOT/releases/index.md`.
6. Run `git diff --check`, inspect the changed paths, and run any validation
   commands named in the project overlay.

## Single-Page Or Fix Requests

Make the smallest source-backed edit that fulfills the request; a tag-range
sweep is unnecessary unless the human requested one.

## Done When

- The resolved tag range and materially affected areas are reported.
- Updated pages describe accepted behavior in reader-facing language.
- The release index and validation results are included in the final summary.
