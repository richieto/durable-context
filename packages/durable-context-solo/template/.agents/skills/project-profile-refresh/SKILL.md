---
name: project-profile-refresh
description: Refresh context/project-profile.md from source-backed repository changes. Use ONLY when the human explicitly asks to update the project profile, refresh the repository baseline, or when a release documentation refresh such as reference-from-tags needs profile-relevant changes checked.
---

# Project Profile Refresh

Invocation-only except as a pre-check during release documentation refreshes.
Update `context/project-profile.md` only for stable repo-wide operating facts.

## Workflow

1. Read nearest `AGENTS.md`, existing `context/project-profile.md`, and `context/current.md` when present.
2. If release tags are known, inspect profile-relevant changes:

```bash
git diff --name-status <base>..<target> -- <profile-relevant-paths>
```

3. Check manifests, lockfiles, runtime files, package scripts, test config, CI/CD, deploy scripts, IaC, observability config, generated artifacts, and documentation boundaries.
4. Update only stable facts that changed. Preserve useful existing context.
5. Do not update the profile for initiative-specific details, transient scaffolding, or unverified guesses.
6. Mark unknowns explicitly and cite source paths where useful.

## Done When

- Stable repo-wide operating facts are current.
- Initiative-specific and speculative details remain out of the profile.
- Documentation refreshes can rely on the profile for source roots, commands, delivery, infrastructure, and generated artifacts.
