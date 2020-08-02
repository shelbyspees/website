---
title: Configuration
---

## Configuration vs. provisioning?

Once again, ops folks are using borrowed terms from the military.
Provisions are the supplies that soldiers are given for a specific mission (TODO confirm this).

In software, we talk about provisioning _servers_ so that they are set up with the configuration and dependencies they need in order to serve their purpose.
This purpose is running whatever program we've decided we want the server(s) to run.

Side note: I don't often use the verb "provision" for some reason, I find it easier to say "configure."
There's probably people out there with strong feelings about when to use which.

Provisioning may involve more downloading and installing, and at the end the server is alive and running, ready to start serving its purpose. Checks out.

## What are you configuring?

The hard part of configuration is less about the configuration itself and more about what you're trying to accomplish with the configuration.

When I first started working with Chef code, I didn't really understand the _purpose_ of the code.
What's this Nginx recipe for? What's this Datadog cookbook doing?
Why do we need all of this?

My problem here wasn't that the Chef code was hard to understand.
It's that I didn't know what Nginx was for, what Datadog was for, or why we'd configure any of these things to behave in a specific way.

Making a decision about how to configure something requires understanding the domain, the thing you're configuring.
So if you want to set up an Nginx configuration using Chef, you need to know what Nginx configuration you'd want without Chef.
Chef is just there to glue things together (_idempotently_ ["EYE-dem-POH-ten-lee"]--we'll get to that).

## Configuration as code

Configuration-as-code tooling like Chef and Ansible uses your configuration-code as a blueprint and checks to make sure the reality of your server's configuration matches the blueprint you wrote in your code.

Let me describe some of the problems we're trying to solve with configuration-as-code.

In the "old days" of sysadmins hand-configuring servers, well, that's very tedious and error-prone work.
This kind of work is called _toil_, a term that was popularized by the foundational Google SRE book.

So to reduce toil, our sysadmins wrote some scripts to configure similar servers following the same steps.
Unfortunately, sometimes an operation would fail in the middle, and our sysadmins learned that certain operations aren't safe to run multiple times--e.g. creating a new file.

So our sysadmins did a bunch of work to wrap those operations in conditionals, for example:

```ruby
create config_file unless config_file.exist?
```

Now they could safely run the same script a whole bunch of times, which is especially important in case an operation fails midway through the script. As a bonus, they can run the scripts proactively to revert config drift from manual changes.

The term for this--being able to run the same thing twice safely--is called _idempotency_ ("EYE-dem-POH-ten-see").
This is not an easy thing to do, and I'm grateful to the smart people at Chef and Hashicorp who've done amazing work to handle the idempotent logic for us so that we can focus on solving core business problems.

In practice, many teams will set a [cron](https://en.wikipedia.org/wiki/Cron) to run their configuration code e.g. every hour or every 30 minutes to make sure the reality on the server matches what's in the code.
And because it's code, teams can keep their configuration under version control, which opens the door for commit history, peer review, build tooling, and other modern software safety practices.
