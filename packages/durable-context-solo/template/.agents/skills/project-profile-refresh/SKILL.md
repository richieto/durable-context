---
name: project-profile-refresh
description: Refresh stable Solo project-profile facts and the concern inventory when repository capabilities or their evidence change. Use ONLY when the human explicitly invokes project-profile-refresh or durable-context-solo detects a recorded refresh trigger; do not rescan the repository for every initiative.
---

# Project Profile Refresh

Update stable facts selectively. Prefer `durable-context-solo` unless the human
intentionally enters profile maintenance directly.

## Workflow

1. Read the nearest `AGENTS.md`, current profile, and the change that triggered
   refresh.
2. Inspect only affected evidence paths and directly related manifests,
   commands, CI/CD, IaC, operations, generated artifacts, or documentation
   boundaries. Expand the scan only when evidence is missing or contradictory.
3. Update Concern Inventory presence and evidence when a capability was added,
   removed, externalized, or made uncertain.
4. Update stable commands and operating facts that actually changed. Preserve
   useful existing facts and explicit unknowns.
5. Do not copy initiative-specific decisions or transient scaffolding into the
   profile.

Done when the profile again supports concern evaluation without routine
repository rediscovery.
