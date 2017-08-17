using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChoreHub.Models
{
    public class Email
    {
        public string Recipient { get; set; }
        public string Content { get; set; }
    }
}
