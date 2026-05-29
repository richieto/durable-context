# Release Transition Checklist

Use this checklist when changing `context/current.md` to a new current
release.

Target release: vNEXT

## Steps

- [ ] Update `context/current.md` to the target release.
- [ ] Create `context/releases/<target-release>/` from
      `context/_templates/release-context/` if it does not exist.
- [ ] Create `README.md`, `backlog.md`, and `initiatives/` for the target
      release if missing.
- [ ] Scan `context/programs/*/planned-initiatives/*/README.md` for
      `Target release: <target-release>`.
- [ ] For each matching planned initiative, materialize it into:

```text
context/releases/<target-release>/initiatives/<initiative-slug>/
```

- [ ] Update the promoted release initiative so it links back to the parent
      program and planned initiative.
- [ ] Update the planned initiative metadata:

```md
Status: Promoted
Promoted to: `context/releases/<target-release>/initiatives/<initiative-slug>/`
Promoted on: YYYY-MM-DD
```

- [ ] Update the parent program `README.md`, `roadmap.md`, `backlog.md`, or
      `releases/<target-release>.md` as needed.
- [ ] Leave the planned initiative in place as historical planning context.

## Rule

Planned initiatives are promoted, not moved silently.
