using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [Column(TypeName = "nvarchar(MAX)")]
        public string Description { get; set; }
    }
}
