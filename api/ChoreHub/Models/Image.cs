using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChoreHub.Models
{
    public class Image
    {
        public int Id { get; set; }

        [Required]
        [Url]
        public string Link { get; set; }
    }
}
