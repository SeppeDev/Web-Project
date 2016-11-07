using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using ChoreHub.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ChoreHub.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class CategoriesController : Controller
    {
        public CategoriesController(ICategoryRepository categories, IUserRepository users)
        {
            Categories = categories;
            Users = users;
        }

        public ICategoryRepository Categories
        {
            get; set;
        }

        public IUserRepository Users
        {
            get; set;
        }

        // GET: api/categories
        [HttpGet]
        public IEnumerable<Category> GetAll()
        {
            return Categories.GetAll();
        }

        // GET api/categories/5
        [HttpGet("{id}", Name = "GetCategory")]
        public IActionResult GetById(int id)
        {
            var category = Categories.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            return new ObjectResult(category);
        }

        // POST api/categories
        [HttpPost]
        public IActionResult Create([FromBody]Category category)
        {
            if (category == null)
            {
                return BadRequest();
            }

            Categories.Add(category);
            return CreatedAtRoute("GetCategory", new { Controller = "Categories", id = category.Id }, category);
        }

        // DELETE api/categories/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!Users.IsAdmin(HttpContext.User)) return BadRequest();

            var category = Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            Categories.Remove(id);
            return new NoContentResult();
        }
    }
}
