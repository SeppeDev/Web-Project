using System;
using System.Collections.Generic;

namespace ChoreHub.Models
{
    public interface IUserRepository
    {
        void Add(User user);
        IEnumerable<User> GetAll();
        User Find(int id);
        void Remove(int id);
        void Update(User user);
    }
}
