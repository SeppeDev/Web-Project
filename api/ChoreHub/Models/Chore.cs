using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChoreHub.Models
{
    public class Chore
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public User User { get; set; }
        public Category Category { get; set; }
        public string Description { get; set; }
    }
}
