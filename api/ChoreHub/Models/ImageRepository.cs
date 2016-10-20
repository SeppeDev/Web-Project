using System;
using System.Collections.Generic;
using System.Linq;

using ChoreHub.DAL;

namespace ChoreHub.Models
{
    public class ImageRepository : IImageRepository
    {
        private readonly ChoreHubContext _context;

        public ImageRepository(ChoreHubContext context)
        {
            _context = context;
        }

        public IEnumerable<Image> GetAll()
        {
            return _context.Images;
        }

        public void Add(Image item)
        {
            _context.Images.Add(item);
        }

        public Image Find(int id)
        {
            return _context.Images
                .SingleOrDefault(e => e.ID.Equals(id));
        }

        public void Remove(int id)
        {
            var itemToRemove = _context.Images.SingleOrDefault(e => e.ID.Equals(id));
            if (itemToRemove != null)
            {
                _context.Images.Remove(itemToRemove);
            }
        }

        public void Update(Image item)
        {
            var itemToUpdate = _context.Images.SingleOrDefault(e => e.ID.Equals(item.ID));
            if (itemToUpdate != null)
            {
                itemToUpdate.Link = item.Link;
            }
        }
    }
}
