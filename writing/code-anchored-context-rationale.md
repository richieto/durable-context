# Code-Anchored Context: The Rationale

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

Here is the important part. The more "code-first" your repository is, the better
your results, because the agent gets not just the state of the artifacts you
produce, but the context *around* them: architecture, delivery, operations, and
observability. And do not let perfect be the enemy of good — if all you have is
IaC and the code itself, that is already very helpful. Just plan to grow into
more over time.

If you want to stay lean on a small project, start with something like
OpenSpec. Once you get complex enough, consider this approach instead.

> The richer the repository, the more context an agent inherits for free.

## Documentation Tools Depend On Configuration

You can connect coding agents to your documentation tools today and instruct
them to "update the documentation." The problem is the same as plan mode. Every
team member has to follow the practice, and it only works through the specific
coding agent connected to that specific tool on that specific machine. You are
constrained to that configuration. Want to try a new coding agent? Configure
everything again.

If documentation instead lives in the repository, it ships with the feature at
the same time. That keeps it accurate, and it comes with everything the repo
already gives you: it can reference exact files and lines, it gets git tracking
by default, and you get auditing for free.

> Documentation that ships with the change cannot drift away from it.

## The Reasoning Is Already In Language

Watching coding agents "think," I noticed that most of the conclusions they
reach *before acting* are expressed in plain language, not in code. If that
conclusion already exists in plain English, why throw it away? Capture it as
output documentation and get more value out of the tokens you already paid for.

> The agent already wrote the explanation. Keep it.

## The IDE Is A Human Interface, Not The Agent's

Something worth remembering: the IDE does not matter to a coding agent while it
is planning or coding. The IDE is mostly a human interface.

As long as you give your agents the right context, they have no trouble
navigating the repository tree to the right file and the right lines —
regardless of whether you have four or five workspaces in it. That is why I keep
context and reference documentation at the root. When I do need debugging help
or workspace-specific capabilities, I just open another window dedicated to
that.

> Optimize the repository for the agent's context, not the editor's layout.

## The Work Becomes Delegable

There is a quieter cost hiding under all of these. When planning and reasoning
stay locked in one session, the work cannot move. Nobody else can pick it up
cleanly — not a teammate, not a specialist, not a different model.

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
[Code-Anchored Context: Why](code-anchored-context-why.md), where the principle
and the model that resolve this friction are laid out in full.
