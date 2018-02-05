using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Todo.Core.Entities;
using Todo.Core.Interfaces;

namespace Todo.Infrastructure
{
    public class TodoRepository : IRepository<TodoTask>
    {
        private readonly TodoDbContext _todoDbContext;
        public TodoRepository(TodoDbContext todoDbContext)
        {
            _todoDbContext = todoDbContext;
        }
        public TodoTask Add(TodoTask entity)
        {
            entity.Id = Guid.NewGuid();
            entity.CreatedAt = DateTimeOffset.Now;
            var persisted = _todoDbContext.Add(entity);
            _todoDbContext.SaveChanges();
            return persisted.Entity;
        }

        public void Delete(Guid id)
        {
            var entity = _todoDbContext.TodoTasks.Find(id);
            if (entity != null)
            {
                _todoDbContext.Remove(entity);
                _todoDbContext.SaveChanges();
            }
        }

        public IEnumerable<TodoTask> Get()
        {
            return _todoDbContext
                .TodoTasks
                .AsNoTracking()
                .OrderByDescending(x=>x.CreatedAt)
                .ToList();
        }

        public TodoTask GetById(Guid id)
        {
            return _todoDbContext
                .TodoTasks
                .Find(id);
        }

        public TodoTask Update(TodoTask entity)
        {
            var persisted = _todoDbContext.Update(entity);
            _todoDbContext.SaveChanges();
            return persisted.Entity;
        }
    }
}
