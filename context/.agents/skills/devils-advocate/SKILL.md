---
name: devils-advocate
description: Critique-only adversarial review of plan-with-context plans. Use ONLY when the human explicitly asks for "devil's advocate", "challenge the plan", "red-team the plan", or adversarial planning review before dive-into-plan; rerun after dive-into-plan only when a materially new decision appears.
---

# Devil's Advocate

Invocation-only. Challenge a draft plan before it hardens. Do not edit files
unless the human explicitly asks for changes.

## Workflow

1. Read the initiative `README.md`, `plan.md`, nearest `AGENTS.md`, and `context/project-profile.md` when useful.
2. Identify the commitment being challenged: recommendation, approach, or decision.
3. If there is no meaningful decision, or the current plan is the best clear alternative, say so briefly and stop.
4. Otherwise give a concise adversarial pass:
   - strongest objection
   - hidden assumption
   - non-obvious failure mode
   - cheaper, simpler, or more reversible alternative
   - required plan adjustment, open question, or explicit accept-risk decision

## Output

```markdown
## Decision
[What commitment is being challenged.]

## Challenge
- **Strongest objection:** ...
- **Hidden assumption:** ...
- **Non-obvious failure mode:** ...
- **Alternative:** ...
- **Plan impact:** ...
```

When there is no material challenge, use:

```markdown
## Decision
[What was reviewed.]

## Challenge
No material challenge. The current plan appears to be the best available option because ...
```
