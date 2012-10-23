using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace jUI.Controllers
{
    public class TestController : Controller
    {
        //
        // GET: /Test/

        public ActionResult Index()
        {
            return View();
        }

		public ActionResult layout()
		{
			return View();
		}

		public ActionResult datapager()
		{
			return View();
		}

		public ActionResult table()
		{
			return View();
		}

		public ActionResult tip()
		{
			return View();
		}

		public ActionResult datetimepicker()
		{
			return View();
		}
	}
}
