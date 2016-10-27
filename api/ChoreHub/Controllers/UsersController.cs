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
    public class UsersController : Controller
    {
        public UsersController(IUserRepository users)
        {
            Users = users;
        }

        public IUserRepository Users
        {
            get; set;
        }

        // GET: api/users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return Users.GetAll();
        }

        // GET api/users/5
        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetById(int id)
        {
            var user = Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return new ObjectResult(user);
        }

        // POST api/users
        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            Users.Add(user);
            return CreatedAtRoute("GetUser", new { id = user.Id }, user);
        }

        // PUT api/users/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] User user)
        {
            if (user == null || user.Id != id)
            {
                return BadRequest();
            }

            var olduser = Users.Find(id);
            if (olduser == null)
            {
                return NotFound();
            }

            Users.Update(user);
            return new NoContentResult();
        }

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            Users.Remove(id);
            return new NoContentResult();
        }
    }
}
