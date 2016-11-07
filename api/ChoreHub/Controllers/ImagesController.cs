using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using ChoreHub.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ChoreHub.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ImagesController : Controller
    {
        public ImagesController(IImageRepository images)
        {
            Images = images;
        }

        public IImageRepository Images
        {
            get; set;
        }

        // GET: api/images
        [HttpGet]
        public IEnumerable<Image> Get()
        {
            return Images.GetAll();
        }

        // GET api/images/5
        [HttpGet("{id}", Name = "GetImage")]
        public IActionResult GetById(int id)
        {
            var image = Images.Find(id);

            if (image == null)
            {
                return NotFound();
            }

            return new ObjectResult(image);
        }

        // POST api/images
        [HttpPost]
        public IActionResult Create([FromBody] Image image)
        {
            if (image == null)
            {
                return BadRequest();
            }

            Images.Add(image);
            return CreatedAtRoute("GetImage", new { Controller = "Images", id = image.Link }, image);
        }

        // PUT api/images/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Image image)
        {
            if (image == null || image.Id != id)
            {
                return BadRequest();
            }

            var oldimage = Images.Find(id);
            if (oldimage == null)
            {
                return NotFound();
            }

            Images.Update(image);
            return new NoContentResult();
        }

        // DELETE api/images/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var image = Images.Find(id);
            if (image == null)
            {
                return NotFound();
            }

            Images.Remove(id);
            return new NoContentResult();
        }
    }
}
