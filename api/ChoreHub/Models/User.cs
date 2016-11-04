using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChoreHub.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string UserId { get; set; }

        [Required]
        [MaxLength(46)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(46)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(62)]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
	    public string Description { get; set; }

        [DefaultValue(false)]
        public bool IsAdmin { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        [Required]
        public Image Image { get; set; }
    }
}
