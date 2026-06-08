# Code-Anchored Context: Markdown For Work, HTML For People

This is a short companion to
[Code-Anchored Context: Why](code-anchored-context-why.md) and
[Code-Anchored Context: The Structure](code-anchored-context-structure.md).
It covers one narrow question: what format should the context live in?

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

You can see this in practice in
[`code-anchored-context-story.html`](code-anchored-context-story.html): the same
ideas as the markdown pieces, retold in plain language for a non-technical
audience.

HTML is not only for outsiders, though. The same format also makes a good
*scannable reference* for practitioners. The
[`code-anchored-context.html`](code-anchored-context.html) practitioner brief
renders the structure — the three kinds of truth, the flat initiative layout,
the initiative files, and the decision log — as something you can scan at a
glance rather than read top to bottom. Same format, two different jobs: one
tells the story, the other maps the mechanics.

## The Point

It is not markdown vs HTML. It is using the right format for the right
audience — and keeping both anchored to the same underlying context instead of
letting them drift into separate stories.

For the honest accounting of where this whole approach is not worth the cost,
see the closing companion article,
[Code-Anchored Context: Limitations](code-anchored-context-limitations.md).
