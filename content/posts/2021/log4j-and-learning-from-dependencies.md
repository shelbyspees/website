---
title: "log4j and learning from dependencies"
slug: log4j-and-learning-from-dependencies
date: 2021-12-24T22:27:36-07:00
images:
tags:
  - software
  - complex systems
---

A few weeks ago, the ubiquitous Java logging library [log4j](https://logging.apache.org/log4j/2.x/) was found to have a severe security vulnerability with no available patch
From the library's [Wikipedia summary](https://en.wikipedia.org/wiki/Log4j):

> On December 9, 2021, a zero-day vulnerability involving arbitrary code execution in Log4j was published by the Alibaba Cloud Security Team and given the descriptor "Log4Shell".
> It has been characterized by Tenable as "the single biggest, most critical vulnerability of the last decade".

If you want to learn more about the vulnerability, [read the Log4Shell article on Wikipedia](https://en.wikipedia.org/wiki/Log4Shell).

For this post, I want to share some thoughts that came up while witnessing the industry-wide response to this security incident.
Full disclosure: I didn't participate in the log4j incident response at my own company and very little of my work was impacted.

## github insights

(Some of this section is copied from my [twitter thread](https://twitter.com/shelbyspees/status/1469707194878730243), but I've elaborated in some spots and edited for readability.)

Here's a fun exercise for folks with production code in GitHub:

- Go to the Insights tab in your repo and navigate to the Dependencies page
- Pick a package that looks interesting and find out how it's funded

Alternatively, you can look at the dependencies for something external you run in production.
[Here's the dependencies page for the OpenTelemetry Collector.](https://github.com/open-telemetry/opentelemetry-collector/network/dependencies)

One package I recognize that doesn't seem to be owned by the [CNCF](https://www.cncf.io/) or a large corporation is [gorilla/mux](https://github.com/gorilla/mux).
I originally thought the project was owned by Google Open Source because I saw them listed in the [AUTHORS.md file](https://github.com/gorilla/mux/blob/91708ff8e35bafc8612f690a25f5dd0be6f16864/AUTHORS#L5).
Thankfully one of the maintainers replied to correct me:

%[https://twitter.com/elithrar/status/1470452385273323522]

Honestly, it's really hard to make sense of the OSS funding landscape.
There's been much discussion about [the open source sustainability problem](https://www.theregister.com/2021/05/10/untangling_open_sources_sustainability_problem/) and [whether it's exploitative for businesses to depend on the free labor of maintainers](https://www.theregister.com/2021/12/14/log4j_vulnerability_open_source_funding/).

I'll admit that I'm still pretty ignorant about it all, but my understanding is that it's rare for maintainers to be employed full-time just doing OSS maintenance.
And many of them don't even want that!

%[https://twitter.com/elithrar/status/1470453726527827970]

The vast majority of OSS maintainers are volunteers, most of whom do this work on top of a full-time job.

%[https://twitter.com/yazicivo/status/1469349956880408583]

We already have rampant burnout in this industry.
How is any of this sustainable?

Still, I welcome insights from folks involved in OSS and those more familiar with funding (or lack thereof).
I won't pretend that we can find and prevent "the next log4j" by poking around a GitHub dependency list.
I'm not claiming that.
I just think it's good to know how the building blocks of our systems get made.

## going beyond OSS funding

There are programs and offices and many many people working to figure out how to get OSS funding out of large companies, but as noted above, many maintainers don't just want to get paid to do OSS work full-time.

%[https://twitter.com/MissAmyTobey/status/1470066157663129604]

There are still gonna be folks who work full-time and do OSS on the side, but they won't be forced into that.
The happy hobbits ([as Amy describes them](https://twitter.com/MissAmyTobey/status/1470068351678312448)) will carry the load maintaining the log4js and OpenSSLs of the world.
People would be able to take real sabbaticals between jobs to do labor-of-love OSS work, without the pressure of rent and bills weighing on them.

Would universal basic income/healthcare/housing prevent any vulnerabilities from making into critical production systems for the rest of time?
Of course not.
But they'd make our digital ecosystem that much more resilient.

This 2016 report from [Nadia Eghbal](https://nadiaeghbal.com/) goes into depth on the subject:

%[https://www.fordfoundation.org/work/learning/research-reports/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure/]

I also highly recommend her 2020 book, [_Working in Public: The Making and Maintenance of Open Source Software_](https://press.stripe.com/working-in-public). So far (I only recently started reading it) the author has done a great job of making the tech writing accessible while still sharing research that'll be valuable for even the most experienced software folks to learn about.

There's something else I want to point out, which isn't limited to open source.
Actually, it's a pattern I've encountered on every team I've worked on.
Maintenance work—or "stewardship", as I've been starting to call it—is consistently deprioritized in favor of feature development.

%[https://twitter.com/ParisInBmore/status/1469697408120487943]

This is an overall tech industry culture thing that I want to talk about in depth at some point.
I won't be able do it justice in this post.

## this isn't over

I'm using the log4j vulnerability a bit selfishly as a learning opportunity, because one of the things we do in SRE is turn incidents into insights (oof that's cheesy—I probably subconsciously stole it from some marketing copy).

As we review the events in this incident and the state of open source maintenance, it's important to remember that any complex system will _always_ have emergent failures.
Issues will appear that you couldn't possibly predict.

Additionally, the "socio-" part of "sociotechnical systems" is where most of the complexity lies, which is  a bit scary because it's often invisible!

When industry leaders call log4j's vulnerability [a "design failure"](https://www.wired.com/story/log4j-flaw-hacking-internet/), they're telling a story where the maintainers are unequivocally _at fault_ for this vulnerability making it out into the world.
This judgmental language sets the stage for harassment of already-overworked maintainers.

For more on the topic, I recommend reading this post from [Yawar Amin](https://dev.to/yawaramin), which covers the human impact of the log4j incident:

%[https://dev.to/yawaramin/the-human-toll-of-log4j-maintenance-35ap]

Finally, #hugops to the log4j maintainers as well as all the incident responders.
Y'all have had a hectic couple of weeks, I hope you're able to rest and recharge now during the holidays.
Please be kind to yourselves now and into the new year.
