# When Spec-Driven Design Becomes Interface-Driven Design

Spec Driven Design feels great at the beginning because it gives AI something concrete to work from. You describe the intent, the expected behavior, and the way to verify the outcome. Then the agent can start building with much less ambiguity.

And honestly, that is powerful.

But after using it more, I started noticing something important. Spec Driven Design can easily become very close to **front-end driven design**, or maybe more accurately, **human-interface driven design**.

Most of the intent and verification comes from the way we interact with the system. What should the user see? What should happen when they click? What should be validated? What should the flow look like? What is the expected result?

That is useful, but it also creates a blind spot.

Because the system can look correct from the outside while still being poorly understood on the inside. The UI works, the flow works, the tests pass, and the feature looks done. But that does not necessarily mean the architecture is clear.

What about the backend boundaries? What owns the data? How does the system deploy? Where are the infrastructure assumptions documented? What belongs in CI/CD? What is managed through IaC? What happens when something fails?

You *can* include all of that in the spec, and sometimes you should. But in practice, if it only lives inside the spec, it easily becomes secondary. It becomes supporting detail around the interaction.

And architecture cannot live as a supporting detail forever.

That is where I ran into problems.

At first, Spec Driven Design was enough. It helped me move fast, and it gave the agent good direction. But then I needed to add something that was not part of the original spec, and that “something” was not just another feature. It required an architectural decision.

A new flow. A different boundary. A different way of thinking about the system.

And then the spec alone did not hold anymore.

Because I did not fully know the architecture. Or worse, the architecture had been chosen for me by the AI. Not maliciously, and not necessarily incorrectly, but silently. I had given the agent enough freedom to build, and it chose a path that worked.

That is the scary part.

AI will usually give you a solution. It will not always stop and say, *“This is technically possible, but it may not be something you want to maintain.”*

It solves the problem you gave it. And sometimes the solution is obvious, possible, and even correct. But the effort for AI to generate a refactor is not the same as the effort for you to maintain that refactor over time.

That is where human judgment still matters.

Sometimes the real question is not whether AI *can* solve the problem. Very often, it can. The better question is whether you will regret that solution in the next five prompts.

So Spec Driven Design is powerful, but for long-lived systems it is not enough on its own. It is strongest at describing intent and verification, and because of that, it can easily become interface-driven.

It can tell AI how the product should behave.

But not always how the system should survive.

With AI-assisted development, the question is no longer only:

**Can the agent build it?**

Very often, it can.

The better question is:

**Can the agent build it in a direction you still want to maintain later?**

For me, the missing layer is **durable context**. Not more documentation for the sake of documentation, but context that helps both humans and AI understand the system over time: architecture, decisions, what is changing now, and what was deliberately left for later.

That is what I have been working on as **Code-Anchored Context** — not a replacement for specs, but something built around them. If specs tell AI what to do next, durable context helps AI understand what already exists.

I wrote up the idea, and how I structure it, as a short series — best read in
this order:

- [Code-Anchored Context: The Rationale](code-anchored-context-rationale.md) — the painpoints.
- [Code-Anchored Context: Why](code-anchored-context-why.md) — the principle.
- [Code-Anchored Context: The Structure](code-anchored-context-structure.md) — the layout.
- [Code-Anchored Context: Markdown For Work, HTML For People](code-anchored-context-formats.md) — the format.
