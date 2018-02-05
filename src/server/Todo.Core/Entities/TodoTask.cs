using System;

namespace Todo.Core.Entities
{
    public class TodoTask
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTimeOffset? DueDate { get; set; }

        public void MarkComplete()
        {
            this._isDone = true;
            this._completedAt = DateTimeOffset.Now;
        }

        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? CompletedAt { get { return _completedAt; }  }
        public string Assignee { get; set; }
        private bool _isDone;
        private DateTimeOffset? _completedAt;

        public bool IsDone { get { return _isDone;  } }
    }
}
