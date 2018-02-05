using System;
using System.Collections.Generic;
using System.Text;

namespace Todo.Core.Interfaces
{
    public interface IRepository<T>
    {
        IEnumerable<T> Get();
        T GetById(Guid id);
        T Add(T entity);
        T Update(T entity);
        void Delete(Guid id);
    }
}
