using Microsoft.AspNet.Identity;
using Saturn.Contracts;
using Saturn.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Saturn.Services
{
    public class IdentitySecurityService : ISecurityAdapter
    {
        private SignInManager<User> _signInManager;
        private UserManager<User> _userManager;

        public IdentitySecurityService(UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public bool ChangePassword(string loginEmail, string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> LoginAsync(string loginEmail, string password, bool rememberMe)
        {
            var signInResult= await  _signInManager.PasswordSignInAsync(loginEmail, password, rememberMe, false);

            return signInResult.Succeeded;
        }        

        public async Task<bool> RegisterAsync(User user,string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            return result.Succeeded;
        }

        public bool UserExists(string loginEmail)
        {
            throw new NotImplementedException();
        }

        public async void LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
