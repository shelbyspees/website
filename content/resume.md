---
title: "Resume"
slug: resume
summary: Shelby Spees is a site reliability engineer
  with experience developing software professionally since 2015.
  Read her resume.
---

Site Reliability Engineer
with experience developing software professionally since 2015
including libraries, build tooling, user-facing applications,
and production web services.

Technologies used professionally:

- Ruby, Python, Java, C++
- Terraform, Chef, Ansible
- CircleCI, TravisCI, Jenkins
- AWS EC2, S3, RDS, Route53
- OpenTelemetry

## Experience

**Site Reliability Engineer**, September 2021 to present  
Equinix Metal (remote)

Applied Resilience Engineering team, May 2022 to present

- Onboarded teams within the Platform Engineering Services org to deploy OpenTelemetry tracing and start using Honeycomb
- Documented onboarding steps with recommended starter configurations to simplify the onboarding process for service teams using Kubernetes
- Delivered live training on OpenTelemetry and Honeycomb using production trace data
- Developed standardized tracing attributes to streamline querying across related microservices and to simplify data organization among many lower environments

Equinix Metal SRE team, September 2021 to April 2022

- Developed Equinix Metal-specific centralized configuration to streamline OpenTelemetry data pipeline deployment for a number of services, including edge services hosted in 70+ Kubernetes clusters
- Added custom instrumentation to Rails monolith to track domain-specific attributes on customer traffic including Metal instance and hardware metadata
- Authored extensive internal documentation, enabling developers to deploy their own telemetry pipelines and add custom instrumentation to their own services
- Delivered live training on observability topics including tracing, custom instrumentation, and service level objectives
- Supported engineers across multiple teams via one-on-one debugging and knowledge-transfer sessions over Slack and Zoom
- Authored blog post: [OpenTelemetry: What’s a Collector and Why Would I Want One?](https://deploy.equinix.com/blog/opentelemetry-whats-a-collector-and-why-would-i-want-one/)
- Co-authored blog post: [Leveraging OpenTelemetry Tracing to Tune Our Rails Monolith](https://deploy.equinix.com/blog/leveraging-opentelemetry-tracing-to-tune-our-rails-monolith/)
- Delivered talk at SREcon 2022 Americas: [Tracing Bare Metal with OpenTelemetry](https://www.usenix.org/conference/srecon22americas/presentation/tobey)
- Delivered talk at SLOconf 2022: [Intro to Tracing-Based SLOs](https://www.sloconf.com/sloconf-2022#shelby-spees)

**Developer Advocate**, March 2020 to June 2021  
Honeycomb.io (remote)

- Wrote and presented technical talks at industry and community events
  on topics including observability, progressive delivery,
  and operational excellence
- Authored user-facing reference documentation as well as
  instructional tutorials for the company blog and gated downloadable assets
- Developed project management system for the company blog editorial pipeline
  and calendar, separating the writing, editing, staging, and publishing steps
  of the process to facilitate planning and parallelization
- Lead calls advising customers and prospects on instrumentation,
  managing data volume, and adopting observability practices
  in their organizations
- Captured detailed user feedback from customers and the community
  to support and shape the UI and integrations product roadmap
- Validated, revised, and reorganized user-facing documentation
  leading up to the launch of Refinery, Honeycomb's trace-aware sampling proxy
- Developed, tested, and documented initial release of Honeycomb's
  OpenTelemetry distribution for Java while embedded in the integrations team:
  [honeycombio/honeycomb-opentelemetry-java](https://github.com/honeycombio/honeycomb-opentelemetry-java)

**DevOps Engineer**, June 2018 to March 2020  
true[X], Los Angeles, CA

- Updated configuration-as-code from Chef 12 to Chef 14 via gradual upgrade
  of 42 interdependent Chef cookbooks, rolling out new AMIs across
  QA and production clusters
- Safely upgraded infrastructure from Ubuntu 16.04 to Ubuntu 18.04
  using conditional configuration blocks in Chef code
- Created Chef configurations for new Rails, Node, and Flask apps
- Deployed new services on AWS EC2 using Terraform to manage load balancing,
  autoscaling, security groups, and other network configuration
- Refactored Terraform code to support the team's first gRPC application
  in production, including allowing for a separate HTTP ALB listener
  for health checks
- Formalized process for requesting infrastructure for new services,
  including a new production-readiness checklist

**Site Reliability Engineer**, August 2017 to January 2018  
Grindr, West Hollywood, CA

- Developed rpm package build orchestration tool in Ruby to enable CI/CD
  for CentOS 7 packages:
  [grindrlabs/revolution](https://github.com/grindrlabs/revolution)
- Implemented tree-traversal algorithm for package dependency resolution
- Streamlined team's ticketing system to better visually reflect
  work-in-progress, facilitating prioritization conversations
  with engineering management and other stakeholders

**Software Engineer**, September 2015 to August 2017  
The Aerospace Corporation, El Segundo, CA

Project: DyCAST

- Designed and implemented translation tool in Java to convert the codebase of a
  mission-critical communications analysis tool into human-readable C++
- Developed a custom ANTLR4 grammar to parse ~200,000 lines of legacy code
  in ModSim III, a proprietary language
- Developed test suite to validate grammar changes by diffing pretty-printed
  output against legacy codebase
- Developed listener and templates to compile parsed input into C++
  while preserving code comments and semantic conventions
- Developed automated unit tests to validate correctness of C++ output code

Project: PySOAP

- Developed and maintained Python library for interfacing with Aerospace's
  Satellite Orbit Analysis Program (SOAP)
- Maintained organization-internal PyPI repository for hosting packages
- Proposed API redesign and gathered feedback from over 20 technical
  stakeholders
- Authored user-facing API documentation and workshop content

**Software Engineer Intern**, June 2015 to August 2015  
The Aerospace Corporation, El Segundo, CA

- Designed and implemented proof-of-concept pretty printer tool in Java
  by developing an ANTLR4 grammar to parse the codebase of a mission-critical
  communications analysis tool along with custom templates to generate output
- Developed Python scripts integrating existing VBA macros used to format
  launch mission database files, reducing 25-step process down to 6 steps
  and minimizing the potential for user error in the case of
  last-minute critical data updates before a launch window

**QA Automation Intern**, December 2014 to March 2015  
XYPRO Technology, Simi Valley, CA

- Developed automated test suite for security dashboard web application
  for HP Enterprise NonStop server software using Watir-Webdriver in Ruby

## Education

**Computer Science coursework**, June 2014 to June 2016  
Oregon State University E-campus  

**Bachelor of Arts, Linguistics**, June 2012  
University of California, Santa Barbara  
