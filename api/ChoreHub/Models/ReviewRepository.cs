using System;
using System.Collections.Generic;
using System.Linq;

using ChoreHub.DAL;

namespace ChoreHub.Models
{
    public class ReviewRepository :IReviewRepository
    {
        private readonly ChoreHubContext _context;

        public ReviewRepository(ChoreHubContext context)
        {
            _context = context;
        }

        public IEnumerable<Review> GetAll()
        {
            return _context.Reviews;
        }

        public IEnumerable<Review> GetByAuthorId(int id)
        {
            return _context.Reviews.Where(e => e.Author.Id.Equals(id));
        }

        public IEnumerable<Review> GetBySubjectId(int id)
        {
            return _context.Reviews.Where(e => e.Subject.Id.Equals(id));
        }

        public void Add(Review item)
        {
            _context.Reviews.Add(item);
            _context.SaveChanges();
        }

        public Review Find(int id)
        {
            return _context.Reviews
                .SingleOrDefault(e => e.Id.Equals(id));
        }

        public void Remove(int id)
        {
            var itemToRemove = _context.Reviews.SingleOrDefault(e => e.Id.Equals(id));
            if (itemToRemove != null)
            {
                _context.Reviews.Remove(itemToRemove);
                _context.SaveChanges();
            }
        }

        public void Update(Review item)
        {
            var itemToUpdate = _context.Reviews.SingleOrDefault(e => e.Id.Equals(item.Id));
            if (itemToUpdate != null)
            {
                itemToUpdate.Author = item.Author;
                itemToUpdate.Subject = item.Subject;
                itemToUpdate.Content = item.Content;
                itemToUpdate.Rating = item.Rating;
            }
        }
    }
}