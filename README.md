
[![Build Status](https://travis-ci.org/cemarte/TodoApp.svg?branch=master)](https://travis-ci.org/cemarte/TodoApp)

# Todo App

Simple todo app using aspnet core web api on the backend with ef core in-memory database and create-react-app with typescript and redux on the frontend.

## Debugging

### Backend
- Dependencies:
    - netcore framework 2.0

#### Using Visual Studio
- Open the Todo app solution
- Build solution
- F5

#### Using VSCode
- Open the solution folder in VScode
- Go to the debug tab and add configuration `.NET Core Launch (web)` or 
-  Paste the following into launch.json
```{
            "name": ".NET Core Launch (web)",
            "type": "coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            "program": "${workspaceFolder}/src/server/Todo.App/bin/Debug/netcoreapp2.0/Todo.App.dll",
            "args": [],
            "cwd": "${workspaceFolder}/src/server/Todo.App",
            "stopAtEntry": false,
            "internalConsoleOptions": "openOnSessionStart",
            "launchBrowser": {
                "enabled": true,
                "args": "${auto-detect-url}",
                "windows": {
                    "command": "cmd.exe",
                    "args": "/C start ${auto-detect-url}"
                },
                "osx": {
                    "command": "open"
                },
                "linux": {
                    "command": "xdg-open"
                }
            },
            "env": {
                "ASPNETCORE_ENVIRONMENT": "Development"
            },
            "sourceFileMap": {
                "/Views": "${workspaceFolder}/Views"
            }
        }
```

- Run 

#### Using the command line
- Open a command line on the solution folder
- Run `dotnet restore .\TodoApp.sln`
- Run `dotnet build .\src\server\Todo.App\Todo.App.csproj` (command line does not support docker sdk yet)
- `cd .\src\server\Todo.App\`
- Run `dotnet run`


### Frontend

#### Dependecies
- Nodejs 8+
- create-react-app

#### Using command line 
- cd into `./src/client/todo-react`
- run `npm install` or `yarn`
- run `npm start` or `yarn start`
***
### Important: 
with running server and client side-by-side, make sure to update package.json proxy variable to reflect the server url
***

## Production
- cd into `./src/client/todo-react`
- run `yarn` or `npm install`
- run `yarn build` or `npm build`
- copy from `./src/client/todo-react/build` to `./src/server/Todo.App/wwwroot/`
- run the server