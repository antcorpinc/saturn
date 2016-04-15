using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Saturn.Contracts
{
    // ToDo - MIght need to change the signature for the below
    public interface ISecurityAdapter
    {
        void Register(string loginEmail, string password, object propertyValues);
        bool Login(string loginEmail, string password, bool rememberMe);
        bool ChangePassword(string loginEmail, string oldPassword, string newPassword);
        bool UserExists(string loginEmail);
    }
}
