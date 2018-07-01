using Microsoft.EntityFrameworkCore;
using Todo.Core.Entities;

namespace Todo.Infrastructure
{
    public class TodoDbContext : DbContext
    {

        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {

        }

        public DbSet<TodoTask> TodoTasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoTask>()
                .Property(b => b.CompletedAt)
                .HasField("_completedAt");

            modelBuilder.Entity<TodoTask>()
            .Property(b => b.IsDone)
            .HasField("_isDone");
        }
    }
}
