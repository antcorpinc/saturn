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
       
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult RegisterTest()
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

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(AccountLoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _securityAdapter.LoginAsync(model.LoginEmail, model.Password, model.RememberMe);
                if (result)
                {
                     return RedirectToLocal(returnUrl);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return View(model);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public  IActionResult LogOff()
        {
             _securityAdapter.LogoutAsync();           
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }
    }
}
