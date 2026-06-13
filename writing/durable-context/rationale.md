# Durable Context: The Rationale

Before there was a principle, there was friction. This article is about the
painpoints I kept hitting with coding agents — the specific, recurring losses
that eventually convinced me the way I was working was wrong.

They are not in priority order. But they all rhyme: the most valuable output of
a coding session is usually not the diff — it is the reasoning around it, and
that reasoning keeps escaping into places you do not own. Once you see it, you
cannot unsee it. The principle I now organize everything around comes in the
next article; this one is the case for needing it.

## Plan Mode Is Trapped In The Session

Plan mode in most coding agents is good. The problem is that the plan stays
with the agent or the session. It is not yours. If you do not actively keep it,
it is gone. You spend real time planning, the agent produces a lot of valuable
token output, and all of that value evaporates the moment the task completes.

All of that planning could have been documentation.

It gets worse with collaboration. Planning often takes long sessions or a
second opinion. But if your plan lives inside one app, it is owned by that
coding agent — not by you. You cannot step out and ask a different coding agent
to review it. The same wall hits your teammates: sometimes you want an area
specialist to look at the plan before a single line is written, and you cannot
hand it over cleanly.

> Planning is expensive thinking. It should outlive the session that produced
> it.

## spec.md Alone Does Not Scale

A single `spec.md` is great for small projects. It falls short for large,
complex ones. I also noticed something concrete: coding agent output improves
significantly when you give the agent *structure* — different files for
different concerns. Spec, IaC, CI/CD, architecture, and the list goes on.

There is a compounding effect here: the more "code-first" your repository is,
the better your results, because the agent inherits the context *around* the
artifacts, not just the artifacts themselves. That argument has its own home in
the "Where It Shines" section of
[Durable Context: Why](why.md). And do not let
perfect be the enemy of good — if all you have is IaC and the code itself, that
is already very helpful. Just plan to grow into more over time.

If you want to stay lean on a small project, start with something like
OpenSpec. Once you get complex enough, consider this approach instead. And even
then it is opt-in: it earns its keep on large, long-lived initiatives, while
small fixes still just ship without ceremony. Nobody has to wrap a one-line
change in process.

> The richer the repository, the more context an agent inherits for free.

## Documentation That Lives Apart From The Repo

You can connect coding agents to external documentation tools today and instruct
them to "update the documentation." The problem is the same as plan mode: the
practice depends on a specific agent, a specific tool, and a specific machine.
That is a different problem — keeping shipped-behavior docs accurate from the
code — and it has its own practice:
[Reference Docs: Why](../reference-docs/why.md).

Durable Context is about the reasoning *around* the change while you are still
building it, not about refreshing product docs after a release.

## The Reasoning Is Already In Language

Watching coding agents "think," I noticed that most of the conclusions they
reach *before acting* are expressed in plain language, not in code. If that
conclusion already exists in plain English, why throw it away? Capture it as
output documentation and get more value out of the tokens you already paid for.

> The agent already wrote the explanation. Keep it.

## Where You Open The Repo Should Not Matter

To be clear, the IDE is not irrelevant to agents — indexing, language servers,  
and tool wiring genuinely help. The narrower point is this: *where in the tree*  
*you open the repo should not change the outcome.* Root or a nested subfolder,  
the agent should reach the same context and the same answer.

As long as you give your agents the right context, they have no trouble
navigating the repository tree to the right file and the right lines —
regardless of whether you have four or five workspaces in it, or which one you
happened to open. That is why I keep the working bench and the decision log at
the repo root: they are discoverable from anywhere. When I do need debugging help or
workspace-specific capabilities, I just open another window dedicated to that.

> Optimize the repository for the agent's context, not the editor's layout.

## The Work Becomes Delegable

There is a quieter cost hiding under all of these. When planning and reasoning
stay locked in one session, the work cannot move. Nobody else can pick it up
cleanly — not a teammate, not an architect, not a different coding agent.

Planning that ends in a documented set of actions changes that. The work
becomes something a specialist can review before any code is written, something
a colleague can hand off, and something another colleague can take and
supervise with their own agent. The same artifact serves people and agents
alike, because none of them depend on having been in the original session.

> Reasoning trapped in a session can only be acted on by that session.

## Where This Leads

Every one of these painpoints points the same direction: stop letting valuable
reasoning live inside one session, one tool, or one machine. There is a single
idea underneath all of it — and it has a name.

That is the subject of the next article,
[Durable Context: Why](why.md), where the principle
and the model that resolve this friction are laid out in full.