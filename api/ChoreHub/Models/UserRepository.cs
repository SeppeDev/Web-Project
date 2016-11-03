using System;
using System.Collections.Generic;
using System.Linq;

using ChoreHub.DAL;

namespace ChoreHub.Models
{
    public class UserRepository :IUserRepository
    {
        private readonly ChoreHubContext _context;

        public UserRepository(ChoreHubContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public void Add(User item)
        {
            _context.Users.Add(item);
            _context.SaveChanges();
        }

        public User Find(int id)
        {
            return _context.Users
                .SingleOrDefault(e => e.Id.Equals(id));
        }

        public void Remove(int id)
        {
            var itemToRemove = _context.Users.SingleOrDefault(e => e.Id.Equals(id));
            if (itemToRemove != null)
            {
                _context.Users.Remove(itemToRemove);
                _context.SaveChanges();
            }
        }

        public void Update(User item)
        {
            var itemToUpdate = _context.Users.SingleOrDefault(e => e.Id.Equals(item.Id));
            if (itemToUpdate != null)
            {
                itemToUpdate.FirstName = item.FirstName;
                itemToUpdate.LastName = item.LastName;
		itemToUpdate.Description =  item.Description;
                itemToUpdate.Email = item.Email;
                itemToUpdate.IsAdmin = item.IsAdmin;
                itemToUpdate.Image = item.Image;
            }
        }
    }
}
