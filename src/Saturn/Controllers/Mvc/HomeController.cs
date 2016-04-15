using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Saturn.ResourceAccess;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Saturn.Controllers.Mvc
{
    public class HomeController : Controller
    {
        
        private EduContext _context;

        public HomeController(EduContext context)
        {
            _context = context;
        }
        // GET: /<controller>/
        public ViewResult  Index()
        {
            return View();
        }
    }
}
