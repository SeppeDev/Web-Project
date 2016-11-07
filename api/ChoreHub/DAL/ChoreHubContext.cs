using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using ChoreHub.Models;
using Microsoft.EntityFrameworkCore;

namespace ChoreHub.DAL
{
    public class ChoreHubContext : DbContext
    {
        public ChoreHubContext(DbContextOptions<ChoreHubContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Chore> Chores { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
