FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src/server
COPY *.sln ./
COPY Todo.App/Todo.App.csproj Todo.App/
RUN dotnet restore
COPY . .
WORKDIR /src/server/Todo.App
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "TodoApp.dll"]
