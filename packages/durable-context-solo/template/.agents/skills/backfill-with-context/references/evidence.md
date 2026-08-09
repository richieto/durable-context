# Backfill Evidence Rules

- `Observed`: proven by source, configuration, tests, commands, diffs, or
  history. Cite the evidence.
- `Human-confirmed`: intent or trade-offs the human confirms now. Attribute the
  confirmation and date.
- `Inferred`: a plausible interpretation that still needs confirmation.
- `Unknown`: unavailable or contradictory evidence.

Code establishes what changed, not why. User-provided session summaries become
attributed evidence; unavailable session history remains Unknown.
