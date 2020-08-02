---
title: "Sending Telemetry: when things take place"
draft: true
---

You may often get questions like

> What’s the difference between an agent like ddagent or ddtrace, a log collector, or a packages like the beeline integrations or OTel?

To be able to compare these tools, it can be helpful to understand some things about the software development process. Where do they fit into a software engineer’s workflow?

## Software development, in general

This is mostly referencing stuff we do in web services, but it can apply to other types of software as well.

### Writing code

Adding dependencies

- OTel
- beeline
- ddtrace package

Instrumenting individual pieces of logic

### Configuration

Chef  
installing languages, packages, etc.

### Deploys

install agents

### Running a service

receiving requests from the internet  
returning responses back to the internet  
talking to other services (S3, MySQL db, Redis, etc.)  
generating events, logs, metrics data

### Analyzing data

this is what we do in the Honeycomb UI!
