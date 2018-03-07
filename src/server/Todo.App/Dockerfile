FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY *.sln ./
COPY src/server/Todo.App/Todo.App.csproj src/server/Todo.App/
COPY src/server/Todo.Core/Todo.Core.csproj src/server/Todo.Core/
COPY src/server/Todo.Infrastructure/Todo.Infrastructure.csproj src/server/Todo.Infrastructure/
RUN dotnet restore
COPY . .
WORKDIR /src/src/server/Todo.App
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Todo.App.dll"]
