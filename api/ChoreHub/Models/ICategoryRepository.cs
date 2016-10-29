using System;
using System.Collections.Generic;

namespace ChoreHub.Models
{
    public interface ICategoryRepository
    {
        void Add(Category category);
        IEnumerable<Category> GetAll();
        Category Find(int id);
        void Remove(int id);
        void Update(Category category);
    }
}
