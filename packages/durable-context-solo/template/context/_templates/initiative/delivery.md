# Delivery

Use this file for CI/CD, build, release, and environment-promotion behavior.
Name the concern, not the tool. Pipeline definitions, workflow files,
deployment scripts, release toggles, and gates can all appear here when
relevant.

Start from `context/project-profile.md` for repo-wide delivery defaults.
Capture only initiative-specific pipeline, build, deployment, artifact, or
release changes here.

## Pipeline Impact

Describe pipeline, workflow, build, packaging, or artifact changes.

## Build And Release Gates

List checks that must pass before merge, deployment, promotion, or release.

| Gate | Applies to | Notes |
| --- | --- | --- |
| TBD | TBD | TBD |

## Deployment Flow

Describe deployment order, environment promotion, release windows, approvals,
and any sequencing constraints.

## Feature Flags And Toggles

List release flags, kill switches, configuration toggles, or staged rollout
controls.

## Delivery Automation

Capture scripts, commands, CLIs, jobs, or approved automation integrations
that agents or engineers can use to act on delivery.

> Reminder: reference secrets by name. Never embed tokens, credentials, or
> connection strings in commands or scripts captured here.

## Rollout Notes

Describe staged rollout, canary behavior, compatibility windows, or release
coordination.
