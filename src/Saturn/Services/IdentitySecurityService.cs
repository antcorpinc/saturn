using Saturn.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Saturn.Services
{
    public class IdentitySecurityService : ISecurityAdapter
    {
        public bool ChangePassword(string loginEmail, string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }

        public bool Login(string loginEmail, string password, bool rememberMe)
        {
            throw new NotImplementedException();
        }

        public void Register(string loginEmail, string password, object propertyValues)
        {
            throw new NotImplementedException();
        }

        public bool UserExists(string loginEmail)
        {
            throw new NotImplementedException();
        }
    }
}
