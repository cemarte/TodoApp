using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace TodoApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public HomeController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        // [HttpGet]
        // [Produces("text/html")]
        public ActionResult Index()
        {
            string contentRootPath = _hostingEnvironment.WebRootPath;

            // return System.IO.File.ReadAllText(System.IO.Path.Combine(contentRootPath,"index.html"));
            return View();
        }
    }
}