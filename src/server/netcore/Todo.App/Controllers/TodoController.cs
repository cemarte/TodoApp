using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Todo.Core.Entities;
using Todo.Core.Interfaces;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        readonly IRepository<TodoTask> _todoRepo;

        public TodoController(IRepository<TodoTask> todoRepo)
        {
            _todoRepo = todoRepo;
        }

        // GET api/todo
        [HttpGet]
        public IEnumerable<TodoTask> Get()
        {
            return _todoRepo.Get();
        }

        // GET api/todo/5
        [HttpGet("{id}")]
        public TodoTask Get(Guid id)
        {
            return _todoRepo.GetById(id);
        }

        // POST api/todo
        [HttpPost]
        public TodoTask Post([FromBody]TodoTask todoTask)
        {
            return _todoRepo.Add(todoTask);
        }

        // PUT api/todo/5
        [HttpPut("{id}")]
        public TodoTask Put([FromBody]TodoTask todoTask, [FromQuery] bool done)
        {
            if (done)
            {
                todoTask?.MarkComplete();
            }
            return _todoRepo.Update(todoTask);
        }

        // DELETE api/todo/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _todoRepo.Delete(id);
        }
    }
}
