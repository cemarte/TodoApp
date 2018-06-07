using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Protocols;
using System;
using Todo.Core.Entities;
using Todo.Core.Interfaces;
using Todo.Infrastructure;

namespace TodoApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //string connectionString = "Server=tcp:mj-hackfest-day2-server.database.windows.net,1433;Initial Catalog=mj-hackfest-day2-db;Persist Security Info=False;User ID=demouser;Password=Demo@123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            services.AddDbContext<TodoDbContext>(
                //options => options.UseInMemoryDatabase("todo")
                //options => options.UseSqlite("Data Source=todo.db")
                //options=> options.UseSqlServer(Configuration.GetConnectionString("TodoDb"))
                options => options.UseNpgsql(Configuration.GetConnectionString("TodoDb"))
                //options => options.UseNpgsql("Server=localhost;Database=todo;Port=5432;User Id=workshop;Password=Demo@123;")

                );

            services.AddScoped<IRepository<TodoTask>, TodoRepository>();
            //services.AddScoped<ITodoService, TodoService>();

            //https://docs.microsoft.com/en-us/aspnet/core/security/cors
            services.AddCors(options => options.AddPolicy("AllowAllOrigins",
                builder =>
                {
                    builder.AllowAnyOrigin();
                    builder.AllowAnyMethod();
                    builder.AllowAnyHeader();
                })
            );

            services.AddMvc()
                .AddControllersAsServices();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("AllowAllOrigins");
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc();
        }

        public void ConfigureDevelopment(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            this.Configure(app, env);
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {

                var context = serviceScope.ServiceProvider.GetRequiredService<TodoDbContext>();
                context.Database.EnsureCreated();
            }

        }

        public void ConfigureTesting(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            this.Configure(app, env);
            var context = app.ApplicationServices.GetService<TodoDbContext>();
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            DbSeed.PopulateTestData(app.ApplicationServices.GetService<TodoDbContext>());
        }
    }


    public static class DbSeed
    {
        public static void PopulateTestData(TodoDbContext dbContext)
        {
            dbContext.TodoTasks.Add(new Todo.Core.Entities.TodoTask() { Id = Guid.NewGuid(), Assignee = "Celso", Text = "Finish Todo API", CreatedAt = DateTimeOffset.Now });
            dbContext.TodoTasks.Add(new Todo.Core.Entities.TodoTask() { Id = Guid.NewGuid(), Assignee = "Celso", Text = "Finish Todo Backend", CreatedAt = DateTimeOffset.Now });
            dbContext.TodoTasks.Add(new Todo.Core.Entities.TodoTask() { Id = Guid.NewGuid(), Assignee = "Celso", Text = "Finish Todo Frontend", CreatedAt = DateTimeOffset.Now });

            dbContext.SaveChanges();
        }
    }

}
