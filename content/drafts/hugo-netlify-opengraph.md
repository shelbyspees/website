---
title: "Using Netlify Functions to generate OpenGraph images for my Hugo site"
slug: hugo-netlify-opengraph
draft: true
tags:
  - hugo
  - social media
  - netlify
---

TODO.

<!--more-->

## Creating a template

## Generating the images

Now I needed some sort of script to fill in my template file
with the relevant data from each page.

## Gluing it all together with Netlify Functions(?)

One thing I wanted was for Netlify to generate and store all these images for me
so that I wouldn't need to manually create and store them myself.
If I updated the template, I wanted Netlify to regenerate them all on deploy,
or dynamically for each new request.
The former seems more efficient than the latter.
