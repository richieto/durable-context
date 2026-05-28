# vNEXT Development Context

This folder contains development context for the `vNEXT` release.

## Navigation

- `backlog.md` tracks release-level work that has not yet been moved into
  an initiative or that summarizes initiative progress.
- `initiatives/` contains initiative folders.

## Initiative Rule

Create an initiative when work is non-trivial, behavior-changing,
cross-project, release-significant, or likely to need future product
documentation.

Use `Development/_templates/initiative/` as the starting point.

## Carry-Forward Rule

If an initiative is part of a larger phased effort, link it to a program
under `Development/programs/`.

If isolated work is cut from scope but should be kept for later, create a
backlog item under `Development/backlog/items/` and link it back to the
originating initiative.

## Planned Initiative Promotion

When this release becomes current, promote matching planned initiatives from
`Development/programs/*/planned-initiatives/` into this release's
`initiatives/` folder. Leave the planned initiative in place as historical
planning context and update its status to `Promoted`.
