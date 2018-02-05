using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using Todo.Core.Entities;
using Todo.Infrastructure;
using Xunit;

namespace Todo.Tests.Infrastructure
{
    public class TodoRepositoryTests
    {
        private TodoDbContext _dbContext;

        private static DbContextOptions<TodoDbContext> CreateOptions()
        {
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var builder = new DbContextOptionsBuilder<TodoDbContext>();
            builder.UseInMemoryDatabase("todo")
                .UseInternalServiceProvider(serviceProvider);

            return builder.Options;
        }

        private TodoRepository GetRepository()
        {
            var options = CreateOptions();
            _dbContext = new TodoDbContext(options);
            return new TodoRepository(_dbContext);
        }

        [Fact]
        public void CanAddTodo()
        {
            var repo = GetRepository();
            var newTodo = new TodoTask();
            var result = repo.Add(newTodo);

            Assert.False(result.Id == Guid.Empty);
            Assert.NotNull(repo.GetById(result.Id));
        }

        [Fact]
        public void CanUpdateTodo()
        {
            var repo = GetRepository();
            var newTodo = new TodoTask();
            repo.Add(newTodo);
            var persistedTodo = repo.GetById(newTodo.Id);

            Assert.NotNull(persistedTodo);

            persistedTodo.MarkComplete();
            repo.Update(persistedTodo);

            var updated = repo.GetById(newTodo.Id);
            Assert.True(updated.IsDone);
        }
        [Fact]
        public void CanDeleteTodo()
        {
            var repo = GetRepository();
            var newTodo = new TodoTask();
            repo.Add(newTodo);
            var persistedTodo = repo.GetById(newTodo.Id);

            Assert.NotNull(persistedTodo);

            repo.Delete(persistedTodo.Id);

            var updated = repo.GetById(newTodo.Id);
            Assert.Null(updated);
        }


    }
}
