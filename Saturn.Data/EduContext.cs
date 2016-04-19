using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Saturn.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Saturn.Data
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".

    public class EduContext : IdentityDbContext<User>
    {
        public EduContext()
        {
            Database.EnsureCreated();
        }

        //   public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {

            // If you want to change the default schema   
            // builder.HasDefaultSchema("Identity");
           
            base.OnModelCreating(builder);
            // TO change the name of the default Identity AspNetUsers table to the Account Table 
            builder.Entity<User>().ToTable("Account").HasKey(e => e.Id);
            
        }
    }
}
