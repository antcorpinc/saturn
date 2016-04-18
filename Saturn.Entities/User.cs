using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Saturn.Entities
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class User:IdentityUser
    {    
        public User()
        {

        }

        public string FirstName { get; set; }
     //   public string LastName { get; set; } //Since already present in the current
        //  public UserType UserType{ get; set; }
        public bool IsSuperAdmin { get; set; }
        public bool IsActive { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
