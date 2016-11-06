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
        public UsersController(IUserRepository users )
        {
            Users = users;
        }

        public IUserRepository Users
        {
            get; set;
        }

        // GET: api/users/admin
        [HttpGet]
        [Route("admin")]
        public IEnumerable<User> Get()
        {
            return Users.GetAll();
        }

        // GET: api/users
        [HttpGet]
        public IEnumerable<User> GetPublic()
        {
            return Users.GetAllPublic();
        }

        // GET api/users/id/5
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

        // GET api/users/userid/5
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

        // POST api/users
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
            var user = Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            //if (user.Auth0Id == _session.GetString("Id") || _session.GetInt32("IsAdmin") == 1)
            //{
                Users.Remove(id);
                return new NoContentResult();
            //}

            //return BadRequest();
        }

        //PRIVATE FUNCTIONS

        //private bool IsAdmin()
        //{
        //    if (_session.GetInt32("IsAdmin") == 1)
        //    {
        //        return true;
        //    }
        //    else
        //    {
        //        return false;
        //    }
        //}
    }
}
