using System;
using System.Collections.Generic;
using System.Linq;

using ChoreHub.DAL;

namespace ChoreHub.Models
{
    public class CategoryRepository :ICategoryRepository
    {
        private readonly ChoreHubContext _context;

        public CategoryRepository(ChoreHubContext context)
        {
            _context = context;
        }

        public IEnumerable<Category> GetAll()
        {
            return _context.Categories;
        }

        public void Add(Category item)
        {
            _context.Categories.Add(item);
            _context.SaveChanges();
        }

        public Category Find(int id)
        {
            return _context.Categories
                .SingleOrDefault(e => e.Id.Equals(id));
        }

        public void Remove(int id)
        {
            var itemToRemove = _context.Categories.SingleOrDefault(e => e.Id.Equals(id));
            if(itemToRemove != null)
            {
                _context.Categories.Remove(itemToRemove);
                _context.SaveChanges();
            }
        }

        public void Update(Category item)
        {
            var itemToUpdate = _context.Categories.SingleOrDefault(e => e.Id.Equals(item.Id));
            if(itemToUpdate != null)
            {
                itemToUpdate.Name = item.Name;
                //itemToUpdate.Image = item.Image;
            }
        }
    }
}
