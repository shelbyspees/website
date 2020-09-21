---
title: "DNS don't real"
date: 2020-09-20T14:18:30-07:00
featured: "https://p-81Fa8J.b1.n0.cdn.getcloudapp.com/items/p9uGWyz9/shelbyspeesdotcomstatus.jpeg"
featuredalt: ""
tags: [meta, configuration]
---

Last month I renewed my `shelbyspees.com` domain on Namecheap, and I opted for the PremiumDNS feature as well. I wasn't really sure what it was, but it sounded useful. That was the beginning of my downfall.

<!--more-->

## How it started

It was the Sunday before Labor Day.

{{% tweet-single-center 1302689874676334592 %}}

I'm pretty sure this is how it played out: I was working on the 
<a href="https://old-notes.shelbyspees.com/notes/" target="_blank">Notes section↗️</a> of the old version of my site, and I was getting tired of typing out my full name every time I wanted to check things in prod. Seeing other people's cute `.dev` domains made me jealous (I especially like <a href="https://nikema.dev/" target="_blank">Nikema's↗️</a>), so I went to Namecheap to check how much it would be to get one for myself.

While I was there, I clicked around my dashboard and noticed that the PremiumDNS service I paid for is switched off:

![screengrab of Namecheap domain management setting with PremiumDNS switched off](https://p-81Fa8J.b1.n0.cdn.getcloudapp.com/items/L1uJqbwn/Image%202020-09-20%20at%202.34.14%20PM.png)

So obviously I switched it on. Who wouldn't? I already paid for premium features, I should use them.

This, by my understanding, re-enabled the Advanced DNS records I had set up previously to point to the GitHub Pages version of my site, which no longer exists. Which means that the SSL cert doesn't exist either. Hence, errors.

I do think that when I originally switched from GitHub Pages to Netlify in June? July? I did actually set up the nameservers correctly in Namecheap:

![Namecheap nameserver configuration using Custom DNS and pointing to four nameserver addresses](https://p-81Fa8J.b1.n0.cdn.getcloudapp.com/items/jkuZxpNb/Image%202020-09-20%20at%202.38.24%20PM.png)

I remember being impressed by how easy it was. But in re-activating my Advanced DNS records, I messed everything up.

{{% tweet-single-center 1302716859595198465 %}}

Turning on PremiumDNS so casually meant that I didn't have the context spooled up to properly debug the problem. (Btw: this is one of the arguments for configuration as code and I'm solidly behind it.)

Wow, now that I'm writing this blog post I'm realizing that Koenraad gave me basically the entire answer like, weeks ago when I first broke things:

{{% tweet-center 1302766776862871552 %}}

My understanding at the time was that Koenraad's approach would support neither Namecheap PremiumDNS nor the subdomains I'd just set up for my notes and speaking site.

{{% tweet-single-center 1302767104500924416 %}}

Since I'd just set up those subdomains in Namecheap so I wasn't ready to sacrifice them. And I wanted to get my $4.88 worth of PremiumDNS for the year!

Have I mentioned that this is the most I'd ever thought about DNS up until that point? At least I got to enjoy how bad things would look to someone visiting my site:

{{% tweet-single-center 1302717278841049088 %}}

I doubt I could get away with arguing that it was intentional, lol.

{{% tweet-center 1302719514371477504 %}}

Yeah, not a good look.

## Testing in prod

DNS is one of those things that you can really only test in prod. Most teams get it right early on and then never make changes (sometimes copying existing configs), so if you're joining a team with an established domain setup then there aren't many opportunities to play with it. That's the excuse I'm making for myself, anyway.

{{% tweet-center 1306646532469465088 %}}

I fixed it eventually, that must count for something, right? I only made about 50 random changes along the way 😓 (no, I'm not proud of that).

{{% tweet-center 1306452481958838272 %}}

The night before that tweet, I had gotten my site to load on mobile, and a couple other people were able to confirm that it loads. I think it was indeed a caching issue at _some_ point. But more than anything, I broke the config.

By the way, Namecheap support was amazing through all of this. They proactively reached out to me multiple times on Twitter.

{{% tweet-center 1306456427884695553 %}}

The support person I messaged the next day had to put up with me being randomly unresponsive because I was trying to talk to them and make changes while also attending meetings on Zoom. They still managed to teach me things! A few different people were managing the Twitter account and all of them were great, but I want to especially appreciate this person:

{{% tweet-center 1306644412525617153 %}}

That made my day.

## Learning curve

I'm slow to make sense of things until I understand how all the parts interact as a system.

{{% tweet-single-center 1302753865586995200 %}}

The Namecheap support person I chatted with on Thursday helped me confirm my understanding of where things needed to happen:

{{% tweet-single-center 1306643891928485891 %}}

I think before I was basically like, "Well why would I need to do any configuration in Netlify? That's what Namecheap is for."

But behind the scenes, these are just web services. There's some database or something that keeps track of what domains map to what. There's nothing special about Namecheap that means they get to handle domain stuff and Netlify can't (or if there is, it's not related to any of what I was trying to do).

With the support person's encouragement, I finally went into Netlify to try to set up the CNAME records for my `notes.` and `speaking.` subdomains there. Results were near-instantaneous.

{{< tweet-single-center 1306840682321965056 >}}

I've converted the rest of that thread into a blockquote here (with minor edits):

> So if I'm understanding correctly, domain registration is a separate thing from DNS resolution.
> Namecheap handles the former and Netlify handles the latter.
>
>This whole time I thought the resolution happened on the Namecheap side.
>I looked at Netlify's DNS settings page and thought, oh I don't need this lol.
>I'm trying to map this to the things I've touched in Route53, but there I'm usually just copying the settings from existing stuff.
>I remember poring over docs about DNS record types like, years ago, and none of it stuck.

And that's kind of the thing, these lessons don't click for me until I'm really focused and invested. Meanwhile, I have to work extra hard to make sure my knowledge gaps don't trigger my imposter syndrome.

{{< tweet-center 1306845037511061504 >}}
{{< tweet-center 1306847600662818816 >}}
{{< tweet-center 1306851474035453952 >}}

(Yes, I'm forever taking credit for that.)

## That's all, folks!

So that's the story of my recent lessons in some super elementary "wtf do these services even do?" DNS.

Remember: nameservers are special. And it's always DNS.
