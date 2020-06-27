---
title: "On Tech Management"
date: 2020-01-30T23:44:52-07:00
tags: [management, teams]
---

I've noticed a pattern both in the [LFI-Software](http://learningfromincidents.io) community and in my career overall: it's striking how many lessons I've learned from therapy that can be applied to engineering management.

<!--more-->

What I often need from my manager is much closer to the skills of a social worker than those of a project technical lead.

I'm probably destined to be a manager someday (it was mentioned during my first 1:1 at my first full-time job) and I know I'm gonna mess up royally in some ways because it's hard. But for now, I see harm being done and I feel that a lot of it can be mitigated.

### Engineering managers don't have management skills

Most of the problems we see with both project management and people management methodologies and processes are that they're cargo-cult applied without systems thinking. Not only are engineering managers not trained at all in the core skills of people management, but we devalue those skills as an industry. As a result, people management skills never get significantly invested in.

What I've seen is this: teams will _drift into_ success by various measures. Good things happen and then management post-hoc applies cause to whatever random approach they tried. The [root cause fallacy](https://willgallego.com/2018/04/02/no-seriously-root-cause-is-a-fallacy/) isn't limited to failures.

So the product got launched and the Jiras got closed and money got passed around and paychecks got deposited. People tell each other what great work they did, and some subset of them get promoted. Meanwhile, all the LOE estimates are wrong, we're querying bad data, tech debt charges more interest, everyone's putting out fires. And people wonder why we have a problem with burnout in the industry. 

Upper management refuses to scale back scope because they "made promises" and they've never heard of killing your darlings.

"We need to maintain velocity," they say when engineers try to push back on product asks in order to clean up tech debt. Shortly after, they ask why it takes so long to implement a feature that "should be pretty simple."

Meanwhile, the people who care the most are the ones who burn out fastest.

### Managers burning out

It hurts the managers as well. At two different jobs I was placed under a former technical individual contributor (IC)---one an analyst, one an SRE---who had just been promoted to their first management role. Both were tacitly expected to maintain their IC output while also taking on all the responsibilities of a manager.

A while back, I read some great advice for engineering managers:

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">5. Both code and people require the same thing to thrive: focused, sustained attention. No one does both well.</p>&mdash; Sarah Mei (@sarahmei) <a href="https://twitter.com/sarahmei/status/862588165353218048?ref_src=twsrc%5Etfw">May 11, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<br>

Additionally, [Charity Majors has given advice](https://charity.wtf/2019/01/04/engineering-management-the-pendulum-or-the-ladder/) along a similar vein:

> Stop writing code and engineering _in the critical path_

What happens when you try to do both? One or more of these:

- your engineering work suffers
- your health suffers
- your reports suffer

At my first tech job, the analyst-turned-manager didn't have the time or resources to help me or even realize what was happening as I dove headfirst into burnout. In top-secret government work, there's almost never a person with the technical expertise, the appropriate clearance, and the availability to hand work off to. If this manager didn't do her IC work, someone else would have to explain to a three-star Air Force general why it didn't get done.

At my second tech job, the SRE-turned-manager burned out within four months of his new role. His eagerness to build out the team with promising juniors was admirable, but ultimately unsustainable given the improvements he wanted to make and the never-ending backlog of work to do.

### Being responsible about burnout

Generally, however, managers aren't expected to maintain their productivity doing engineering work. Practitioners at the sharp end are, even though they have less control over business and product decisions, and are subject to more scrutiny when something goes wrong. As Dekkar describes in [_Just Culture_](https://www.goodreads.com/book/show/2896995-just-culture), technical practitioners are often held in a double bind, forced to choose between

- spending additional time and resources to play it safe, or
- cutting corners now because "velocity!"

I've experienced this firsthand, and many of my colleagues are experiencing it right now. 

Burnout is no joke. I feel strongly about that. It's irresponsible for managers in the tech industry not to be well-versed in at least the symptoms of burnout.

In addition to being knowledgeable about burnout, it's the responsibility of any people manager to be well-versed in systems of oppression. The tech industry is a complex system involving humans, and those humans can't just leave their non-work struggles at home. Minoritized people experience more stress overall, so they're more at risk of burnout. Oppression can't be handled as a separate issue‚ it's interwoven into every part of the existing system.

### Social science? lol

It's been very frustrating to encounter tech workers throughout my career who throw up their hands because something can't be made into a simple binary metric or linear scale. In basically every other field, practitioners and decision-makers have no choice but to navigate complexity and nuance.

Those same tech workers will then roll their eyes and scoff at the idea of studying or even discussing anything under the umbrella of social science. Here's my take: Social science is the only thing that can save tech from itself. Let's learn from it.

As an example, let's think about the question that sparked the Slack rant that inspired this post:

> How do you measure outcomes as a manager when everything you're doing is fuzzy?

One answer? Look to other professions that have fuzzy nonlinear outcomes to measure, like healthcare (especially mental health), social work, community organizing, teaching. How does a psychiatrist determine that a patient should change medication? How does a teacher help a student who's struggling?

There's no 1:1 perfect solution, but we can take lessons from other kinds of work and apply it to our own.

Isn't that what we already do with the solutions we find on StackOverflow? It's rare that it makes sense to copy the top answer verbatim into your codebase. Instead, I expect you do something like this:

- compare several approaches, reading comments to gain context and determine how well a given StackOverflow answer's solution works for your needs
- make sure you understand the logic behind the solution you're trying
- copy some or all of the code from the solution you're trying, editing parameters and cleaning up formatting to interface with your existing code
- test and iterate, or start back at an earlier step with a different StackOverflow answer

In order to keep what works and throw away what doesn't, you need to actually engage with the content you're learning from.

As always with LFI discussions, there's no instant fix. But with enough of us reading and discussing and learning and applying lessons from high-reliability systems, safety-critical industries, software engineering teams, and even social science(!), we can make a difference.