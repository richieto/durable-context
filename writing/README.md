# writing/

This folder holds companion writing and presentation material about
Code-Anchored Context.

These files are useful for explaining the practice, but they are not part of
either installable package. Keep the disposable working bench under `context/`,
the durable decision log under `decisions/`, release-anchored reference under
`reference/`, and narrative drafts here.

## Reading Order

[When Spec-Driven Design Becomes Interface-Driven Design](ssd-to-idd.md) is the
precursor critique that motivates the series and introduces the idea of durable
context.

The core series is meant to be read (and released) in this order:

1. [The Rationale](code-anchored-context-rationale.md) — the painpoints that
   motivate the approach.
2. [Why](code-anchored-context-why.md) — the principle, the three kinds of truth
   (working context, durable decisions, released reference), and the two
   independent packages that ship them.
3. [The Structure](code-anchored-context-structure.md) — the concrete folder
   layout.
4. [Keeping Reference In Sync](code-anchored-context-reference-sync.md) — how
   release-anchored reference stays true via the git-tag diff workflow.
5. [Markdown For Work, HTML For People](code-anchored-context-formats.md) — what
   format the context should live in.
6. [Limitations](code-anchored-context-limitations.md) — when not to use it,
   the anti-patterns, and the pitfalls to watch.

## HTML Pages

Two HTML artifacts present the same model for different audiences:

- [The Story](code-anchored-context-story.html) — a plain-language overview for
  stakeholders, customers, and management who will not read the repo.
- [The Practitioner Brief](code-anchored-context.html) — a scannable reference
  of the three kinds of truth, the flat initiative layout, the initiative
  files, and the decision log for people doing the work.

Both npm packages intentionally exclude this folder.
