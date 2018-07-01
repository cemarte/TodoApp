FROM microsoft/aspnetcore-build:2.0 AS build-env
WORKDIR /app

ENV ASPNETCORE_ENVIRONMENT Development

# Copy csproj and restore as distinct layers
COPY server/Todo.App/Todo.App.csproj ./Todo.App/
COPY server/Todo.Core/*.csproj ./Todo.Core/
COPY server/Todo.Infrastructure/*.csproj ./Todo.Infrastructure/
RUN dotnet restore ./Todo.App/Todo.App.csproj

# Copy everything else and build
COPY server/Todo.App ./Todo.App/
COPY server/Todo.Core ./Todo.Core/
COPY server/Todo.Infrastructure ./Todo.Infrastructure/
RUN dotnet publish ./Todo.App/ -c Release -o ../out

FROM node:8.11.2-alpine AS node-build
WORKDIR /app/client/todo-react
COPY client/todo-react/package*.json ./
RUN npm install
COPY client/todo-react .
RUN npm run-script build

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /app
COPY --from=build-env /app/out .
COPY --from=node-build /app/client/todo-react/build ./wwwroot
EXPOSE 80
ENV ASPNETCORE_ENVIRONMENT Development
ENTRYPOINT ["dotnet", "Todo.App.dll"]