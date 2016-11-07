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
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(46)]
        public string Title { get; set; }

        [Required]
        public User User { get; set; }

        [Required]
        public Category Category { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(MAX)")]
        public string Description { get; set; }

        [Required]
        [MaxLength(46)]
        public string Location { get; set; }
    }
}
