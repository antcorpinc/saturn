﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Saturn.Controllers.Mvc
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public string  Index()
        {
            return "Hello from the controller";
        }
    }
}
