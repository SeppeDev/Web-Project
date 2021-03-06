﻿using System;
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

        // GET : api/chores/user/5
        [HttpGet("user/{id}", Name = "GetChoreByUser")]
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


            Chores.Update(chore);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!Users.IsAdmin(HttpContext.User)) return BadRequest();

            var chore = Chores.Find(id);
            if(chore == null)
            {
                return NotFound();
            }

            Chores.Remove(id);
            return new NoContentResult();
        }
    }
}
