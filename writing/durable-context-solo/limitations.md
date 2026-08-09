# Durable Context Solo: Limitations And Feedback Questions

`durable-context-solo` reduces coordination ceremony; it does not make durable
planning free. The owner still has to review agent-generated context, resolve
unknowns, keep evidence current, and decide which conclusions deserve durable
history.

## When Not To Use It

- Use native agent planning for small, contained changes.
- Do not use it when repository churn makes every profile observation stale.
- Use the collaborative `durable-context` edition when several humans need
  explicit review conclusions, blocking dependencies, hand-offs, or PR
  readiness state.
- Do not use either edition as a substitute for issue tracking, operations
  systems, or secrets management.

## Known Trade-Offs

The concern inventory saves repeated discovery but can become stale. Evidence
and refresh triggers matter more than the label itself. A false `Absent` is
particularly dangerous because later plans may skip an existing surface.

Evaluating every applicable concern costs more than allowing each agent to
guess what matters. The intended saving is across initiatives: discover stable
project capabilities once, then make bounded impact judgments. If teams find
that the inventory produces ceremonial `No impact` entries, its default concern
set or evidence rules may need adjustment.

Focused documents protect attention but can over-fragment tightly coupled work.
The plan must remain an integration map, and synthesis is required after the
individual passes. The user, not the template, decides whether a material topic
deserves its own document.

The lightweight resume marker is intentionally not a state machine. It can be
out of date and cannot prevent skipped reasoning. If solo users consistently
need stronger validation, selected lifecycle checks could be added without
importing multi-user approval semantics.

Backfill is evidentiary reconstruction, not time travel. Branch history can
establish implementation facts but often leaves intent and discarded options
unknown. Those gaps should remain visible until the owner confirms them.

## Questions To Revisit After Adoption

- Is the default concern vocabulary broad enough without becoming noise?
- Does `Present` / `External` / `Absent` remain understandable in repositories
  where responsibilities are split across several systems?
- Are five initiative impact values useful, or do users consistently collapse
  some of them?
- Does the resume marker provide enough continuity without phase tracking?
- Do focused documents improve agent reasoning with current models, and at what
  initiative size does the benefit appear?
- Should common repository shapes supply optional concern-profile presets?
- Does direct ADR creation preserve enough deliberation history for solo users?
- Is mutual exclusion between editions clear, and is a documented migration
  path eventually needed?

These are design hypotheses, not promises that the first release has found the
only correct boundary. The package should evolve from observed adoption while
preserving its core ownership rule: reasoning that must survive the agent stays
with the code.
