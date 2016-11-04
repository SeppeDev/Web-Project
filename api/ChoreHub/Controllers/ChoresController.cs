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
    public class ChoresController : Controller
    {
        public ChoresController(IChoreRepository chores, ICategoryRepository categories, IUserRepository users)
        {
            Chores = chores;
            Categories = categories;
            Users = users;
        }

        public IChoreRepository Chores
        {
            get; set;
        }

        private readonly IHttpContextAccessor _httpContextAccessor;
        private ISession _session => _httpContextAccessor.HttpContext.Session;

        public ICategoryRepository Categories
        {
            get; set;
        }

        public IUserRepository Users
        {
            get; set;
        }

        // GET : api/chores
        [HttpGet]
        public IEnumerable<Chore> GetAll()
        {
            return Chores.GetAll();
        }

        // GET : api/chores/5
        [HttpGet("{id}", Name = "GetChore")]
        public IActionResult GetById(int id)
        {
            var chore = Chores.Find(id);

            if (chore == null)
            {
                return NotFound();
            }

            return new ObjectResult(chore);
        }

        // GET : api/chores/category/5
        [HttpGet("{id}", Name = "GetChoreByCategory")]
        [Route("category")]
        public IEnumerable<Chore> GetByCategoryId(int id)
        {
            var category = Categories.Find(id);

            if (category == null)
            {
                return null;
            }

            return Chores.GetByCategoryId(id);
        }

        // GET : api/chores/user/5
        [HttpGet("{id}", Name = "GetChoreByUser")]
        [Route("user")]
        public IEnumerable<Chore> GetByUserId(int id)
        {
            var user = Users.Find(id);

            if (user == null)
            {
                return null;
            }

            return Chores.GetByUserId(id);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Chore chore)
        {
            if(chore == null)
            {
                return BadRequest();
            }

            Chores.Add(chore);
            return CreatedAtRoute("GetChore", new { id = chore.Id }, chore);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Chore chore)
        {
            if(chore == null || chore.Id != id)
            {
                return BadRequest();
            }

            var oldchore = Chores.Find(id);
            if(oldchore == null)
            {
                return NotFound();
            }

            if (oldchore.User.UserId == _session.GetString("Id") || _session.GetInt32("IsAdmin") == 1)
            {
                Chores.Update(chore);
                return new NoContentResult();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var chore = Chores.Find(id);
            if(chore == null)
            {
                return NotFound();
            }

            if (chore.User.UserId == _session.GetString("Id") || _session.GetInt32("IsAdmin") == 1)
            {
                Chores.Remove(id);
                return new NoContentResult();
            }

            return BadRequest();
        }
    }
}
