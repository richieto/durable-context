# Operations

Use this file only when the initiative has actionable runtime, support,
observability, rollback, or repair implications.

If there is nothing concrete for an agent or engineer to act on, omit this
file after copying the template or mark it as not applicable. Delivery belongs
in `delivery.md`; environment shape and IaC belong in `infrastructure.md`.

Start from `context/project-profile.md` for repo-wide observability, support,
rollback, and repair entry points. Capture only initiative-specific actionable
runtime or support changes here.

## Runtime Behavior

Describe how the live system behaves after the initiative ships, especially
jobs, schedules, queues, topics, subscriptions, retries, degraded modes, or
runtime compatibility constraints.

## Observability And Support Signals

Capture logs, metrics, traces, dashboards, alerts, health checks, support
signals, and customer-visible symptoms.

## Failure Modes

Describe expected failures, retries, poison-message behavior, timeouts,
partial outages, degraded modes, and support signals.

## Rollback And Recovery

Describe how to recover from bad runtime behavior. Include whether rollback is
safe, whether roll-forward is required, and what state must be repaired.

## Data Operations And Repair

Capture migrations, backfills, cleanups, retention, repair scripts, manual
support procedures, and validation queries.

> Reminder: redact secrets, connection strings, and personal data from any
> logs, queries, or procedures recorded here.

## Actionable Tooling

List CLIs, scripts, dashboards-as-code, alerts-as-code, or other approved
automation integrations that agents or engineers can use. If none exists, say
so explicitly.
