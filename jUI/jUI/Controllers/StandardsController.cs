using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace jUI.Controllers
{
    public class StandardsController : Controller
    {
        //
        // GET: /Standards/

        public ActionResult Index()
        {
            return View();
        }

		public ActionResult Basic()
		{
			return View();
		}
    }
}
