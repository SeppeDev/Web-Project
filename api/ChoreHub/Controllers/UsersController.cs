using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using ChoreHub.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ChoreHub.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : Controller
    {
        public UsersController(IUserRepository users )
        {
            Users = users;
        }

        public IUserRepository Users
        {
            get; set;
        }

        /**
         * GET: api/users/admin
         * 
         * Get all users
         */
        [HttpGet]
        [Route("admin")]
        public IEnumerable<User> Get()
        {
            return Users.GetAll();
        }

        /**
         * GET: api/users
         * 
         * Get all public users
         */
        [HttpGet]
        public IEnumerable<User> GetPublic()
        {
            return Users.GetAllPublic();
        }

        /**
         * GET: api/users/id/5
         * 
         * Get a specific user by his id
         */
        [HttpGet("id/{id}", Name = "GetUser")]
        public IActionResult GetById(int id)
        {
            var user = Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return new ObjectResult(user);
        }

        /**
         * GET api/users/userid/5
         * 
         * Get a specific user by his Auth0Id
         */
        [HttpGet("userid/{id}", Name = "GetUserByUserId")]
        public IActionResult GetById(string id)
        {
            var user = Users.FindByUserId(id);

            if (user == null)
            {
                return NotFound();
            }

            return new ObjectResult(user);
        }

        /**
         * POST: api/users
         * 
         * Create a new user
         */
        [HttpPost]
        public IActionResult Create([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            Users.Add(user);
            return CreatedAtRoute("GetUser", new { id = user.Id }, user);
        }

        /**
         * 
         */
        // PUT api/users/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]User user)
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

            if (olduser.Auth0Id == user.Auth0Id || user.IsAdmin == true)
            {
                Users.Update(user);
                return CreatedAtRoute("GetUser", new { id = user.Id }, user);
            }

            return BadRequest();
        }

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!Users.IsAdmin(HttpContext.User)) return BadRequest();

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
