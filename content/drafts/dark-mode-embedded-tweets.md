---
title: "Dark mode for embedded tweets"
date: 2020-09-27T18:53:59-07:00
draft: true
images:
tags:
  - hugo
---

My latest adventure in customizing my Hugo site
has involved a teensy bit of janky-ass JavaScript.

<!--more-->

It's been bugging me ever since I changed to the blog theme I'm using now
(called [hello-friend-ng](https://github.com/rhazdon/hugo-theme-hello-friend-ng)).
There's a black-and-white cookie looking icon in the top menu bar
that toggles dark mode on and off for the entire site.
Great, right? Let people choose the mode that's easiest on their eyes.

Except that all my embedded tweets (of which I have many)
remained a blazing white even when the rest of the site was in dark mode.
Sorry, readers.

![Screengrab of Shelby's DNS don't real blog post. The blog site is in dark mode but the embedded tweet has a light theme.](https://p-81fa8j.b1.n0.cdn.getcloudapp.com/items/E0urWEy9/Image%202020-09-27%20at%207.21.23%20PM.png?source=viewer&v=37d1e1f1210b4cc5d123331d70803e46)

![Screengrab of Shelby's Feedback is a gift embedded twitter thread. The blog site is in dark mode but the embedded tweets have a light theme.](https://p-81fa8j.b1.n0.cdn.getcloudapp.com/items/ApuL6OXj/Image%202020-09-27%20at%207.21.10%20PM.png?source=viewer&v=f60d514753e4bfcdd976cf97e955c3f4)

Well I knew that [Twitter's publish service](https://publish.twitter.com/)
offered some tweet customization, so last night I checked:
it turns out you can, in fact, set the theme to dark mode globally
using a `meta` tag
([source](https://developer.twitter.com/en/docs/twitter-for-websites/webpage-properties)):

```html
<meta
  name="twitter:widgets:theme"
  content="dark">
```

After trying to stick this in a few different places,
I remembered that `meta` tags go in the document `head`,
so I put it there just to test that it works globally.
It did! Now to figure out how my theme's dark mode toggle works.

It's recommended to maintain Hugo themes as git submodules
within the `theme/` directory,
so I maintain my fork of the `hello-friend-ng` theme
in a separate repo from my main website repo.

In six years of programming I've never so much as
implemented a button in JavaScript,
so I first looked in the theme's SCSS files.
For some reason I thought CSS was sufficient
for the actual toggling part of dark mode,
not just setting the values for it.
LOL.
Anyway, here's what that looks like for the `body` element:

```scss
// assets/scss/_main.scss
body {
  // blah blah...
  &.dark-theme {
    background-color: $dark-background;
    color: $dark-color;
  }
}
```

Which pulls from our dark theme variables:

```scss
// assets/scss/_variables.scss 
/* dark theme colors */
$dark-background: #292a2d;
$dark-background-secondary: #3b3d42;
$dark-color: #a9a9b3;
$dark-color-secondary: #73747b;
$dark-border-color: #4a4b50;
```

Then I thought to look in the `js/` folder and what do you know?
There's a [`theme.js` file](https://github.com/shelbyspees/hugo-theme-hello-friend-ng/blob/9474c646ca72d814c0100bf5f63cc798fd85b5ca/assets/js/theme.js) right there. Cool.

{{< highlight javascript >}}
// assets/js/theme.js
// Toggle theme

const theme = window.localStorage && window.localStorage.getItem("theme");
const themeToggle = document.querySelector(".theme-toggle");
const isDark = theme === "dark";
var metaThemeColor = document.querySelector("meta[name=theme-color]");

if (theme !== null) {
  document.body.classList.toggle("dark-theme", isDark);
  isDark
    ? metaThemeColor.setAttribute("content", "#252627")
    : metaThemeColor.setAttribute("content", "#fafafa");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  window.localStorage &&
    window.localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-theme") ? "dark" : "light"
    );
  document.body.classList.contains("dark-theme")
    ? metaThemeColor.setAttribute("content", "#252627")
    : metaThemeColor.setAttribute("content", "#fafafa");
});
{{< / highlight >}}

Now I kinda get why people go wild with JavaScript--it's way easy
to manipulate the DOM this way.
I was raised on a strict regimen of semantic HTML
with some SASS/SCSS thrown in--I dropped out of
my online program's "Introduction to Web Development" class
right before the JavaScript module,
but I did all the reading up to that point!

Let's see... Yep,

```html {linenos=table,hl_lines=[16]}
<header class="header">
    <span class="header__inner">
        {{ partial "logo.html" . }}

        <span class="header__right">
            {{ if len .Site.Menus }}
                {{ partial "menu.html" . }}
                <span class="menu-trigger">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                    </svg>
                </span>
            {{ end }}

            <span class="theme-toggle unselectable">{{ partial "theme-icon.html" . }}</span>
        </span>
    </span>
</header>
```

![gif showing the addition and removal of the dark-theme class when toggling the blog's dark mode on and off](https://p-81Fa8J.b1.n0.cdn.getcloudapp.com/items/12ur91Dx/Screen%20Recording%202020-09-27%20at%2008.29.27%20PM.gif?v=b90f4157bba6c241ae80bde30052903c)

https://github.com/shelbyspees/hugo-theme-hello-friend-ng/blob/204f123261ede2bf7a099ed033660acf1a525844/layouts/partials/head.html#L39
