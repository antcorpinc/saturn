using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Authorization;
using Saturn.ViewModels;
using Saturn.Contracts;
using Saturn.Entities;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Saturn.Controllers.Mvc
{
    public class AccountController : Controller
    {
        private ISecurityAdapter _securityAdapter;

        public AccountController(ISecurityAdapter securityAdapter)
        {
            _securityAdapter = securityAdapter;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

    
        // GET: /Account/Register
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]// ToDO: May be change this - since only valid users can register other users
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(AccountRegisterViewModel model )
        {
            if(ModelState.IsValid)
            {
                var user = new User { FirstName= model.FirstName,Email= model.LoginEmail,UserName=model.LoginEmail};
                var result = await _securityAdapter.RegisterAsync(user, model.Password);
                if(result)
                {
                    await  _securityAdapter.LoginAsync(model.LoginEmail, model.Password, false);
                    return RedirectToAction(nameof(HomeController.Index), "Home");
                }
            }
            return View(model);
        }
    }
}
