---
title: Deploys
weight: -1
---

## What is a deploy?

I'm pretty sure the term "deployment" stems from the military term, when you send troops to some location for some purpose.
In software we use "deploy" to mean "get this version of the code running in that environment over there."

After a developer makes a change to a program, deploying that change means moving the changed code to the target environment and then starting it up, which makes that change available to the program's users (either humans or other programs, if it's an API service).

On MySpace, editing your profile HTML and CSS was your development work, and hitting the "save" button would deploy your changes.
If you've done this, you've successfully deployed code to production!

Back in the "old days" of hosting websites, this looked like [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol)ing (a type of file sending protocol) your code file directly to a live production server. Say your previous `index.html` looked like this:

```html
<title>Hello world!</title>
```

And your new version looks like this:

```html
<title>Hello world! I'm Shelby.</title>
```

You would run some kind of command like, `SEND index.html` (not a real FTP command) which would copy the file from your local machine and send the copy to your production machine.
Since we're just talking about raw HTML, we'd see the change immediately 🎉

## Deploying web services

Most modern websites aren't just static HTML files though.
They're web applications, which require a running software program to handle user interactions and backend logic.
So how do we deploy a change if our webapp is running?
The simplest way is to turn it off and on again.

Similar to our above HTML example, we copy the desired files to our target environment, stop the running program, and then restart it with the new files.
Most deploy processes do a version of this using bash commands--even teams using fancy CI tooling!
Even the Chef `deploy` resource (now deprecated) just runs some shell commands underneath.

## Preventing downtime

For some teams, their reliability requirements are too strict to allow the basic restart version of deploying changes.
There are a few strategies these teams will use to ensure that deployments don't negatively impact user experience.

### Blue-green deploys

Blue-green deploys require two identical versions of your service's production environment.
At any point in time you're sending traffic to one: either the blue environment or the green environment.
Let's say you're currently sending traffic to blue, and you want to deploy a change.
You deploy your code to green, make sure the deploy succeeds across the entire environment, and then update your load balancer to start sending traffic to green (and stop sending to blue).

The next time you deploy, you'll keep sending traffic to green while you update the code in blue, and then once blue is ready with the change, you update your load balancer to send traffic to blue.

Waiting for the deploy to succeed and only redirecting traffic via the load balancer prevents any downtime from having to stop and restart your running program while it's trying to serve traffic.
You can configure blue/green deploys at the network level, with two different server clusters, or at the individual server level, with something like Nginx or HAProxy to handle internal load balancing directing traffic to blue and green processes.

### Build artifacts and orchestration

Another way to prevent downtime during deploys is to never do in-place deploys at all. Rather than stopping and restarting your running program on the same server, you spin up new servers with the new version of your code, and then update your load balancer to point to those new servers.

This is one of the ideas with Kubernetes--although you don't need to use Kubernetes to accomplish this, it does make the orchestration part a bit easier if you really need it.

Build artifacts can look like a number of things. In Go and Java, you can build an executable that you then deploy to your target environment and start up. Docker allows you to create a container that holds your program's code and dependencies so that it's pre-configured and ready to run when it arrives in the target environment. Virtual machines (VMs) can also accomplish this, although it works a bit differently in practice. [AMIs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) are a form of virtual machine image, and it's common for teams on AWS to build AMIs that are pre-configured and have some pre-installed dependencies.

Once you have your build artifact, you need to determine how it's going to get deployed and get traffic served to it.

As I mentioned above, deployment here looks like spinning up brand new servers (or "nodes" in Kubernetes-land) with your build artifacts (probably containers or VMs, not so much Go or Java executables), and then waiting for them to be healthy. Once you've determined that they're healthy, you can then update your load balancer to start sending traffic to the new servers/nodes.

It all sounds very nice and doable, but there are a lot of moving parts. You need your build process and orchestration tool to

- build your containers or VMs
- spin up new servers with the new artifacts
- check that the new servers are healthy
- update the load balancer to point to the new servers

and probably other stuff I'm forgetting.
It can get very complex very quickly, so if you don't have the kinds of reliability requirements that necessitate all this work, it's best to keep it simple.

## Deploy tooling

Continuous integration (CI) tooling is often used for a number of build and deploy steps.

The idea with continuous integration is to run tests on every change before it gets promoted to a later deploy step, and preventing the deploy if the test suite fails. 
On top of that, it's common to run build steps on a each change that passes the tests, to make sure it builds successfully.

Teams got clever, though, and realized that they could just run arbitrary code in these CI environments.
They started developing build-and-deploy pipelines to deploy their build artifacts for each change that passes CI.

If you automatically run your code through a build-and-deploy pipeline like this for each commit on your main branch, that's called "continuous deployment."

Note that the original meaning of the term "continuous integration" isn't super closely related with what most people actually do with their CI tooling. 

## Deploy vs. release

Traditionally, deploying and releasing take place in the same step.
You push an update to your code, you deploy that new code, it starts up, now with the update.

However, modern tooling allows us ways to separate those two changes, and this is great for reliability.
The primary way teams separate deployment from release is by using feature flags.

TODO.
