---
title: "Resume"
---

Shelby Spees is a polyglot software engineer
with experience developing libraries and CLI tools
as well as maintaining configuration-as-code, infrastructure-as-code,
and build tooling for production web services.

<!--more-->

Languages used professionally: Ruby, Python, Java, C++

Tooling used professionally: Terraform, Chef, Ansible, CircleCI, TravisCI,
Jenkins

## Experience

**Developer Advocate**, March 2020 to present  
Honeycomb.io (remote)

- Captured detailed user feedback from customers and the community
  to support and shape the UI and integrations product roadmap
- Lead calls solo and alongside sales and customer success team members
  to advise prospective and current Honeycomb customers on instrumentation,
  managing data volume, and using the product UI
- Authored instructional tutorials for the company blog
  and gated downloadable assets
- Authored and maintained technical user-facing documentation
- Refactored integrations documentation to use subpages,
  allowing reuse of code samples on multiple pages for a single source of truth
  without sacrificing navigability
- Wrote and presented technical talks at over 15 industry and community events
  from June 2020 to May 2021
- Managed the company blog from April 2020 to February 2021,
  collaborating with authors to develop technical and editorial content
  to promote Honeycomb's reputation as a strong engineering organization
- Developed project management system for the company blog editorial pipeline,
  separating the writing, editing, staging, and publishing steps of the process
  to enable parallelization and delegation of each type of work
- Validated, revised, and reorganized user-facing documentation
  leading up to the launch of Refinery, Honeycomb's trace-aware sampling proxy

**DevOps Engineer**, June 2018 to March 2020  
true[X], Los Angeles, CA

- Updated configuration-as-code from Chef 12 to Chef 14
  via gradual upgrade of 42 interdependent Chef cookbooks,
  rolling out new AMIs across 14 production services
- Safely upgraded infrastructure from Ubuntu 16.04 to Ubuntu 18.04
  across QA and production clusters using conditional configuration blocks
  in Chef code
- Created Chef configurations for new Rails, Node, and Flask apps
  running on Ubuntu 16.04 and 18.04
- Deployed new services on AWS EC2 using Terraform to manage load balancing,
  autoscaling, security groups, and other network configuration
- Refactored Terraform code to support the team's first gRPC application
  in production, including allowing for a separate HTTP ALB listener
  for health checks
- Created daily Jenkins jobs running Terraform plan to identify
  infrastructure drift
- Formalized process for requesting infrastructure for new services,
  including a new production-readiness checklist
- Pruned team’s Chef codebase of dead code and unused dependencies

**Site Reliability Engineer**, August 2017 to January 2018  
Grindr, West Hollywood, CA

- Developed rpm package build orchestration tool in Ruby
  to enable CI/CD for CentOS 7 packages: <github.com/grindrlabs/revolution>
- Implemented tree-traversal algorithm for package dependency resolution
- Streamlined team's ticketing system to better visually reflect
  work-in-progress, facilitating prioritization conversations
  with engineering management and other stakeholders

**Software Engineer**, September 2015 to August 2017  
The Aerospace Corporation, El Segundo, CA

Project: DyCAST

- Designed and implemented Java translation tool using a custom ANTLR4 grammar
  to parse ~200,000 lines of legacy code in a proprietary language
- Developed test suite to validate grammar changes against legacy codebase
  using custom pretty printer tool
- Built custom listener and templates to compile parsed input into C++,
  with automated unit tests running C++ output code

Project: PySOAP

- Developed and maintained Python library for interfacing with Aerospace's
  Satellite Orbit Analysis Program proprietary data format via TCP/IP
- Maintained org-internal PyPI repository for hosting packages
- Proposed API redesign and gathered feedback from over 20 technical stakeholders
- Authored user-facing API documentation and workshop content

**Software Engineer Intern**, June 2015 to August 2015  
The Aerospace Corporation, El Segundo, CA

- Implemented pretty printer tool in Java using custom ANTLR4 grammar
  to parse and print ModSim III legacy code as a proof-of-concept
  for the DyCAST translator project
- Developed Python scripts integrating existing VBA macros
  to reduce 25-step reformatting process for launch mission database files
  down to 6 steps, in order to minimize the potential for user error
  in the case of last-minute critical data updates before a launch window

**QA Automation Intern**, December 2014 to March 2015  
XYPRO Technology, Simi Valley, CA

- Developed automated test suite for security dashboard web application
  for HP Enterprise NonStop server software using Watir-Webdriver in Ruby

## Education

**Computer Science coursework**, June 2014 to June 2016  
Oregon State University E-campus  
GPA: 3.83

**Bachelor of Arts, Linguistics**, June 2012  
University of California, Santa Barbara  
GPA: 3.48
