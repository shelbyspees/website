---
title: "Overwriting Hugo Themes"
slug: themes-i-tried
# date: add date when ready to publish
draft: true
images:
tags:
  - untagged
---

One thing to know about Hugo is that themes are traditionally set up
by adding them to your site repo as [Git submodules]().
More modern themes allow you to import them as [Go/Hugo modules](),
but the themes I was looking at hadn't been updated in several years.

## The themes I looked at

The first theme I picked was [Book](https://themes.gohugo.io/hugo-book/).
I was imagining that the ADHDevOps site would eventually grow
into a sort of wiki, a reference guide for
all the great ADHD content and tools out there.
I thought a site more oriented toward technical documentation made sense,
and I liked how the Book theme behaved like a sort of blank slate.

Unfortunately, this theme kept pretty much all its content
under a hard-coded `/docs` path.
To remove `/docs` from the URL
I would have had to overwrite nearly all the layouts!
(Now that I think about it, there's probably a way to fix this
using the site config...welp too late now.)
At this point I'd only published the site's intro post,
so even though I already knew I wanted to change the theme
I let it sit for a week and chewed on how to proceed.

Then I was looking at [Anubis]().
This is the theme used as an example in Hugo's quick start documentation.
I was _hoping_ this would mean that the theme would be flexible
and meet accessibility standards.
Yeah no.

I briefly considered [???]() alongside Anubis
After editing the layouts a bit and rebasing to isolate theme-specific changes,
I set up branch deploys for each and decided I liked Anubis better.
Plus, ??? would have required even more custom layout and styling
than either Book or Anubis---(???)'s color contrast was abysmal.
I was really trying to avoid overwriting all the CSS.
Oh, sweet summer child...

In comparison, Anubis met slightly more of my requirements.
The dark/light theme toggle was great,
plus it only required a single-line config change to enable.
While the color contrast in dark mode was slightly _too_ high,
it was easy enough to overwrite the background color to make it more muted.
I didn't love the top navbar but I didn't want to overthink it either.

Unfortunately, Anubis didn't spark joy.
I felt the urge to keep searching for the perfect theme.

The next day I found [Ezhil]().
I've always been a fan of the [Raleway font]()---I've since updated
the body font on my personal site to use Raleway as well.
I tried Ezhil out on localhost and it felt _right_.
Unfortuntely it was a Monday and I had actual work to do.
The new theme sat uncommitted in my index for a week
before I carved out my Saturday afternoon to try deploying the change.

Migration isn't a huge deal on simple Hugo sites,
but I had just spent the previous weekend overwriting layouts
for two entirely different themes.
I had custom code everywhere.
I generally don't mind deleting code that much,
but after all that fiddling I wanted to feel confident about my choice.

After several hours of overwriting layouts and CSS once again
(this theme didn't even use a preprocessor!)
and getting annoyed about `<div class="main">`,
it finally hit me: no theme is going to check all my boxes.
I'm just too picky.

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
