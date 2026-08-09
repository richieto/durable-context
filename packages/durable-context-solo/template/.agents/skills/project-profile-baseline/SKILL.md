---
name: project-profile-baseline
description: Populate the Solo project profile and concern inventory from source-backed repository facts so later initiatives evaluate known capabilities without rediscovering them. Use ONLY when the human explicitly invokes project-profile-baseline or durable-context-solo routes an unprofiled repository to baseline.
---

# Project Profile Baseline

Establish stable repository facts once. Prefer `durable-context-solo` unless the
human intentionally enters profiling directly.

## Workflow

1. Read the nearest `AGENTS.md`, `context/README.md`, and existing profile.
2. Inspect manifests, lockfiles, source roots, public interfaces, test config,
   CI/CD, deploy scripts, IaC/configuration, observability, generated artifacts,
   documentation boundaries, and decision history.
3. Populate every Concern Inventory row as Present, External, Absent, or
   Unknown. Cite evidence paths and preserve the rule that each known concern is
   evaluated for meaningful initiatives.
4. Record repository shape, stack/runtime, commands, verification, delivery,
   infrastructure/configuration, operations, and refresh triggers.
5. Mark unavailable external behavior and unknowns explicitly. Never invent
   hidden commands, pipelines, or operations.
6. Keep initiative-specific facts out of the profile.

Done when future agents can evaluate the full known project surface and choose
targeted source paths and commands without rescanning the repository.
