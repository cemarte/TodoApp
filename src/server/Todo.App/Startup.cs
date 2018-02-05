﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using Todo.Core.Entities;
using Todo.Core.Interfaces;
using Todo.Core.Services;
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
            services.AddDbContext<TodoDbContext>(options => options.UseInMemoryDatabase("todo"));

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

        public void ConfigureTesting(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            this.Configure(app, env);
            DbSeed.PopulateTestData(app.ApplicationServices.GetService<TodoDbContext>());
        }
    }


    public static class DbSeed {
        public static void PopulateTestData(TodoDbContext dbContext)
        {
            dbContext.TodoTasks.Add(new Todo.Core.Entities.TodoTask() { Id = Guid.NewGuid(), Assignee="Celso", Text="Finish Todo API", CreatedAt= DateTimeOffset.Now });
            dbContext.TodoTasks.Add(new Todo.Core.Entities.TodoTask() { Id = Guid.NewGuid(), Assignee = "Celso", Text = "Finish Todo Backend", CreatedAt = DateTimeOffset.Now });
            dbContext.TodoTasks.Add(new Todo.Core.Entities.TodoTask() { Id = Guid.NewGuid(), Assignee = "Celso", Text = "Finish Todo Frontend", CreatedAt = DateTimeOffset.Now });

            dbContext.SaveChanges();
        }
    }

}
