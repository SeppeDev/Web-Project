using System;
using System.Collections.Generic;
using System.Linq;

using ChoreHub.DAL;
using Microsoft.EntityFrameworkCore;

namespace ChoreHub.Models
{
    public class ChoreRepository : IChoreRepository
    {
        private readonly ChoreHubContext _context;

        public ChoreRepository(ChoreHubContext context)
        {
            _context = context;
        }

        public IEnumerable<Chore> GetAll()
        {
            return _context.Chores.Include(e => e.User)
                .Include(e => e.Category);
        }

        public IEnumerable<Chore> GetByCategoryId(int id)
        {
            return _context.Chores.Where(e => e.Category.Id.Equals(id));
        }
        public IEnumerable<Chore> GetByUserId(int id)
        {
            return _context.Chores.Where(e => e.User.Id.Equals(id));
        }

        public void Add(Chore item)
        {
            _context.Chores.Add(item);
            _context.SaveChanges();
        }

        public Chore Find(int id)
        {
            return _context.Chores.Include(e => e.User)
                .Include(e => e.Category)
                .SingleOrDefault(e => e.Id.Equals(id));
        }

        public void Remove(int id)
        {
            var itemToRemove = _context.Chores.SingleOrDefault(e => e.Id.Equals(id));
            if (itemToRemove != null)
            {
                _context.Chores.Remove(itemToRemove);
                _context.SaveChanges();
            }
        }

        public void Update(Chore item)
        {
            var itemToUpdate = _context.Chores.SingleOrDefault(e => e.Id.Equals(item.Id));
            if (itemToUpdate != null)
            {
                itemToUpdate.Title = item.Title;
                itemToUpdate.Description = item.Description;
                itemToUpdate.Location = item.Location;

                _context.Entry(itemToUpdate).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }
    }
}
