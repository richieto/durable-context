# Lifecycle Routing

Use the canonical lifecycle fields and validation rules documented by
`../../checkpoint-context/references/lifecycle.md`. Read that file before creating
or changing lifecycle-managed context.

## Phase boundaries

- **Planning** ends when direction is settled enough to review.
- **Plan Review** may be completed or skipped. A recorded material challenge
  blocks only the phases named by that challenge.
- **Detailed Design** ends when applicable concerns have confirmed routes and
  settled local truth has been distributed.
- **Implementation** ends when the scoped code and artifact changes are done.
- **Verification** ends when applicable checks ran and gaps were dispositioned.
- **PR Preparation** ends when the PR snapshot is internally consistent,
  blocking challenges are resolved, follow-ups are completed, transferred, or
  transfer-waived, and durable decisions are self-contained.

At a major phase boundary, checkpoint and return control to the human instead
of silently entering the next commitment.
