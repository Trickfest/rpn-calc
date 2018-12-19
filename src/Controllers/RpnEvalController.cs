using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace apitest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RpnEvalController : ControllerBase
    {
        // GET api/rpneval/5/6/d
        [HttpGet("{*opStr}")]
        public ActionResult<string> Get(string opStr)
        {
            return eval(opStr);
        }

        private string eval(string opStr)
        {
            if (string.IsNullOrWhiteSpace(opStr))
                return "this is help text";
            else
                return opStr;
        }
    }
}
