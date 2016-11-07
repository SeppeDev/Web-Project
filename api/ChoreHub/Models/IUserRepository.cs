using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace ChoreHub.Models
{
    public interface IUserRepository
    {
        void Add(User user);
        IEnumerable<User> GetAllPublic();
        IEnumerable<User> GetAll();
        User Find(int id);
        User FindByUserId(string id);
        void Remove(int id);
        void Update(User user);

        bool IsAdmin(ClaimsPrincipal user);
    }
}
