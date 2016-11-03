using System;
using System.Collections.Generic;

namespace ChoreHub.Models
{
    public interface IReviewRepository
    {
        void Add(Review review);
        IEnumerable<Review> GetAll();
        IEnumerable<Review> GetByAuthorId(int id);
        IEnumerable<Review> GetBySubjectId(int id);
        Review Find(int id);
        void Remove(int id);
        void Update(Review review);
    }
}
