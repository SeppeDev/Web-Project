﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChoreHub.Models
{
    public class User
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public Image Image { get; set; }
    }
}