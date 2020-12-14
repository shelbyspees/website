---
title: "How to set up Twitter cards for your Hugo site"
date: 2020-12-13T18:41:54-08:00
tags:
  - hugo
  - meta
  - twitter
---

My [Hugo](https://gohugo.io) site is basically for vanity. So of course when I linked to one of my blog posts on Twitter today and the unfurl was super ugly, I had to go and fix it.

<!--more-->

![Screenshot of a tweet from Shelby that says "Yuuuup" and links to her blog post "On Tech Management." The image displayed in the Twitter card is an awkwardly-cropped version of Shelby's Nova ears logo from her website.](https://i.imgur.com/bSr2n2T.png)

Grody.

So how to fix? First we need to connect the dots on how this unfurl happens.

## What are social cards?

An occupational hazard of doing devrel and technical marketing is that you learn that companies do a lot to optimize how their links look on social media.

For any particular image post, you need to create multiple sizes so the image shows up correctly on each platform: Twitter vs. Facebook vs. LinkedIn vs. Instagram, etc. The best aspect ratio for Instagram is a square, but these other platforms couldn't agree on a standard aspect ratio or image size so the burden is on you to adjust for each one. Thankfully, there are [helpful articles from SEO people](https://sproutsocial.com/insights/social-media-image-sizes-guide/) that list all of the varying sizes.

Size is important for image quality, sure, but you can't just throw in a giant .png and call it a day. Aspect ratio is critical when the image contains text that you don't want to get cut off, like event details. Brands also care about less critical things like spacing and alignment, because bad visual flow can reflect poorly on the company. Priorities differ--image margins are less important when I'm Joe Schmoe Developer and more important when I'm Microsoft or Coca-Cola, but it's good to be armed with such knowledge.

If you think making different image sizes for each platform sounds like a pain in the ass, you'd be correct. Thankfully, tools like [Canva](https://www.canva.com/) and [Adobe Spark](https://spark.adobe.com/) make this easier. Visual designers can create templates that marketers can fill in with content and export in the various sizes. Developers can attach the exported image assets to the original source website, or marketers can manually add the images to social posts on each platform. My company creates social posts the second way, uploading the image to [Hubspot](https://www.hubspot.com/)) because we often want to customize the image and post content separate from the link. What I'm trying to do for my blog is the first way--having an image live in my website's files so that social platforms (specifically Twitter, in this case) can grab it for the unfurl every time my link is shared.

## Twitter cards

So for any link dropped into a tweet, Twitter will look at content of that page and try to grab relevant information to display in the unfurl--called a [Twitter card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards). Twitter also has a handy [Card Validator](https://cards-dev.twitter.com/validator) tool for checking how your link unfurl will look before you hit "publish" on a post. Here's what it looks like for Google.com:

![Twitter card validator preview for Google.com, showing the link unfurl with the Google logo decorated for the holidays](https://i.imgur.com/DLy21nM.png)

The validator also gives you a handy log from the JavaScript that's grabbing the page metadata:

```log
INFO:  Page fetched successfully
INFO:  17 metatags were found
INFO:  twitter:card = summary_large_image tag found
INFO:  Card loaded successfully
WARN:  this card is redirected to https://www.google.com/
```

Looking at the preview for my website:

![Twitter card validator preview for shelbyspees.com, showing the link unfurl with the awkward Nova ears logo](https://i.imgur.com/t6nAf5L.png)

I get mostly the same info, although without the redirect warning:

```log
INFO:  Page fetched successfully
INFO:  15 metatags were found
INFO:  twitter:card = summary_large_image tag found
INFO:  Card loaded successfully
```

So where is it getting this `twitter:card = summary_large_image` tag it says that it found? The previous line gives us a hint: `metatags`. Let's open up Chrome devtools.

![shelbyspees.com with Chrome devtools open, highlighting the Twitter meta tags](https://i.imgur.com/r8YpjsQ.png)

I highlighted these four `meta` tags because they correspond to the info displayed in the Twitter card preview:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://shelbyspees.com/nova-ears.png">
<meta name="twitter:title" content="shelby spees">
<meta name="twitter:description" content="shelby spees: developer advocate, dog mom, etc.">
```

The first one says [`summary_large_image`](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image) and it seems to be pointing to `nova-ears.png`, which is the image on my website's my home page. But like, where did all this get defined? I don't remember specifying anything for Twitter.

## Hugo Twitter cards

Oh wait nvm, [apparently](https://github.com/shelbyspees/website/commit/6aad7d3cbea17ccbf618c652f0560fb33b1af0f0) I thought I knew what I was doing.

![screenshot of commit on GitHub titled 'Add Google Analytics and Twitter card info'](https://i.imgur.com/mxFV3vl.png)

Well sometime between September 22nd and December 8th, I forgot that I had done that. I guess at the time I got frustrated and gave up? Then last week I made a [post about being on Screaming in the Cloud](/2020/12/08/i-was-on-screaming-in-the-cloud/) and was reminded by my RSS feed tweeting about it:

![twitter thread. first tweet is a link to Shelby's blog post 'I was on Screaming in the Cloud.' second tweet is Shelby saying, 'ugh I really need to fix that social image'](https://i.imgur.com/7T93twV.png)


That's when I finally bothered to look into it (evidently not for the first time) and (re)learned: [Hugo supports Twitter cards out of the box!](https://gohugo.io/templates/internal/#twitter-cards)

The docs say that the `_internal/twitter_cards.html` template grabs the image path from my site's config file, in the `images` list under `params`, which is what I set in the commit I shared above:

```toml
[params]
  defaultTheme = "light"
  homeSubtitle = "developer advocate, dog mom, etc."
  mainSections = ["posts"]
  showReadMore = true
  gitUrl = "https://github.com/shelbyspees/website/commit/"
  description = "shelby spees: developer advocate, dog mom, etc."
  images = ["/nova-ears.png"] <-- this one
```

Since `nova-ears.png` is square, it ends up looking super wonky in the `2:1` ratio of the Twitter card. I'm going to have to replace it.

## Hugo layouts

To be honest though, I still felt the need to connect the dots a bit more. Where in [my theme](https://github.com/rhazdon/hugo-theme-hello-friend-ng) is this getting used? (Note: I keep my theme as a git submodule separate from the main content of my website.)

Thankfully I know Hugo enough to start in my theme's `layouts/` folder. You would think to go to [`layouts/index.html`](https://github.com/rhazdon/hugo-theme-hello-friend-ng/blob/master/layouts/index.html), but Hugo templating means things are split up a bit more. There's a layer of template beyond that, under `layouts/_default/`:

```shell
$ ls -1 layouts/_default
baseof.html
list.html
single.html
```

The one we want is `layouts/_default/baseof.html`, which we can confirm because it starts with `<!DOCTYPE html>` and goes on to include the `head` tags:

```html
<!DOCTYPE html>
<html lang="{{ .Site.Language }}">
    <head>
        {{ partial "head.html" . }}
    </head>
```

(To be honest, it's not immediately clear from the content of `layouts/index.html` that it's using `layouts/_default/baseof.html` under the hood. I've learned a lot of Hugo templating logic just by poking around and adding `testeststests` and `Shelby was here` in random spots to see where it showed up.)

That `partial "head.html"` bit is our next clue. Hugo, like other templating engines, supports the use of [partial templates](https://gohugo.io/templates/partials/), which are like modular mini-templates that you can import into other templates. Looking at `layouts/partials/head.html`, there it is on [line 40](https://github.com/shelbyspees/hugo-theme-hello-friend-ng/blame/2f863e7ba67e6f12c53e394b8aee198bcaac2e6b/layouts/partials/head.html#L40):

```html
{{ template "_internal/twitter_cards.html" . }}
```

Awesome! The theme developer put the internal Hugo Twitter card template there so I don't have to! That explains how I got it working to begin with. Now to update the image so it actually looks pretty.

## Creating a Twitter card

I could have used a regular full-sized landscape image, but tbh I'll take any excuse to use Canva. I did warn you about the vanity.

![Canva app in edit mode showing the Twitter card for shelbyspees.com, which features a selfie of Shelby and Nova](https://i.imgur.com/5xMdCfx.png)

That's my new favorite picture of Nova and me together <3

At this point I just needed to download it from Canva and add it to my `static/` directory in my repo, and then update `config.toml`:

```diff
-  images = ["/nova-ears.png"]
+  images = ["/twitter-card-large.png"]
```

Now we can see it on Twitter!

{{% tweet 1338312673750970368 %}}

The aspect ratio isn't _quite_ right, unfortunately (Twitter's docs lied about it being 2:1). But it's a big improvement! And we still get the Nova ears logo. Hooray! 🎉
