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
- Deduplicate release-note signals describing the same observable behavior,
  but retain every evidence pointer. Surface conflicts between source, tests,
  configuration, and IaC instead of choosing an interpretation silently.
- Extend and correct existing pages. Do not wipe project reference material.

## Workflow

1. Resolve base and target tags from the request and release index. Ask only
   when the range is ambiguous.
2. Read each affected area's authoring guide and scope the source diff:

   ```bash
   git diff --name-status <base>..<target> -- <area-source-paths>
   ```

3. Read relevant optional release notes and accepted decisions. Normalize
   duplicate behavior signals into one candidate while retaining all evidence,
   then verify material claims against the diff, source, tests, configuration,
   or IaC. Mark unresolved disagreement as `Conflicting`.
4. Before editing a refresh that affects more than one reference area, present
   a transient impact map:

   | Area or page | Evidence | Proposed action | State |
   | --- | --- | --- | --- |
   | `Area/features/example.md` | Source, test, config, or IaC paths | `Update`, `Create`, `No change`, or `Investigate` | `Verified`, `Uncertain`, or `Conflicting` |

   This map is informational and is not written to the repository. Continue
   with verified work without requesting approval. Pause only when uncertain
   or conflicting evidence materially changes what should be documented.
5. Update area summaries and feature pages for observable behavior changes.
   Ignore formatting, lint, internal refactors, test-only changes, and
   dependency bumps with no behavior impact.
6. Append or update the target row in `REFERENCE_ROOT/releases/index.md`.
7. Run `git diff --check`, inspect the changed paths, and run any validation
   commands named in the project overlay.

## Single-Page Or Fix Requests

Make the smallest source-backed edit that fulfills the request; a tag-range
sweep is unnecessary unless the human requested one.

## Done When

- The resolved tag range and materially affected areas are reported.
- Multi-area refreshes reported the impact map before edits, without
  persisting it or adding an approval gate.
- Updated pages describe accepted behavior in reader-facing language.
- Conflicting evidence is resolved or reported without being presented as
  accepted behavior.
- The release index and validation results are included in the final summary.
