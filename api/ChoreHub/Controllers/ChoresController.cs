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
    public class ChoresController : Controller
    {
        public ChoresController(IChoreRepository chores)
        {
            Chores = chores;
        }

        public IChoreRepository Chores
        {
            get; set;
        }

        [HttpGet]
        public IEnumerable<Chore> GetAll()
        {
            return Chores.GetAll();
        }

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

        [HttpPost]
        public IActionResult Create([FromBody] Chore chore)
        {
            if(chore == null)
            {
                return BadRequest();
            }

            Chores.Add(chore);
            return CreatedAtRoute("GetChore", new { id = chore.ID }, chore);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Chore chore)
        {
            if(chore == null || chore.ID != id)
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
