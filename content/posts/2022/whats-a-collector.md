---
title: "OpenTelemetry: what's a Collector and why would I want one?"
slug: opentelemetry-whats-a-collector-and-why-would-i-want-one
date: 2022-02-22T22:27:36-07:00
images:
tags:
  - software
  - complex systems
---

There have been several talks and numerous docs, but most people in tech probably haven't heard of the [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/). Let's fix that!

OpenTelemetry (abbreviated "OTel") is a shared effort between the community and observability vendors to establish a common specification for telemetry in software systems: traces, metrics, and logs. The OTel Collector is an application that allows you to process that telemetry and send it out to various destinations. I first encountered it in my previous role, at [Honeycomb](https://honeycomb.io/), but it wasn't until I joined Equinix Metal and got tasked with deploying the Collector in our production environment that its many benefits really started to click for me. I hope that sharing my experience will help others along their own observability journeys.

If you're new to OpenTelemetry, tracing, or observability in general, I recommend checking out the [Observability 101 post](https://spees.dev/observability-101-terminology-and-concepts) I wrote back in 2020.

## our OpenTelemetry Collector use case

If you’re using [OpenTelemetry Tracing](https://opentelemetry.io/docs/reference/specification/overview/#tracing-signal) (or [Metrics](https://opentelemetry.io/docs/reference/specification/overview/#metric-signal), or someday soon, [Logging](https://opentelemetry.io/docs/reference/specification/overview/#log-signal)) in a production software system, you may want to use the OpenTelemetry Collector.

OpenTelemetry has libraries in a number of popular languages. Each language gets an API that implements the [OpenTelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification), plus a software development kit that builds on top of the API. OpenTelemetry's SDKs include auto-instrumentation for things like HTTP and gRPC requests, database queries, and framework-specific features. Most teams using OpenTelemetry for tracing will add both the API package and the SDK package to their codebase (for languages where they're packaged separately).

If you're not using the Collector, you can configure OpenTelemetry to send traces and metrics directly from your app to your desired destination, be it a self-hosted open source tool like Jaeger or a SaaS tracing tool—assuming the data is already in the correct format. The benefit of this direct-send approach is that you don’t have to run any additional software alongside the application you’re instrumenting. There are no ports to configure, no processes to manage. The downside is that your application has to manage the entire workload of sending your data. This might not be a big deal with the small amount of trace data being generated in local development, but in a production environment running resource-intensive services, offloading the work of sending data over the network can be a huge help.

We primarily use the OpenTelemetry Collector at Equinix Metal to do exactly that: it sits between our software services and the observability tools we’re sending telemetry out to, acting as a buffer, as traffic and data volume fluctuate. With the Collector, Metal services can quickly offload traces as they're generated, reducing memory pressure and network overhead. The Collector dedicates its own resources to sending that data. This improves the resilience of both the telemetry exporting process and Metal services themselves, since we're gaining better observability with minimal impact.

## a collection of features

This buffering work is far from the only use for the Collector, though. I realized recently that the name “Collector” is almost a misnomer. It’s not a single application doing a single task (“collecting” your data). Rather, it's more like a collection of optional functionalities you can select via your configuration. You can configure the Collector to act as a router, sending different telemetry data to different destinations. You can use it to convert your data to a different protocol so that it can be read by various tools. You can use it as a sampler, dropping telemetry that’s repetitive and less useful while keeping errors and other unique and meaningful data. You can even use it to update your traces with additional attributes that your instrumented code doesn't have access to at runtime, like Kubernetes metadata.

Honestly, it can feel like the OpenTelemetry Collector is almost too configurable. With two repositories containing dozens of modules (more on that later), it can be difficult to know where to start and what you need. There are example configurations out there, but the hard part for me to grasp—especially when trying to parse random snippets of YAML—was why it's configured a certain way. Which parts are required for what I'm trying to do, and which are nice-to-haves?

Let’s walk through an example.

## configuring the OpenTelemetry Collector

As described in [the Collector's design docs](https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md) (which took me an embarrassingly long time to discover and read), a Collector configuration file has several required sections. When starting out, the main thing you want to pay attention to is the **pipelines** section.

Each pipeline contains at a minimum:

- A **receiver**: a thing that accepts telemetry data from your application
- An **exporter**: a thing that sends your telemetry data out to your desired observability tool in the correct format
- A **processor** (optional): a thing that can change the shape or content of your data before the exporter sends it out

The pseudocode for a bare-minimum pipeline config might look something like:

```yaml
# pseudocode config
# . . .
service:
  pipelines:
    my_pipeline:
      receivers: [my_app]
      processors: []
      exporters: [my_tracing_tool]
```

Unfortunately, none of the example configs I looked at when I first started out with the OpenTelemetry Collector used friendly names like `my_app` or `my_tracing_tool`. They used inscrutable names like `otlp`, sometimes repeated in multiple sections while referring to different things.

A more accurate pipeline example would look like this (note the `otlp` under receivers and again under exporters):

```yaml
# minimal-config.yaml
# . . .
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: []
      exporters: [otlp]
```

Here's a complete config for this example, including the headers required to send our data to Honeycomb:

```yaml
# minimal-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:55681

exporters:
  otlp:
    endpoint: "api.honeycomb.io:443"
    headers:
      "x-honeycomb-team": "${HONEYCOMB_TEAM}"
      "x-honeycomb-dataset": "${HONEYCOMB_DATASET}"

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: []
      exporters: [otlp]
```

It turns out that the Collector config actually _requires_ `otlp` in both places, because you need to specify the type of each component. In this case, both the receiver and the exporter will be using [OpenTelemetry Protocol](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/otlp.md) (OTLP).

Let's go through what the above config accomplishes. First, it defines a receiver called `otlp` that will accept data via OTLP on two different ports, the Collector's defaults for gRPC and HTTP. We need to define these endpoints here so that they're available to accept trace data from Metal services we've instrumented. Right now, our Ruby services send OTLP over HTTP and our Go services send OTLP over gRPC. Separately, our services read in the relevant Collector endpoint from an environment variable set by our configuration management tooling.

Next, the config defines an exporter called `otlp` to send OTLP to Honeycomb's API endpoint, which can accept OTLP directly over gRPC. Finally, the `traces` pipeline references both the `otlp` receiver and the `otlp` exporter, taking in trace data from our app and sending it out to Honeycomb with no additional processing steps. Hence, both the receiver and the exporter get called `otlp` while referring to different things.

Let's look at an example that adds a second pipeline:

```yaml
# traces-and-metrics-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:55681
  prometheus:
    config:
      scrape_configs:
        - job_name: collector-metrics
          scrape_interval: 15s
          static_configs:
            - targets: ["127.0.0.1:8888"]

exporters:
  otlp:
    endpoint: "api.honeycomb.io:443"
    headers:
      "x-honeycomb-team": "${HONEYCOMB_TEAM}"
      "x-honeycomb-dataset": "${HONEYCOMB_DATASET}"
  otlp/metrics:
    endpoint: "api.honeycomb.io:443"
    headers:
      "x-honeycomb-team": "${HONEYCOMB_TEAM}"
      "x-honeycomb-dataset": "${HONEYCOMB_DATASET}"

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: []
      exporters: [otlp]
    metrics:
      receivers: [prometheus]
      processors: []
      exporters: [otlp/metrics]
```

Here we have two receivers: `otlp` and `prometheus`. Additionally, we have two exporters: `otlp` and `otlp/metrics`.

Whoa, whoa, whoa. What's this about `otlp/metrics`??

Okay, so bear with me. It turns out that while you do need to put the type (OTLP, Prometheus, Jaeger) in the first part of the receiver/exporter name, you can add a slash and give it a custom name after that. You could name your receiver `otlp/my_app` and your exporter `otlp/my_honeycomb` if you wanted to! Most small examples won't do this, but as your configuration gets more elaborate, it makes sense to give your components these composite key names.

(Note: While it depends on your deployment strategy, you probably wouldn't want to name your receiver after your app, in case you decide later on to send data from multiple sources all to the same Collector receiver endpoint. For exporters, however, I think it makes sense to name each after its destination.)

What's new in the `traces_and_metrics.yaml` configuration is that it adds a second `metrics` pipeline that uses a receiver to read in Prometheus metrics from the OpenTelemetry Collector itself, plus a second exporter dedicated to sending that metrics data to Honeycomb (the same destination as our traces). We could add additional exporters to send this same data to a self-hosted Prometheus backend, or to Grafana, or to any number of tools. The Collector's pipelines give us a lot of flexibility in choosing what data we're capturing and where we send it.

## OpenTelemetry Collector features and pipelines

Let's look at some more configuration options. These examples build on top of the `minimal-config.yaml` example I shared in the previous section.

### memory management

The [Memory Limiter Processor](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor) enables us to define limits and checks on the Collector's memory usage. Beyond those limits, the processor will drop data or force garbage collection in order to prevent out-of-memory errors.

```yaml
# memory-processor-config.yaml
. . .
processors:
  memory_limiter:
    limit_mib: "400"
    spike_limit_mib: "100"
    check_interval: "5s"
. . .
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter]
      exporters: [otlp]
```

It's recommended that you use the [Memory Ballast Extension](https://github.com/open-telemetry/opentelemetry-collector/tree/main/extension/ballastextension) in conjunction with the Memory Limiter Processor. A memory ballast is an object you allocate to take up space on the heap in Go applications in order to reduce the frequency of garbage collection cycles. [Read how the engineering team at Twitch used a memory ballast](https://blog.twitch.tv/en/2019/04/10/go-memory-ballast-how-i-learnt-to-stop-worrying-and-love-the-heap/) to reduce latency during traffic spikes.

In the Collector config, extensions get their own section, separate from pipelines.

```yaml
# ballast-extension-config.yaml
. . .
extensions:
  memory_ballast:
    size_mib: "683"

service:
  extensions: [memory_ballast]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter]
      exporters: [otlp]
```

### resource processor

My favorite processor so far is the [Resource Processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourceprocessor). It enables us to add, remove, or update attributes on the resources (trace spans, metrics, and logs) that are passing through our pipeline. In this example, I'm adding a new field to all my spans with the key ``test-attribute and the string value `shelby was here`:

```yaml
# resource-processor-config.yaml
. . .
processors:
  resource:
    attributes:
    - key: test-attribute
      value: "shelby was here"
      action: insert
. . .
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [resource]
      exporters: [otlp]
```

At Metal we use the Resource Processor to add span attributes for Kubernetes cluster metadata and the data center facility the service is running in, thanks to our one-cluster-per-data center architecture. This data is a huge help when observing provisioning behavior in our edge clusters. Here's how it looks in our OpenTelemetry Collector config Helm template:

```yaml
. . .
processors:
  resource:
    attributes:
    - key: k8s.cluster.endpoint
      value: {{ .Values.clusterInfo.apiEndpoint }}
      action: insert
    - key: k8s.cluster.class
      value: {{ .Values.clusterInfo.class }}
      action: insert
    - key: k8s.cluster.fqdn
      value: {{ .Values.clusterInfo.fqdn }}
      action: insert
    - key: k8s.cluster.name
      value: {{ .Values.clusterInfo.name }}
      action: insert
    - key: metal.facility
      value: {{ .Values.clusterInfo.facility }}
      action: insert
. . .
```

The `.Values.clusterInfo.*` template variables get filled in by our config tooling from the same data that defines our clusters in the first place. This implementation is very specific to our internal configuration tooling and our Collector deployment strategy, so your mileage may vary. Still, I'm sure lots of teams can benefit from the ability to add, update, or delete span attributes before the data gets sent off to a tracing tool.

## navigating the repos

One thing I stumbled on when first navigating the OpenTelemetry repositories (not just for the Collector, but also for many of the SDKs) is that almost everything gets two. The OpenTelemetry Collector's two repos serve to separate core features vs. "contrib" modules ("contributions"), which is a common distinction in large open source projects. For the language SDKs, there's usually one repo implementing the core OpenTelemetry API according to the spec and a second repo for the SDK built on top of the API, which is where you'll find auto-instrumentation modules for that language.

People new to OpenTelemetry are often confused about why you sometimes need to import two packages to get one feature, like auto-instrumented traces for gRPC requests. As I understand it, the separation of repos introduces a strong dividing line between code that's specifically implementing the OpenTelemetry spec vs. code that builds on top of it.

Some observability vendors have released their own SDK and agent distributions to simplify setup, such as [Lightstep's Launchers](https://opentelemetry.lightstep.com/python/) and [Honeycomb's Java distro](https://docs.honeycomb.io/getting-data-in/java/opentelemetry-distro/). If you're adding OpenTelemetry tracing to an application for the first time and your vendor has a custom distro you can use, I highly recommend starting there.

For the Collector: if you're using any of the modules within the Contrib repository, you will need to either use the Contrib build or build your own Collector. While Contrib produces a larger build artifact than the core Collector build, it's probably the right choice for teams just starting out with the OpenTelemetry Collector. Teams that don't want to run the entire Contrib version of the Collector can build their own custom Collector, importing only the components they need using [the Collector's builder utility](https://github.com/open-telemetry/opentelemetry-collector/tree/main/cmd/builder).

In fact, it was iterating on our custom Collector build that made the Collector's configuration really click for me. It also forced me to get better at navigating the Collector's two repos. I realized that OpenTelemetry's modular code really facilitates creating custom builds. I'm not sure if that was an intentional use case from the beginning, but it's a really nice side effect of the design.

Since every production software system is different, there isn't going to be a one-size-fits-all telemetry processing solution. Teams like mine, ones that have the resources and the desire for it, can mix and match components to suit their needs. This build-your-own approach frees up the Collector's maintainers to focus on ensuring that these components are robust, interoperable, and reliable.

## off you go

I won't claim that this post has everything you need to know in order to deploy the OpenTelemetry Collector to your production environment. I don't know your production environment! But hopefully I've given you a starting point and a bit of a foundation for exploring OpenTelemetry on your own.

Plus, you're not on your own! OpenTelemetry has a rich, welcoming community full of knowledgeable, experienced distributed systems engineers. While maintainers and observability vendors have been leading the charge to encourage adoption, I hope more end users will share their experiences like I've done here and like my teammate Amy has done in her recent post. We all stand to benefit from talking about our observability journeys, including the bumps in the road and the detours we take along the way.

---

This post was originally published on the [Equinix Metal blog](https://metal.equinix.com/blog/opentelemetry-whats-a-collector-and-why-would-i-want-one/).

This post's cover image uses the background image from [OpenTelemetry.io](https://opentelemetry.io/).
