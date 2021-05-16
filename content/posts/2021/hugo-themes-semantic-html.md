---
title: "I just want Hugo themes that use semantic HTML"
slug: hugo-themes-semantic-html
date: 2021-05-12T23:21:50-07:00
images:
draft: true
tags:
  - hugo
  - html
  - css
  - accessibility
  - web-development
---

Is that so much to ask?

<!--more-->

I set up a couple new [Hugo](https://gohugo.io) sites the past few months--
most recently [ADHDevOps.club](https://adhdevops.club).
It's been a bit frustrating trying to find Hugo themes
that both suit my needs for the site and actually meet accessibility standards.

I switched from Jekyll to Hugo for my personal site a few years ago.
It became popular around 2016-2017,
which is when most of the recommended themes were created.
We also use Hugo for the docs site at Honeycomb
so I've had the opportunity to become relatively knowledgable about it.

I've been noticing many of these same issues for my own blog
(where this post is published).
While I do maintain a custom fork of the hello-friend-ng theme for my site,
I'd been hoping I could upstream some of the changes--like new icons--
and maintain some separation of concerns.

For ADHDevOps I wanted a Hugo blog theme passed the WAVE accessibility checker
and could support the following:

- custom home page content (not just a list of posts)
- a different author for every blog post, set in the front matter
- tags and/or categories
- static non-blog-post pages
- minimal CSS changes to meet my design needs (plus color contrast requirements)

I couldn't find a single theme that checked all of these boxes
without having to overwrite a significant number of layouts
and/or completely change the CSS--usually both.

In general, Hugo makes it relatively easy to accomplish the things on my list.
But the themes would hard-code a bunch of stuff,
making it hard to build on otherwise high-quality, simple styles.

On top of that, I'd see redundant CSS classes everywhere:
`.main`, `.section`, `.nav`--many of which were modifying `div` elements.
Maybe semantic HTML wasn't as much of a thing in 2016?
I mean, I remember learning about semantic elements in HTML5
back when I first dug into the MDN docs in 2015 :shrug:
In any case, it's 2021 now.
Semantic HTML should be considered basic website hygiene.
Especially on a static site, FFS.
There's barely anything to it.

## Themes I tried

The first theme I picked was [Book]().
I thought

Then I was looking at [Anubis]().
This is the theme used as an example in Hugo's quick start documentation.

I briefly considered [???]() alongside Anubis,
which turned out to require even more custom layout work
than either Book or Anubis.
On top of that, the color contrast was abysmal.
I decided to cut my losses, hoping that Hugo's quickstart example theme
would guarantee better alignment with web development recommended practices.
I should have checked more closely--it didn't.

The next day I found [Ezhil]().
I tried it out on localhost and really liked it,
especially since I've always been a fan of the [Raleway font]().
The config change sat uncommitted in my index for a week
before I carved out my Saturday afternoon to try deploying the change.

Migration isn't a huge deal on Hugo sites,
but I had just spent the previous weekend overwriting layouts
for two entirely different themes.
I wanted to feel confident about my choice.

## Fuck it, I'll fork it

[tweet embed]

## Project maintainers have a responsibility

I'm sure Hugo's maintainers had a perfectly valid reason
to stop accepting new Hugo themes to list on the site.

What I'd love to see maintainers of projects like Hugo do
is require that the themes they point to on their website
use semantic HTML and pass the WAVE accessibility checker, at the very least.

Newer frameworks like 11ty might do this (I haven't checked),
but the majority of themes on the Hugo website
sit in repos that haven't been touched for years.
