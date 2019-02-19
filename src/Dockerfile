FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build

RUN apt-get update
RUN apt-get -y install gnupg2

RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

WORKDIR /src
COPY ["rpn-calc.csproj", "."]
RUN dotnet restore "rpn-calc.csproj"
COPY . .
WORKDIR /src
RUN dotnet build "rpn-calc.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "rpn-calc.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "rpn-calc.dll"]