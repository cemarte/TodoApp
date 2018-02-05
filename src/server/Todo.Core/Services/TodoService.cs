using System;
using System.Collections.Generic;
using System.Text;
using Todo.Core.Entities;
using Todo.Core.Interfaces;

namespace Todo.Core.Services
{
    public class TodoService
    {
        private readonly IRepository<TodoTask> _todoReposiroty;

        public TodoService(IRepository<TodoTask> todoRepository)
        {
            _todoReposiroty = todoRepository;
        }
        public void MarkCompleted(TodoTask todoTask)
        {
            todoTask.MarkComplete();
        }
    }
}
