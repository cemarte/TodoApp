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

        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            this.ConfigureServices(services);
            services.AddDbContext<TodoDbContext>(options => options.UseNpgsql(Configuration.GetConnectionString("TodoDb")));
        }

        public void ConfigureTestingServices(IServiceCollection services)
        {
            this.ConfigureServices(services);

            services.AddDbContext<TodoDbContext>(options => options.UseInMemoryDatabase("todo"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("AllowAllOrigins");
            app.UseStaticFiles();
            // app.UseDefaultFiles();
            app.UseMvcWithDefaultRoute();

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
