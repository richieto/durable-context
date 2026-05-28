# Programs

Programs preserve durable context for work that spans releases or phases.

Use a program when an effort has:

- a roadmap across releases
- several release slices
- decisions that outlive one release
- planned future work that should remain visible
- context that would be lost if it lived only in one release initiative

Create programs from `Development/_templates/program/`.

## Planned Initiatives

Use `planned-initiatives/` inside a program when future work is clear enough
to scope, split, or preserve implementation intent, but the target release is
not current yet.

When a planned initiative's target release becomes current, promote it into
`Development/releases/<version>/initiatives/` and leave the planned initiative
behind as historical planning context.

## Current Programs

- None yet.
