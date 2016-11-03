using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using ChoreHub.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ChoreHub.Controllers
{
    [Route("api/[controller]")]
    public class ReviewsController : Controller
    {
        public ReviewsController(IReviewRepository reviews, IUserRepository users)
        {
            Reviews = reviews;
            Users = users;
        }

        public IReviewRepository Reviews
        {
            get; set;
        }

        public IUserRepository Users
        {
            get; set;
        }

        // GET: api/reviews
        [HttpGet]
        public IEnumerable<Review> Get()
        {
            return Reviews.GetAll();
        }

        // GET api/reviews/5
        [HttpGet("{id}", Name = "GetReview")]
        public IActionResult GetById(int id)
        {
            var review = Reviews.Find(id);

            if (review == null)
            {
                return NotFound();
            }

            return new ObjectResult(review);
        }

        // GET : api/reviews/author/5
        [HttpGet("{id}", Name = "GetReviewByAuthor")]
        [Route("author")]
        public IEnumerable<Review> GetByAuthorId(int id)
        {
            var author = Users.Find(id);

            if (author == null)
            {
                return null;
            }

            return Reviews.GetByAuthorId(id);
        }

        // GET : api/reviews/subject/5
        [HttpGet("{id}", Name = "GetReviewBySubject")]
        [Route("subject")]
        public IEnumerable<Review> GetBySubjectId(int id)
        {
            var subject = Users.Find(id);

            if (subject == null)
            {
                return null;
            }

            return Reviews.GetBySubjectId(id);
        }

        // POST api/reviews
        [HttpPost]
        public IActionResult Create([FromBody] Review review)
        {
            if (review == null)
            {
                return BadRequest();
            }

            Reviews.Add(review);
            return CreatedAtRoute("GetReview", new { id = review.Id }, review);
        }

        // PUT api/reviews/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Review review)
        {
            if (review == null || review.Id != id)
            {
                return BadRequest();
            }

            var oldreview = Reviews.Find(id);
            if (oldreview == null)
            {
                return NotFound();
            }

            Reviews.Update(review);
            return new NoContentResult();
        }

        // DELETE api/images/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var review = Reviews.Find(id);
            if (review == null)
            {
                return NotFound();
            }

            Reviews.Remove(id);
            return new NoContentResult();
        }
    }
}
