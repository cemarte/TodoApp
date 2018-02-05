using System;
using Todo.Core.Entities;
using Xunit;

namespace Todo.Tests
{
    public class Todo
    {
        [Fact]
        public void SetTodoComplete()
        {
            var task = new TodoTask();
            task.MarkComplete();
            Assert.True(task.IsDone);
        }
    }
}
