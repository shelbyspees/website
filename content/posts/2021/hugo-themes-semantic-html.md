---
title: "Updating Hugo themes to use semantic HTML"
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

I just want Hugo themes that use semantic HTML
and meet accessibility standards out of the box.
Is that so much to ask?

<!--more-->

## Disclaimer(s)

I don't claim to be the arbiter of what is or isn't accessible.
There are web accessibility experts out there, please listen to them.

I'm also not a frontend web developer and there's a lot I don't know,
so I fully expect I've said something incorrect in this post.
Please [reach out via Twitter](https://twitter.com/shelbyspees)
with any corrections or feedback.

One thing I can say is that accessibility isn't binary.
A change that makes a site more accessible to some
can make the same site less accessible to others.
For example, people with low vision can benefit from more color contrast,
but this can trigger migraines for people with sensitive eyes.

The standards and practices I'm referencing in this post are the result of
decades of research by web accessibility experts.
They've done the work to figure out how to write these standards
such that web content will be accessible to as many people as possible.

Finally, the Hugo theme on my personal site doesn't even use semantic HTML 😬
Yeah, I have some work to do.

## `hugo new .`

I set up a couple new [Hugo](https://gohugo.io) sites the past few months--
most recently [ADHDevOps.club](https://adhdevops.club).
It's been a bit frustrating trying to choose Hugo themes
because very few of them both suit my needs for the site
and actually meet accessibility standards.

I switched from Jekyll to Hugo for my personal site a few years ago.
It became popular around 2016-2017, which is when most of the recommended themes
were created, and I think I made the switch in 2018.
We also use Hugo for [the docs site at Honeycomb](https://docs.honeycomb.io)
so I've had the opportunity to become relatively knowledgable about it.

I've been noticing many of these same issues for my own blog
(the site you're looking at---unless you're reading this via RSS I guess).
While I do maintain
[a custom fork of the hello-friend-ng](https://github.com/shelbyspees/hugo-theme-hello-friend-ng/)
theme for my site,
I'd been thinking I could start to upstream some of my changes---like
the new social icons I added---and attempt to do a better job
maintaining separation of concerns between style/layout and content.

For ADHDevOps specifically, I wanted a Hugo blog theme
that passes the WAVE accessibility checker (tested with the
[Chrome extension](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)),
and could support a few specific features I wanted without having to overwrite
more than a couple of the theme's templates.
These are the features I wanted:

- custom home page content (not just a list of posts)
- a different author for every blog post, set in the front matter
- tags and/or categories
- static non-blog-post pages
- minimal CSS changes to meet my design needs (plus color contrast requirements)

In general, Hugo makes it relatively easy to accomplish the things on my list.
But the themes I looked at tend to hard-code a bunch of stuff,
making it hard to build on otherwise high-quality, simple styles.
In the end, I couldn't find a single theme that checked all of these boxes
without having to overwrite a bunch of the layouts
and/or completely change the CSS--usually both.

On top of that, I'd see redundant CSS classes everywhere:
`.main`, `.section`, `.nav`--many of which were modifying `div` elements.
Maybe semantic HTML wasn't as much of a thing in 2016?
I mean, I remember learning about semantic elements in HTML5
back when I first dug into the MDN docs in 2015 🤷

In any case, it's 2021 now. I went and looked it up: how recent is all this?

It turns out that version 2.0 of the
[Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
were published in 2008 and became ISO standard in 2012.
HTML5 was also released in 2008 and given "W3C Recommendation" status in 2014.
Compare that to WebAssembly, which was first announced in 2015
and only reached "W3C Recommendation" status in 2019.
My unscientific feeling is that frontend dev teams have been seriously debating
rewriting their sites to use WebAssembly when they never even considered
investing equivalent (or less!) time and resources to update those same sites
in order to meet accessibility standards.

C'mon, folks. We're long overdue.
Semantic HTML should be considered basic website hygiene.
Especially on a static site, FFS.

## Themes I tried TODO

The first theme I picked was [Book]().
I thought
Pretty much all the content lived under this hard-coded `/docs` path 😭.
I would have had to overwrite (FIXME how many?) layouts!
I let it sit like this for a week while chewing on how to proceed.

Then I was looking at [Anubis]().
This is the theme used as an example in Hugo's quick start documentation.
I was _hoping_ this would mean that the theme would be flexible
and meet accessibility standards.
Yeah no.

I briefly considered [???]() alongside Anubis,
which turned out to require even more custom layout work
than either Book or Anubis.
After editing the layouts a bit and rebasing to isolate theme-specific changes,
I set up branch deploys for each and decided I liked Anubis better,
especially since (???)'s color contrast was abysmal
and I was trying to avoid overwriting all the CSS.
Oh, sweet summer child.

I did love Anubis's theme toggle button
(which only required a single-line config change to enable),
the layout didn't spark joy.
I felt the urge to keep searching for the perfect theme.

The next day I found [Ezhil]().
I've always been a fan of the [Raleway font]()
I tried it out on localhost and it felt _right_.
It sat uncommitted in my index for a wee
before I carved out my Saturday afternoon to try deploying the change.

Migration isn't a huge deal on simple Hugo sites,
but I had just spent the previous weekend overwriting layouts
for two entirely different themes.
I had custom code everywhere.
I didn't mind deleting code that much,
but I wanted to feel confident about my choice.

After several hours of overwriting layouts and CSS once again
(this theme didn't even use a preprocessor!)
and getting annoyed about `<div class="main">`,
it finally hit me: no theme is going to check all my boxes.
I'm too picky.

## Fuck it, I'll fork it

{{% tweet 1391480701489278980 %}}

[The fork](https://github.com/adhdevops/ezhil) lives in the ADHDevOps org.
Let's walk through some of my changes.

[This commit](https://github.com/adhdevops/ezhil/commit/bc6f8d348d75ee9eb971789247b92ea29c32141f)
is where I started switching to semantic HTML tags for `main` and `section`,
although its true purpose was to factor out the base document tags.
The `<!DOCTYPE html>` tag and other base tags were hard-coded into
each of the four page layouts, which I really only noticed because
the WAVE evaluation tool found issues there--mainly that
the opening `<html>` tag was missing a value for the language attribute.
I was surprised by this after trying out several themes
with built-in features for internationalization,
but I guess the Ezhil theme was meant to be minimal.
I was committed to this fork now, though, so I felt it made the most sense
to DRY up the layouts.

I had already factored out a `list-element` partial for the home page's
list of Recent posts, which included some post metadata like publish date
and whether the post is a draft.
(Apparently I did that refactor as
[part of the above commit](https://github.com/adhdevops/ezhil/commit/bc6f8d348d75ee9eb971789247b92ea29c32141f#diff-5f94de6d6f1f71be7e6352098044a189896abf19a6a20f85c494d008702afe35R1-R15),
which is not very hygenic!
Feel free to judge the crap out of me.)
This refactor was not necessary to DRY up the code,
since the post list is only used on the home page (at least for now).
It's more that too many levels of indentation make me anxious 😅,
so I pulled that chunk out to make it easier (for me!) to debug
when I inevitably access some YAML data incorrectly and break the build.

This next feature I wanted was to render the author's name
(and other info like pronouns and website)
in the Recent posts list and on individual posts.
Here's how I set that data up in the post front matter:

```diff
  ---
  title: "Introducing ADHDevOps.club!"
  date: 2021-04-30T10:56:31-07:00
  slug: introducing
  tags: ["community"]
+ author:
+   name: Shelby Spees
+   url: https://shelbyspees.com
+   pronouns: "she/they"
  ---
```

I needed to update both the Recent post list and the single post layout
to access this new data in the front matter.
With three new parameters to check for, I felt better pulling the code out
into a new
[`post-meta` partial](https://github.com/adhdevops/ezhil/commit/2279f8b823adc1d07c1c6f96e242c951786b5255):

```html
<section class="meta">
  <date>{{ dateFormat "1 Jan 2006" .Date | upper }}</date>  
  {{ if .Params.Author.name }}
  &nbsp;·&nbsp;
    {{ if .Params.Author.url }}
      <a href="{{ .Params.Author.url }}">
      {{ .Params.Author.name | upper }}
      </a>
    {{ else}}
      {{ .Params.Author.name | upper }}
    {{ end }}
    {{ if .Params.Author.pronouns }}
        ({{ .Params.Author.pronouns }}) 
    {{ end }}
  {{ end }}
  {{ if .Draft }} <span class="draft-label">DRAFT</span> {{ end }}
</section>
```

(TODO more content here)

Finally, I removed Disqus entirely---I've never used it.
If I want to add comments I'd rather try (FIXME this new service)
that has you sign in via GitHub, which IMO would be the smoothest experience
for the site's target audience: very online tech workers.

## Project maintainers have a responsibility

I think the main thing that frustrates me about all this
is the lack of accessible themes on this list.
Hugo is still wildly popular, and in listing themes on the website
they're tacitly recommending that people create new sites with them.

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

And if you come across better lists of Hugo themes than what's on the Hugo site,
hit me up so I can share them.
I don't expect the average new-Hugo-site-creator to bother looking anywhere
besides the main Hugo site when searching for themes,
but maybe we can make more accessible alteratives rise up in search results.
