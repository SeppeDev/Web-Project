using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using ChoreHub.DAL;
using System.Security.Claims;

namespace ChoreHub.Models
{
    public class UserRepository :IUserRepository
    {
        private readonly ChoreHubContext _context;

        public UserRepository(ChoreHubContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAllPublic()
        {
            return _context.Users.Include(e => e.Image).Where(e => e.IsPublic.Equals(true));
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.Include(e => e.Image);
        }

        public void Add(User item)
        {
            _context.Users.Add(item);
            _context.SaveChanges();
        }

        public User Find(int id)
        {
            var user = new User(); 
                
            try
            {
                user = _context.Users.Include(e => e.Image)
                            .SingleOrDefault(e => e.Id.Equals(id));
            }
            catch
            {
                user = _context.Users.SingleOrDefault(e => e.Id.Equals(id));
            }

            return user;
        }

        public User FindByUserId(string id)
        {
            return _context.Users.Include(e => e.Image)
                .SingleOrDefault(e => e.Auth0Id.Equals(id));
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
                itemToUpdate.Description = item.Description;
                itemToUpdate.IsPublic = item.IsPublic;
                itemToUpdate.Location = item.Location;

                var img = new Image()
                {
                    Link = item.Image.Link
                };

                itemToUpdate.Image = img;

                _context.Entry(itemToUpdate).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }

        public bool IsAdmin(ClaimsPrincipal user)
        {
            var auth0Id = user.Claims.FirstOrDefault(u => u.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            return _context.Users.Any(u => u.Auth0Id == auth0Id);
        }
    }
}
