# Markdown For Work, HTML For People

This is a short companion shared by both practice narratives in
[`writing/`](README.md). It covers one narrow question: what format should the
writing live in?

I used to think about this as markdown *vs* HTML. Now I see it differently.
They are not enemies. They serve different readers.

## Markdown Is For The Work

Markdown is great for working documents: specs, architecture notes, ADRs,
backlog docs, and the context agents read. It is diff-friendly, lives next to
the code, and both humans and agents parse it without ceremony.

Mermaid fits here too. Diagrams need space, and they may be fine for agents as
text, but sooner or later a human opens them — and humans need structure. That
is an argument for organizing context into topic-specific files, not one
argument against diagrams.

## HTML Is For People Who Will Not Read The Repo

HTML is great when you need to explain the same thinking to people who do not
want to read engineering documentation. Customers, management, and stakeholders
usually do not need the full spec. They need the story, the flow, the impact,
and the current direction.

Practitioner briefs in HTML:

- [`durable-context/brief.html`](durable-context/brief.html) — working bench,
  decision log, lifecycle.
- [`reference-docs/brief.html`](reference-docs/brief.html) — tag-diff
  workflow and boundary rules.

Same format, different jobs: one tells the story, the others map the mechanics.

## The Point

It is not markdown vs HTML. It is using the right format for the right
audience — and keeping both anchored to the same underlying ideas instead of
letting them drift into separate stories.

For where each practice is not worth the cost, see
[Durable Context: Limitations](durable-context/limitations.md) and
[Reference Docs: Limitations](reference-docs/limitations.md).
