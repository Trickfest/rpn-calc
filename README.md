# RPN-CALC

## Introduction

As a learning exercise, implement a Reverse Polish Notation (RPN) calculator using test-driven
development (TDD) and set up a Azure DevOps CI/CD pipeline that deploys to Azure.

## General Application Requirements

* The calculator can be used by a human via a web browser.
* The calculator can be used by a client application via a RESTful API (over HTTP/HTTPS).
* When used interactively through the UI, the application displays the contents of the stack as the user makes each entry.
* When used by a client application, the application accepts a list of inputs and returns a single result.

## Other Project Considerations

### Explore as much of Azure DevOps as possible

Even though this is a one-person project, use this project to use and explore as much of Azure DevOps as possible.
For example, use Azure Boards to plan and track work as the project progresses.

### Learn something new

Besides exploring Azure DevOps, also use this project to learn something new.
For example, take the opportunity to explre a new web framework or TDD tool.
It's OK if the technology selection doesn't make total sense or is overkill for the task at hand.

### Cross platform for both development and deployment

Again, mostly for the fun of it, the project should be as flexible as possible with reqards to development and deployment environments.
For example, Vim and the command line running on Ubuntu should be a supported developer setup.
On the opposite end of the spectrum, a full-blow IDE such as Visual Studio on Windows
should be an option as well.

Deployment should be equally as flexible: Windows/macOS/Linux, Docker (or not), etc.

## Technology Stack and Implementation Notes

* In order to check the cross-platform box (which predominately impacts the API backend)
  * Implement the API using .NET Core/C#.
  * ASP.NET Core is used as the web framework for implementing the API.
  * Unit testing support provided by xUnit

* Implement the front-end using React, which addresses the "learn something new" requirement.

* Use Bootstrap for stying which compensates (in part) for my severe lack of CSS authoring skills.

* To keep things simple, rpn-calc is implemented as a single project that contains both the front-end and the back-end.
  * The source code is housed in a single Git repo.
  * The application is built and deployed as a single unit.
  
* Not surprisingly, use Azure DevOps Pipelines for CI/CD support.
  * For starters, keep it simple: automatically build and deploy to a Azure Web App when the repo's master branch is changed.
  * Later on, explore other options such as:
    * Dockerizing the application and deploying the container to (say) a AKS cluster (which _really_ checks the technology overkill box).
    * Deploying initially to a "UAT" environment and then later on deploying to "PROD" when a manual approval step is performed.
    * Blue-Green deployments using Azure Traffic Manager.

## Getting Started

TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.Installation process
2.Software dependencies
3.Latest releases
4.API references

## Build and Test

TODO: Describe and show how to build your code and run the tests.

## Contribute

No contributions as this time.