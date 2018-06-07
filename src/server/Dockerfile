FROM microsoft/aspnetcore-build:2.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY Todo.App/Todo.App.csproj ./Todo.App/
COPY Todo.Core/*.csproj ./Todo.Core/
COPY Todo.Infrastructure/*.csproj ./Todo.Infrastructure/
RUN dotnet restore ./Todo.App/Todo.App.csproj

# Copy everything else and build
COPY Todo.App ./Todo.App/
COPY Todo.Core ./Todo.Core/
COPY Todo.Infrastructure ./Todo.Infrastructure/
RUN dotnet publish ./Todo.App/ -c Release -o ../out

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /app
COPY --from=build-env /app/out .
EXPOSE 5000
ENTRYPOINT ["dotnet", "Todo.App.dll"]