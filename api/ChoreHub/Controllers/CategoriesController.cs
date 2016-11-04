using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using ChoreHub.Models;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ChoreHub.Controllers
{
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {
        public CategoriesController(ICategoryRepository categories, IHttpContextAccessor httpContextAccessor)
        {
            Categories = categories;
            _httpContextAccessor = httpContextAccessor;
        }

        public ICategoryRepository Categories
        {
            get; set;
        }

        private readonly IHttpContextAccessor _httpContextAccessor;
        private ISession _session => _httpContextAccessor.HttpContext.Session;

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

        // PUT api/categories/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Category category)
        {
            if (category == null || category.Id != id)
            {
                return BadRequest();
            }

            var oldcategory = Categories.Find(id);
            if (oldcategory == null)
            {
                return NotFound();
            }

            if (_session.GetInt32("IsAdmin") == 1)
            {
                Categories.Update(category);
                return new NoContentResult();
            }

            return BadRequest();
        }

        // DELETE api/categories/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var category = Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            if (_session.GetInt32("IsAdmin") == 1)
            {
                Categories.Remove(id);
                return new NoContentResult();
            }

            return BadRequest();
        }
    }
}
