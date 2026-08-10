# Release Doc Notes

Use this file to capture reference impact while development is
in progress. At release time, these notes help refresh `reference/`
against the final shipped behavior.

Do not edit `reference/` from normal development work unless a human
explicitly asks for a reference refresh or a specific reference fix.

## Product Behavior Changes

Record observable behavior, retain source-backed evidence, and surface
uncertainty instead of resolving it silently. Allowed dispositions are
`Candidate`, `Unresolved`, and `Excluded`.

| Observable behavior | Source, test, or configuration evidence | Candidate reference page | Disposition |
| --- | --- | --- | --- |
| None yet | — | — | — |

## QA Or Support Notes

- None yet.

## Exclusions

Explain `Excluded` rows that were considered but should not be documented
because they are internal implementation details, temporary scaffolding, or
did not ship.

## Release-Time Checklist

- [ ] Compare this initiative against the final shipped code.
- [ ] Update the relevant reference only after release-doc work
      is explicitly requested.
- [ ] Add the release row if the reference workflow requires it.
