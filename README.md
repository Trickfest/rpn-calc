# RPN-CALC

## Introduction

Implement a Reverse Polish Notation (RPN) calculator using test-driven
development (TDD) and set up a Azure DevOps CI/CD pipeline that deploys to Azure.

## General Application Requirements

* The calculator can be used by a human via a web browser.
* The calculator can be used by a client application such as __curl__ via a RESTful API (over HTTP/HTTPS).
* When used interactively through the UI, the application displays the contents of the stack as the user makes each entry.
* When used by a client application, the application accepts a list of inputs and returns a single result.

## Other Project Considerations

### Explore as much of Azure DevOps as possible

Even though this is a one-person project, use this project to use and explore as much of Azure DevOps as possible.
For example, use Azure Boards to plan and track work as the project progresses.

### Learn something new

Besides exploring Azure DevOps, also use this project to learn something new.
For example, take the opportunity to explore a new web framework or TDD tool.
It's OK if the technology selection doesn't make total sense or is overkill for the task at hand.

### Cross platform for both development and deployment

Again, mostly for the fun of it, the project should be as flexible as possible
with reqards to development and deployment environments.
For example, Vim and the command line running on Ubuntu should be a supported developer setup.
On the opposite end of the spectrum, using a full-blow IDE such as Visual Studio on Windows
should be an option as well.

Deployment options should be equally as flexible: Windows/macOS/Linux, Docker (or not), etc.

## Technology Stack and Implementation Notes

* In order to check the cross-platform box
  * Implement the API using .NET Core/C#.
  * ASP.NET Core is used as the web framework for implementing the API and serving the UI.
  * Unit testing support provided by xUnit

* Implement the front-end using React, which addresses the "learn something new" requirement.  Note that this is my first experience with React and admittedly the implementation mostly just evolved as I learned the basics of React development.  _Be gentle.  I know that there is ample room for improvement._

* Use Bootstrap for stying which compensates (in part) for my severe lack of CSS authoring skills.

* To keep things simple, rpn-calc is implemented as a single project that contains both the front-end (React) and the back-end (.NET Core).
  * The source code is housed in a single Git repo.
  * The application is built and deployed as a single unit.
  
* Use Azure DevOps Pipelines for CI/CD support.
  * For starters, keep it simple: automatically build and deploy to an Azure Web App when the repo's master branch is changed.
  * Later on, explore other options such as:
    * Dockerizing the application and deploying the container to (say) an AKS cluster.
    * Deploying initially to a "UAT" environment and then later on deploying to "PROD" when a manual approval step is performed.
    * Blue-Green deployments using Azure Traffic Manager.

* I'm not trying to build a production quality calculator here, so I intentionally cut a few corners with regards to precision.
  * Limit the number of digits in a value to nine, not counting the decimal or negative sign.
  * If necessary, truncate digits to right of the decimal point in order to fit within the nine digit limit.
  * If after truncation, the number of digits exceeds nine, display an overflow error.

* I am not an experienced user of "real" RPN calculators, so I am not sure what the correct behavior is with regards to an empty stack condition.  For my purposes, popping my calculator's stack returns a zero if the stack is empty.

* On the other hand, the RPN expression evaluation API is unforgiving.  If there are insufficient values on the stack to perform an operation, an error is returned.  And if the stack contains more than a single value after an expression is fully evaluated, that is too treated as an error condition.

* Also in the API, in order to avoid conflicts with URL interpretation, the letters __a__, __s__, __m__ and __d__ are used as substitutes for operations __+__, __-__, __*__ and __/__ respectively.

## Calculator Component Layout

In terms of React components, create the following tree of components:

* Calculator - the top-level component
  * Display
    * Stack
    * Input Line
  * Keyboard
    * Collection of buttons
    * The keyboard is also the heart of the UI in that it drives the stack and input line.  It is also the keyboard control that calls the backend API for expression evaluation.

To keep things manageable, I stick with one CSS file for the entire calculator (instead of one per component).

## Getting Started

I alternated (somewhat randomly) between macOS and Windows in the development of this project.  On both platforms I utilized VS Code as the editor.  However, VS Code is not required to build, test and run the project.

### Software Prerequsites

Software stack at time of this writing:

* Windows
  * .NET Core - 2.2.100
  * Npm - 6.4.1 (installed via node 11.3.0)
* macOS
  * .NET Core - 2.2.101
  * Npm - 6.5.0 (installed via node 11.6.0 using Homebrew)

## Build and Test

Clone the repo with the following command:

    git clone https://mtharris.visualstudio.com/DefaultCollection/rpn-calc/_git/rpn-calc

To build the project, execute the following from the project root.

    dotnet build

To test the ASP.NET Core portion of the project, execute the following in the ./tests subdirectory.

    dotnet test

To test the React-based components execute the following npm command in the ./src/ClientApp subdirectory.

    npm test

Execute the command below to run the application from the command line.  After the application initializes, browse to __<https://localhost:5001>__.

    dotnet run

Some things to keep in mind:

* The __dotnet run__ command requires that the environment variable __ASPNETCORE_ENVIRONMENT__ be set to __Development__.
* If using VS Code, you should be able to just press __ctrl+F5__ to run the application as __~/.vscode/launch.json__ is part of the project.
* The calculator app requires a TLS connection with the client application (brower, curl, PowerShell, etc), so you must have a trusted https development certificate installed on the client operating system in order to run locally.  See __dotnet dev-certs https --help__ for more information.

### Command Line Testing

To test from the command line, try some of the following commands.  (Expressions evaluate to 7 and -96.007000 respectively.)

Curl

    curl https://rpn-calc.azurewebsites.net/api/rpneval/5/2/a

PowerShell

    Invoke-RestMethod https://rpn-calc.azurewebsites.net/api/rpneval/5/2/a

Curl

    curl https://rpn-calc.azurewebsites.net/api/rpneval/-10.4/-3.7/a/4/s/2/m/04.00/2/d/d/2/d/5.0/0002.000/m/m/00.007/s/-00005.50000/a

PowerShell

    Invoke-RestMethod https://rpn-calc.azurewebsites.net/api/rpneval/-10.4/-3.7/a/4/s/2/m/04.00/2/d/d/2/d/5.0/0002.000/m/m/00.007/s/-00005.50000/a

For help text, invoke the following:

Curl

    curl https://rpn-calc.azurewebsites.net/api/rpneval

PowerShell

    Invoke-RestMethod https://rpn-calc.azurewebsites.net/api/rpneval
