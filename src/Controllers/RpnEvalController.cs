using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RpnCalc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RpnEvalController : ControllerBase
    {
        public const string HELP_TEXT = "this is help text";
        public const string SUCCESS_TEXT = "success";

        // GET api/rpneval/5/6/d
        [HttpGet("{*opStr}")]
        public ActionResult<JsonResult> Get(string opStr)
        {
            if (string.IsNullOrWhiteSpace(opStr))
            {
                return new JsonResult(new RpnEvalResult() { message = HELP_TEXT, result = null });
            }
            return null;
        }
    }

    public class RpnEvalResult
    {
        public string message { get; set; }

        public string result { get; set; }
    }
}