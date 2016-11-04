using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChoreHub.Models
{
    public class Chore
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public User User { get; set; }

        [Required]
        public Category Category { get; set; }

        [Required]
        [MaxLength(255)]
        public string Description { get; set; }
    }
}
