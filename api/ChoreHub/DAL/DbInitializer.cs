using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ChoreHub.DAL;
using ChoreHub.Models;

namespace ChoreHub.DAL
{
    public static class DbInitializer
    {
        public static void Initialize(ChoreHubContext context)
        {
            context.Database.EnsureCreated();

            //if (context.Categories.Any())
            //{
            //    return;
            //}

            /*var images = new Image[]
            {
                new Image { Link="http://images.clipartpanda.com/free-clip-art-children-chores-9TpejE9jc.jpeg" }
            };
            foreach (Image i in images)
            {
                context.Images.Add(i);
            }
            context.SaveChanges();*/
        }
    }
}