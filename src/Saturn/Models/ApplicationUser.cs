using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Saturn.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string LastName { get; set; }
    }
}
