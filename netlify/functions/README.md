# Netlify Functions for spees.dev

## Open Graph Images

I'm testing things at a few different levels as I meander through.

Intro to JS:

- Can I manipulate the DOM with vanilla JS in my browser?
    - You're calling the script correctly, Shelby! You were just accessing the wrong property.

Neat script things:

- Can I run this as a node script?
- Can I launch the headless browser?
    - I got this working for [shelbyspees/og-script](https://github.com/shelbyspees/og-script) the other day
    - I'm not sure I ever got it working for the version in this repo
    - May be helpful: https://github.com/alixaxel/chrome-aws-lambda/wiki/HOWTO:-Local-Development
- Can I get the headless browser to load my HTML template?

Netlify Functions:

- Can I launch the headless browser with [`netlify dev`](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment)?
- Can I trigger the script via a build step in Netlify?

Using the template:

- (MVP version with pre-generated images) Can I walk all the pages on my website and generate an og-image for each?
- Can I grab the page data and fill out my template with it?

### Someday

I'd like to set up an API endpoint to generate these images on the fly
the way GitHub and Dev.to do it.