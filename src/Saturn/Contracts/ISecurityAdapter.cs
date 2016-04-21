using Saturn.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Saturn.Contracts
{
    // ToDo - MIght need to change the signature for the below
    public interface ISecurityAdapter
    {
        Task<bool> RegisterAsync(User user, string password);
        Task<bool> LoginAsync(string loginEmail, string password, bool rememberMe);
        bool ChangePassword(string loginEmail, string oldPassword, string newPassword);
        bool UserExists(string loginEmail);
        void LogoutAsync();
    }
}
