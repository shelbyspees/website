---
title: Instrumentation
---

## what is instrumentation?

Think about a car's instrument panel: it gives you information about the internal state of your system. Instrumentation is code or tooling that you add to your system in order to gain insight into its internal states.

Instrumentation generates _telemetry_ data. Telemetry is a term I first learned from the aerospace industry. In that context, telemetry referred to the various data coming from a rocket or satellite on its state, location, etc.

Software telemetry comes in a number of forms, and each form requires different approaches to instrumentation.

## logs

Logs are the original software telemetry. They're just strings written to terminal output or more commonly, to a file.
If you've printed some value to the console while trying to debug some code, you've generated a log line.

Standard libraries in most languages have basic logging capabilities with some built-in features like string formatting and error message propagation. Many frameworks will have more sophisticated logging functionality included, or you can add external logging packages to your project if you're looking for specific features.

Here's an example of a standard language log line: (add example)

Flat logfiles are generally best for answering highly contextual questions where you generally already know where to look.

Generic log lines have no standard format, just a surplus of conventions that vary among languages, libraries, and projects. The lack of standardization makes logfiles difficult and expensive to try to parse and search when debugging or investigating an incident. It's even more difficult to use flat loglines to find trends over time.

Conversely, structured logs open the door for event-based telemetry, which I'll discuss at the end.

## metrics

A metric is a single axis of data that can be stored as a number: count, rate, percentage.

Your car's instrument panel is a great source of real-time metrics: speed, RPMs, temperature.

Unlike your cars instrument panel, though, where it doesn't make sense to track change over time, monitoring tools often feature dashboards with graphs of your metric's value over time. Imagine that your passenger is watching your instrument panel while you drive, marking down your current speed at every minute on the dot. Here's a table of what that would look like:

(time, value)

And here's how that would be graphed:

[image]

These `time, value` tuples are exactly how metrics are stored.

(That's where we got the name "dashboard" from in the first place!)

### statsd 

Modern metrics in software were popularized by statsd of Etsy fame.

statsd uses UDP instead of TCP to be able to cheaply send metrics data to the target monitoring service. While TCP has a slower and more complex handshake, the `time, value` tuples can be sent eagerly without requiring a handshake to verify success. If packets are dropped, the monitoring service can fill in the blanks based on empty slots in the timeline.

## traces

TODO

## events

TODO
