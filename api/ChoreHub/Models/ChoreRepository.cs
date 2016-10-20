﻿using System;
using System.Collections.Generic;
using System.Linq;

using ChoreHub.DAL;

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
            return _context.Chores;
        }

        public void Add(Chore item)
        {
            _context.Chores.Add(item);
        }

        public Chore Find(int id)
        {
            return _context.Chores
                .SingleOrDefault(e => e.ID.Equals(id));
        }

        public void Remove(int id)
        {
            var itemToRemove = _context.Chores.SingleOrDefault(e => e.ID.Equals(id));
            if (itemToRemove != null)
            {
                _context.Chores.Remove(itemToRemove);
            }
        }

        public void Update(Chore item)
        {
            var itemToUpdate = _context.Chores.SingleOrDefault(e => e.ID.Equals(item.ID));
            if (itemToUpdate != null)
            {
                itemToUpdate.Title = item.Title;
                itemToUpdate.Description = item.Description;
                itemToUpdate.User = item.User;
            }
        }
    }
}
