using System;
using RpnCalc.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace RpnEvalTests
{
    public class RpnEvalApiTests
    {
        [Fact]
        public void AlwaysSucceeds() // just to ensure test framework is functioning correctly
        {
            Assert.True(true);
        }

        [Fact]
        public void CheckForHelpText()
        {
            var rpnEvalController = new RpnEvalController();

            var whitespaceResult = ((RpnEvalResult)rpnEvalController.Get("        ").Value);
            Assert.True(whitespaceResult.message == RpnCalc.Controllers.RpnEvalController.HELP_TEXT);
            Assert.True(whitespaceResult.answer == null);

            var nullResult = ((RpnEvalResult)rpnEvalController.Get(null).Value);
            Assert.True(nullResult.message == RpnCalc.Controllers.RpnEvalController.HELP_TEXT);
            Assert.True(nullResult.answer == null);

            var emptyStringResult = ((RpnEvalResult)rpnEvalController.Get("").Value);
            Assert.True(emptyStringResult.message == RpnCalc.Controllers.RpnEvalController.HELP_TEXT);
            Assert.True(emptyStringResult.answer == null);
        }

        [Fact]
        public void SimpleExpressionTests()
        {
            var rpnEvalController = new RpnEvalController();

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("10/5/a").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(decimal.Parse(result.answer) == 15);
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("10/5/s").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(decimal.Parse(result.answer) == 5);
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("10/5/m").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(decimal.Parse(result.answer) == 50);
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("10/5/d").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(decimal.Parse(result.answer) == 2);
            }
        }

        [Fact]
        public void BadExpressionTests()
        {
            var rpnEvalController = new RpnEvalController();

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("10/5/p").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.INVALID_OPERATOR_TEXT);
                Assert.True(result.answer == null);
            }
            
            {
                var result = ((RpnEvalResult)rpnEvalController.Get("10/5/*").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.INVALID_OPERATOR_TEXT);
                Assert.True(result.answer == null);
            }
            
            {
                var result = ((RpnEvalResult)rpnEvalController.Get("10/5/+").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.INVALID_OPERATOR_TEXT);
                Assert.True(result.answer == null);
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("10/5/-").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.INVALID_OPERATOR_TEXT);
                Assert.True(result.answer == null);
            }
            
            {
                var result = ((RpnEvalResult)rpnEvalController.Get("10/5/x").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.INVALID_OPERATOR_TEXT);
                Assert.True(result.answer == null);
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("5/a").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.INVALID_EXPRESSION_TEXT);
                Assert.True(result.answer == null);
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("a").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.INVALID_EXPRESSION_TEXT);
                Assert.True(result.answer == null);
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("5/5/5/a").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.INCOMPLETE_EXPRESSION_TEXT);
                Assert.True(result.answer == null);
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("5/0/d").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.DIVIDE_BY_ZERO_TEXT);
                Assert.True(result.answer == null);
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("5/4/4/s/d").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.DIVIDE_BY_ZERO_TEXT);
                Assert.True(result.answer == null);
            }
        }

        [Fact]
        public void ComplexExpressionTests()
        {
            var rpnEvalController = new RpnEvalController();

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("10/3/d").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(decimal.Parse(result.answer) == decimal.Parse(((decimal)10 / (decimal)3).ToString()));
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("-10/-3/a").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(decimal.Parse(result.answer) == -13);
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("-10.4/-3.7/a").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(decimal.Parse(result.answer) == (decimal)-14.1);
            }

            {
                var result = ((RpnEvalResult)rpnEvalController.Get("-10.4/-3.7/a/4/s/2/m/04.00/2/d/d/2/d/5.0/0002.000/m/m/00.007/s/-00005.50000/a").Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(decimal.Parse(result.answer) == (decimal)-96.007);
            }
        }
    }
}
