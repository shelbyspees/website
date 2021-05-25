---
title: "Accessible Hugo themes: Where are they?"
slug: hugo-themes-semantic-html
date: 2021-05-23T15:58:39-07:00
draft: true
tags:
  - hugo
  - html
  - css
  - accessibility
  - web-development
---

I just want Hugo themes that use semantic HTML
and meet accessibility standards out of the box.
Is that so much to ask?

<!--more-->

## Disclaimer(s)

I don't claim to be the arbiter of what is or isn't accessible.
There are web accessibility experts out there, please listen to them.
I'm just trying to apply the standards I'm aware of
and maybe convince more people to care about making their content accessible.

I'm also not a frontend web developer.
There's a lot I don't know.
I fully expect I've said something inaccurate in this post.
Please [reach out via Twitter](https://twitter.com/shelbyspees)
with any corrections or feedback.

One thing I can say with some confidence is that accessibility isn't binary.
A change that makes content more accessible to some
can make the same content less accessible to others.
For example, people with low vision can benefit from higher color contrast,
but high contrast can trigger migraines for people with light sensitivity.

Still, the standards and practices I'm referencing in this post
are the result of decades of research by web accessibility experts.
They've written these standards while considering
the tradeoffs between conflicting accessibility needs
in order to make web content accessible to as many people as possible.
I doubt I could do much better than that with my limited knowledge,
so while they're not perfect, I think these standards are worth following.

Finally, I realize that the Hugo theme on my personal site
doesn't even use semantic HTML consistently.
It's better than it was, sure, but I still have some work to do.

## `hugo new .`

I set up a couple new [Hugo](https://gohugo.io) sites
the past few months---most recently [ADHDevOps.club](https://adhdevops.club).
With the desire to just set something up quickly,
Hugo made the most sense since I have a decent amount of experience with it.
Unfortunately, it's been a bit frustrating trying to choose Hugo themes
because very few of them both suit my needs for the site
and actually meet accessibility standards.

I started using Hugo a few years ago
after switching my personal site from Jekyll.
We also use Hugo for [the docs site at Honeycomb](https://docs.honeycomb.io),
so I've had the opportunity to become relatively familiar it.
It seems like Hugo got popular around 2016-2017---at least
that's when a lot of the themes I looked at were created.

For ADHDevOps specifically, I wanted a Hugo blog theme
that passed the WAVE accessibility checker's requirements (tested with the
[Chrome extension](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)),
and could support a few specific features I wanted
without having to overwrite more than a couple of the theme's templates.
The features I wanted include:

- custom home page content (not just a list of posts)
- blog post author set in the front matter to allow for many guest authors
- tags and/or categories (these usually come out of the box)
- static non-blog-post pages
- clean, minimal design
- light and dark mode
- colors meet contrast requirements for accessibility

In general, Hugo makes it relatively easy to accomplish the things on my list.
But many of the themes I looked at had hard-coded paths or layouts,
making it hard to build on otherwise high-quality, simple styles.
In the end, I couldn't find a single theme that checked all of these boxes
without having to overwrite a bunch of the layouts
and/or completely change the CSS--usually both.

On top of that, I'd see redundant CSS classes everywhere:
`.main`, `.section`, `.nav`--many of which were modifying `div` elements.
Maybe semantic HTML wasn't as much of a thing in 2016?
I mean, I remember learning about semantic elements in HTML5
back when I first dug into the MDN docs in 2015 🤷

In any case, it's 2021 now.
Web assessibility has been around for a while, right?
My own curiosity piqued, I went and looked it up: how recent is all this?

It turns out that version 2.0 of the
[Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
were published in 2008 and became ISO standard in 2012.
HTML5 was also released in 2008 and given "W3C Recommendation" status in 2014.

Compare that to WebAssembly, which was first announced in 2015
and only reached "W3C Recommendation" status in 2019.
My unscientific feeling (informed by the reality of the tech industry)
is that there are frontend dev teams seriously debating
rewriting their sites to use WebAssembly when they never once considered
investing equivalent (or less!) time and resources
to meet accessibility standards established a decade ago.

C'mon, folks. We're long overdue.
Semantic HTML should be considered basic web hygiene.
Especially on a static site, FFS.

## Project maintainers have a responsibility

I think the main thing that frustrates me about all this
is the lack of semantic, accessible themes that offer light and dark mode
listed on [the Hugo site](https://themes.gohugo.io/).
Listing themes on the official website is tacitly recommending
that people create new sites with them.

Now, I don't blame Hugo's maintainers for no longer accepting new themes
to list on the site.
I've noticed that the majority of themes listed on the Hugo site sit in repos
that haven't been touched for years.
It seems like the maintainers have moved on to newer projects
and Hugo's theme library sort of remains as a time capsule
from its peak period of popularity.

But what I'd love to see from maintainers of static site generators like Hugo
is for them to start requiring that any theme they point to on their website
at the very least uses semantic HTML and passes the WAVE accessibility checker.

Here's hoping that newer frameworks like [11ty](https://www.11ty.dev)
(pronounced "eleventy") do a better job of meeting these standards.
I'm planning to dig around in 11ty's themes and see how it compares
to my experiences with Hugo and Jekyll.

I've also started to draft a follow-up post
about the handful Hugo themes I looked at for ADHDevOps
and the changes I made to the theme I ended up choosing.

And if you come across better lists of Hugo themes than what's on the Hugo site,
hit me up so I can share them.
I don't expect the average new-Hugo-site-creator to bother looking anywhere
besides the main Hugo site when searching for themes,
but maybe we can make more accessible alteratives rise up in search results.
