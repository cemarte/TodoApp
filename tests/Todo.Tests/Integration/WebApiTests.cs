using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using Todo.Core.Entities;
using TodoApp;
using Xunit;

namespace Todo.Tests.Integration
{
    public class WebApiTests
    {
        readonly HttpClient _client;


        public WebApiTests()
        {
            _client = GetClient();
        }

        private HttpClient GetClient()
        {
            var startupAssembly = typeof(Startup).GetTypeInfo().Assembly;
            var contentRoot = GetProjectPath("src\\server", startupAssembly);
            var builder = new WebHostBuilder()
                .UseContentRoot(contentRoot)
                .ConfigureServices(InitializeServices)
                .UseStartup<Startup>()
                .UseEnvironment("Testing");
            var server = new TestServer(builder);
            var client = server.CreateClient();

            return client;
        }

        void InitializeServices(IServiceCollection services)
        {
            var startupAssembly = typeof(Startup).GetTypeInfo().Assembly;

            var manager = new ApplicationPartManager();
            manager.ApplicationParts.Add(new AssemblyPart(startupAssembly));

            manager.FeatureProviders.Add(new ControllerFeatureProvider());
            manager.FeatureProviders.Add(new ViewComponentFeatureProvider());

            services.AddSingleton(manager);
        }
        private static string GetProjectPath(string solutionRelativePath, Assembly startupAssembly)
        {
            // Get name of the target project which we want to test
            var projectName = startupAssembly.GetName().Name;

            // Get currently executing test project path
            var applicationBasePath = PlatformServices.Default.Application.ApplicationBasePath;

            // Find the folder which contains the solution file. We then use this information to find the target
            // project which we want to test.
            var directoryInfo = new DirectoryInfo(applicationBasePath);
            do
            {
                var solutionFileInfo = new FileInfo(Path.Combine(directoryInfo.FullName, "TodoApp.sln"));
                if (solutionFileInfo.Exists)
                {
                    return Path.GetFullPath(Path.Combine(directoryInfo.FullName, solutionRelativePath, projectName));
                }

                directoryInfo = directoryInfo.Parent;
            }
            while (directoryInfo.Parent != null);

            throw new Exception($"Solution root could not be located using application root {applicationBasePath}.");
        }



        [Fact]
        public async Task ReturnTodos()
        {
            var response = await _client.GetAsync("/api/todo");
            response.EnsureSuccessStatusCode();
            var payload = await response.Content.ReadAsStringAsync();
            var json = JsonConvert.DeserializeObject<IEnumerable<TodoTask>>(payload).ToList();

            Assert.Equal(3, json.Count);
        }

        [Fact]
        public async Task AddTodo()
        {
            var td1 = new TodoTask() { Text = "Test1", Assignee = "Test", DueDate = DateTimeOffset.Now.AddYears(1) };
            var requestContent = new StringContent(JsonConvert.SerializeObject(td1));
            requestContent.Headers.ContentType.MediaType = "application/json";
            var postRequest = await _client.PostAsync("/api/todo", requestContent);
            postRequest.EnsureSuccessStatusCode();

            var response = await _client.GetAsync("/api/todo");
            response.EnsureSuccessStatusCode();
            var payload = await response.Content.ReadAsStringAsync();
            var json = JsonConvert.DeserializeObject<IEnumerable<TodoTask>>(payload).ToList();

            Assert.Equal(4, json.Count);
        }

        [Fact]
        public async Task RemoveTodo()
        {
            var response1 = await _client.GetAsync("/api/todo");
            response1.EnsureSuccessStatusCode();
            var payload1 = await response1.Content.ReadAsStringAsync();
            var json1 = JsonConvert.DeserializeObject<IEnumerable<TodoTask>>(payload1).ToList();
            var id = json1.FirstOrDefault().Id;

            var deleteRequest = await _client.DeleteAsync("/api/todo/"+id);
            deleteRequest.EnsureSuccessStatusCode();

            var response = await _client.GetAsync("/api/todo");
            response.EnsureSuccessStatusCode();
            var payload = await response.Content.ReadAsStringAsync();
            var json = JsonConvert.DeserializeObject<IEnumerable<TodoTask>>(payload).ToList();

            Assert.Equal(2, json.Count);
        }
    }



}
