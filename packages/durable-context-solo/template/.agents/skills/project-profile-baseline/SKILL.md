---
name: project-profile-baseline
description: Populate context/project-profile.md from source-backed repository facts. Use ONLY when the human explicitly asks to run the project profile, create a project profile, or establish a repository operating baseline.
---

# Project Profile Baseline

Invocation-only. Populate `context/project-profile.md` with stable repo-wide
operating facts.

## Workflow

1. Read nearest `AGENTS.md`, `context/README.md`, and existing `context/project-profile.md`.
2. Inspect source-backed facts: manifests, lockfiles, runtime files, package scripts, test config, CI/CD, deploy scripts, IaC, observability config, generated-artifact owners, and documentation boundaries.
3. Record repository shape, stack/runtime, commands, verification, delivery, infrastructure/configuration, operations, generated artifacts, docs boundaries, and known unknowns.
4. Cite source paths where useful. Mark unknowns explicitly. Do not invent hidden commands or external pipeline behavior.
5. Keep initiative-specific details out of the profile.

## Done When

- `context/project-profile.md` is populated from source-backed facts.
- Unknowns and external assumptions are explicit.
- Future agents can choose default commands and verification layers without rediscovering the repo.
