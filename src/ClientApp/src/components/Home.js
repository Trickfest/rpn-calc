import React, { Component } from 'react';

export class Home extends Component {
        displayName = Home.name

        render() {
                return (
                        <div>
                                <h1 id="rpncalc">RPN-CALC</h1>
                                <p><i>Version: 20190218.5</i></p>
                                
                                <p><i>To begin, try the following expression:</i></p>

                                <pre><code>3 ENT 2 ENT 1 + *</code></pre>

                                <h2 id="introduction">Introduction</h2>

                                <p>Implement a Reverse Polish Notation (RPN) calculator using test-driven
development (TDD) and set up a Azure DevOps CI/CD pipeline that deploys to Azure.</p>

                                <h2 id="generalapplicationrequirements">General Application Requirements</h2>

                                <ul>
                                        <li>The calculator can be used by a human via a web browser.</li>

                                        <li>The calculator can be used by a client application such as <strong>curl</strong> via a RESTful API (over HTTP/HTTPS).</li>

                                        <li>When used interactively through the UI, the application displays the contents of the stack as the user makes each entry.</li>

                                        <li>When used by a client application, the application accepts a list of inputs and returns a single result.</li>
                                </ul>

                                <h2 id="otherprojectconsiderations">Other Project Considerations</h2>

                                <h3 id="exploreasmuchofazuredevopsaspossible">Explore as much of Azure DevOps as possible</h3>

                                <p>Even though this is a one-person project, use this project to use and explore as much of Azure DevOps as possible.
For example, use Azure Boards to plan and track work as the project progresses.</p>

                                <h3 id="learnsomethingnew">Learn something new</h3>

                                <p>Besides exploring Azure DevOps, also use this project to learn something new.
                                For example, take the opportunity to explore a new web framework or TDD tool.
It's OK if the technology selection doesn't make total sense or is overkill for the task at hand.</p>

                                <h3 id="crossplatformforbothdevelopmentanddeployment">Cross platform for both development and deployment</h3>

                                <p>Again, mostly for the fun of it, the project should be as flexible as possible
                                with regards to development and deployment environments.
                                For example, Vim and the command line running on Ubuntu should be a supported developer setup.
                                On the opposite end of the spectrum, using a full-blow IDE such as Visual Studio on Windows
should be an option as well.</p>

                                <p>Deployment options should be equally as flexible: Windows/macOS/Linux, Docker (or not), etc.</p>

                                <h2 id="technologystackandimplementationnotes">Technology Stack and Implementation Notes</h2>

                                <ul>
                                        <li><p>In order to check the cross-platform box</p>

                                                <ul>
                                                        <li>Implement the API using .NET Core/C#.</li>

                                                        <li>ASP.NET Core is used as the web framework for implementing the API and serving the UI.</li>

                                                        <li>Unit testing support provided by xUnit</li></ul></li>

                                        <li><p>Implement the front-end using React, which addresses the "learn something new" requirement.  Note that this is my first experience with React and admittedly the implementation mostly just evolved as I learned the basics of React development.  <em>Be gentle.  I know that there is ample room for improvement.</em></p></li>

                                        <li><p>Use Bootstrap for styling which compensates (in part) for my severe lack of CSS authoring skills.</p></li>

                                        <li><p>To keep things simple, rpn-calc is implemented as a single project that contains both the front-end (React) and the back-end (.NET Core).</p>

                                                <ul>
                                                        <li>The source code is housed in a single Git repo.</li>

                                                        <li>The application is built and deployed as a single unit.</li></ul></li>

                                        <li><p>Use Azure DevOps Pipelines for CI/CD support.</p>

                                                <ul>
                                                        <li>For starters, keep it simple: automatically build and deploy to an Azure Web App when the repo's master branch is changed.</li>

                                                        <li>Later on, explore other options such as:</li>

                                                        <li>Dockerizing the application and deploying the container to (say) an AKS cluster.</li>

                                                        <li>Deploying initially to a "UAT" environment and then later on deploying to "PROD" when a manual approval step is performed.</li>

                                                        <li>Blue-Green deployments using Azure Traffic Manager.</li></ul></li>

                                        <li><p>I'm not trying to build a production quality calculator here, so I intentionally cut a few corners with regards to precision.</p>

                                                <ul>
                                                        <li>Limit the number of digits in a value to nine, not counting the decimal or negative sign.</li>

                                                        <li>If necessary, truncate digits to right of the decimal point in order to fit within the nine digit limit.</li>

                                                        <li>If after truncation, the number of digits exceeds nine, display an overflow error.</li></ul></li>

                                        <li><p>I am not an experienced user of "real" RPN calculators, so I am not sure what the correct behavior is with regards to an empty stack condition.  For my purposes, popping my calculator's stack returns a zero if the stack is empty.</p></li>

                                        <li><p>On the other hand, the RPN expression evaluation API is unforgiving.  If there are insufficient values on the stack to perform an operation, an error is returned.  And if the stack contains more than a single value after an expression is fully evaluated, that is too treated as an error condition.</p></li>

                                        <li><p>Also in the API, in order to avoid conflicts with URL interpretation, the letters <strong>a</strong>, <strong>s</strong>, <strong>m</strong> and <strong>d</strong> are used as substitutes for operations <strong>+</strong>, <strong>-</strong>, <strong>*</strong> and <strong>/</strong> respectively.</p></li>
                                </ul>

                                <h2 id="calculatorcomponentlayout">Calculator Component Layout</h2>

                                <p>In terms of React components, create the following tree of components:</p>

                                <ul>
                                        <li>Calculator - the top-level component


<ul>
                                                        <li>Display</li>

                                                        <li>Stack</li>

                                                        <li>Input Line</li>

                                                        <li>Keyboard</li>

                                                        <li>Collection of buttons</li>

                                                        <li>The keyboard is also the heart of the UI in that it drives the stack and input line.  It is also the keyboard control that calls the back end API for expression evaluation.</li></ul>
                                        </li>
                                </ul>

                                <p>To keep things manageable, I stick with one CSS file for the entire calculator (instead of one per component).</p>

                                <h2 id="gettingstarted">Getting Started</h2>

                                <p>I alternated (somewhat randomly) between macOS and Windows in the development of this project.  On both platforms I utilized VS Code as the editor.  However, VS Code is not required to build, test and run the project.</p>

                                <h3 id="softwareprerequisites">Software Prerequisites</h3>

                                <p>Software stack at time of this writing:</p>

                                <ul>
                                        <li>Windows


<ul>
                                                        <li>.NET Core - 2.2.102</li>

                                                        <li>Npm - 6.4.1 (installed via node 11.3.0)</li></ul>
                                        </li>

                                        <li>macOS


<ul>
                                                        <li>.NET Core - 2.2.101</li>

                                                        <li>Npm - 6.5.0 (installed via node 11.6.0 using Homebrew)</li></ul>
                                        </li>
                                </ul>

                                <h2 id="buildandtest">Build and Test</h2>

                                <p>Clone the repo with the following command:</p>

                                <pre><code>git clone https://github.com/Trickfest/rpn-calc.git
</code></pre>

                                <p>To build the project, execute the following from the project root.</p>

                                <pre><code>dotnet build
</code></pre>

                                <p>To test the ASP.NET Core portion of the project, execute the following in the ./tests subdirectory.</p>

                                <pre><code>dotnet test
</code></pre>

                                <p>To test the React-based components execute the following npm command in the ./src/ClientApp subdirectory.</p>

                                <pre><code>npm test
</code></pre>

                                <p>From the ./src directory, execute the command below to run the application from the command line.  (Be sure to define the <strong>ASPNETCORE_ENVIRONMENT</strong> environment variable as <strong>Development</strong>.) After the application initializes, browse to <strong><a href="https://localhost:5001">https://localhost:5001</a></strong>.</p>

                                <pre><code>dotnet run
</code></pre>

                                <p>Some things to keep in mind:</p>

                                <ul>
                                        <li>As stated earlier, the <strong>dotnet run</strong> command requires that the environment variable <strong>ASPNETCORE_ENVIRONMENT</strong> be set to <strong>Development</strong>.</li>

                                        <li>If using VS Code, you should be able to just press <strong>ctrl+F5</strong> to run the application as <strong>~/.vscode/launch.json</strong> is part of the project.</li>

                                        <li>The calculator app requires a TLS connection with the client application (browser, curl, PowerShell, etc), so you must have a trusted https development certificate installed on the client operating system in order to run locally.  See <strong>dotnet dev-certs https --help</strong> for more information.</li>
                                </ul>

                                <h3 id="commandlinetesting">Command Line Testing</h3>

                                <p>To test from the command line, try some of the following commands.  (Expressions evaluate to 7 and -96.007000 respectively.)</p>

                                <p>Curl</p>

                                <pre><code>curl https://rpn-calc.azurewebsites.net/api/rpneval/5/2/a
</code></pre>

                                <p>PowerShell</p>

                                <pre><code>Invoke-RestMethod https://rpn-calc.azurewebsites.net/api/rpneval/5/2/a
</code></pre>

                                <p>Curl</p>

                                <pre><code>curl https://rpn-calc.azurewebsites.net/api/rpneval/-10.4/-3.7/a/4/s/2/m/04.00/2/d/d/2/d/5.0/0002.000/m/m/00.007/s/-00005.50000/a
</code></pre>

                                <p>PowerShell</p>

                                <pre><code>Invoke-RestMethod https://rpn-calc.azurewebsites.net/api/rpneval/-10.4/-3.7/a/4/s/2/m/04.00/2/d/d/2/d/5.0/0002.000/m/m/00.007/s/-00005.50000/a
</code></pre>

                                <p>For help text, invoke the following:</p>

                                <p>Curl</p>

                                <pre><code>curl https://rpn-calc.azurewebsites.net/api/rpneval
</code></pre>

                                <p>PowerShell</p>

                                <pre><code>Invoke-RestMethod https://rpn-calc.azurewebsites.net/api/rpneval
</code></pre>
                        </div>
                );
        }
}
