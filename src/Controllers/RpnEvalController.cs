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

        public const string INVALID_OPERATOR_TEXT = "invalid operator";

        public const string INVALID_EXPRESSION_TEXT = "invalid expression";

        public const string DIVIDE_BY_ZERO_TEXT = "divide by zero";

        public const string INCOMPLETE_EXPRESSION_TEXT = "incomplete expression - more than one number on stack";

        // GET api/rpneval/5/6/d
        [HttpGet("{*opStr}")]
        public ActionResult<RpnEvalResult> Get(string opStr)
        {
            if (string.IsNullOrWhiteSpace(opStr))
            {
                return new RpnEvalResult() { message = HELP_TEXT, answer = null };
            }

            string[] tokens = opStr.Split('/');

            Stack<decimal> stack = new Stack<decimal>();
            decimal number;

            foreach (string token in tokens)
            {
                if (decimal.TryParse(token, out number)) // is it a number? if so push on stack
                {
                    stack.Push(number);
                }
                else
                {
                    // if there are not two items on the stack, then expression is invalid
                    if (stack.Count < 2)
                    {
                        return new RpnEvalResult() { message = INVALID_EXPRESSION_TEXT, answer = null };
                    }

                    decimal op2 = stack.Pop();
                    decimal op1 = stack.Pop();

                    switch (token)
                    {
                        case "a":
                            stack.Push(op1 + op2);
                            break;

                        case "s":
                            stack.Push(op1 - op2);
                            break;

                        case "m":
                            stack.Push(op1 * op2);
                            break;

                        case "d":
                            if (op2 == decimal.Zero)
                            {
                                return new RpnEvalResult() { message = DIVIDE_BY_ZERO_TEXT, answer = null };
                            }
                            stack.Push(op1 / op2);
                            break;

                        default:
                            return new RpnEvalResult() { message = INVALID_OPERATOR_TEXT, answer = null };
                    }
                }
            }

            // more than a single result on the stack - treat as error
            if (stack.Count > 1)
            {
                return new RpnEvalResult() { message = INCOMPLETE_EXPRESSION_TEXT, answer = null };
            }

            return new RpnEvalResult() { message = SUCCESS_TEXT, answer = stack.Pop().ToString() };
        }
    }

    public class RpnEvalResult
    {
        public string message { get; set; }

        public string answer { get; set; }
    }
}