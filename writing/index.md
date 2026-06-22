# Agent-Agnostic Engineering

Are coding agents a third-party dependency?

They feel different — interactive, sometimes collaborative, closer to a
teammate than to lodash or Stripe. But the same questions I ask about any
external dependency still apply: who owns the integration surface? What breaks
if I swap vendors? What parts of my work only exist inside their environment?

A library, a framework, and a SaaS API are all external. I choose them, I use
them, and I try not to let them own the parts of the system that must outlive
the choice. A coding agent fits that pattern. It is powerful tooling I depend
on to build the product — not the product itself, and not where durable
engineering truth should live.

So I treat agents with the same discipline: avoid lock-in, keep a clean
boundary, and own what must survive a tool change. If I can swap React for
something else without rewriting the product, I should be able to swap Cursor
for Copilot, or one model for another, without affecting the good engineering
practices that should remain consistent regardless of the coding agent. Context
that lives inside a session, a plan mode, or a proprietary doc tool is context
owned by the agent — not by me.

These articles are the narrative behind that choice: what broke when I did not
treat agents this way, and the two repository-local practices I landed on to fix
it.

---

## Where It Started

- [When Spec-Driven Design Becomes Interface-Driven Design](ssd-to-idd.md)

## Shared

- [Markdown For Work, HTML For People](formats.md)

## Durable Context

Planning context and decision history that survive a tool change.
Package: `durable-context` · installs `context/` and `decisions/`.

- [Durable Context: The Rationale](durable-context/rationale.md)
- [Durable Context: The Model](durable-context/model.md)
- [Durable Context: Limitations, Anti-Patterns, and When Not To Use It](durable-context/limitations.md)

Practitioner brief (HTML): [Durable Context Brief](durable-context/brief.html)

## Code-Anchored Docs

Shipped-behavior documentation anchored to the code that was released.
Package: `reference-docs` · installs `reference/`.

- [Code-Anchored Docs: Why](reference-docs/why.md)
- [Code-Anchored Docs: Keeping Docs In Sync](reference-docs/keeping-in-sync.md)
- [Code-Anchored Docs: Limitations, Anti-Patterns, and When Not To Use It](reference-docs/limitations.md)

Practitioner brief (HTML): [Code-Anchored Docs Brief](reference-docs/brief.html)
