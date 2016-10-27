using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChoreHub.Models
{
    public class Review
    {
        public int Id { get; set; }
        public User Author { get; set; }
        public User Subject { get; set; }
        public long Content { get; set; }
        public int Rating { get; set; }
    }
}
