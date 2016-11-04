using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

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

        private readonly IHttpContextAccessor _httpContextAccessor;
        private ISession _session => _httpContextAccessor.HttpContext.Session;


        // GET: api/users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return Users.GetAll();
        }

        // GET api/users/id/5
        [HttpGet("{id}", Name = "GetUser")]
        [Route("id")]
        public IActionResult GetById(int id)
        {
            var user = Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return new ObjectResult(user);
        }

        // GET api/users/userid/5
        [HttpGet("{id}", Name = "GetUserByUserId")]
        [Route("userid")]
        public IActionResult GetById(string id)
        {
            var user = Users.FindByUserId(id);

            HttpContext.Session.SetString("Id", id);
            HttpContext.Session.SetInt32("IsAdmin", Convert.ToInt32(user.IsAdmin));


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

            if (olduser.UserId == _session.GetString("Id") || _session.GetInt32("IsAdmin") == 1)
            {
                Users.Update(user);
                return new NoContentResult();
            }

            return BadRequest();
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

            if (user.UserId == _session.GetString("Id") || _session.GetInt32("IsAdmin") == 1)
            {
                Users.Remove(id);
                return new NoContentResult();
            }

            return BadRequest();
        }
    }
}
