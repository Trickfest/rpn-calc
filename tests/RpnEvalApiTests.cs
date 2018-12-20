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

            var whitespaceResult = ((RpnCalc.Controllers.RpnEvalResult)rpnEvalController.Get("        ").Value.Value);
            Assert.True(whitespaceResult.message == RpnCalc.Controllers.RpnEvalController.HELP_TEXT);
            Assert.True(whitespaceResult.result == null);

            var nullResult = ((RpnCalc.Controllers.RpnEvalResult)rpnEvalController.Get(null).Value.Value);
            Assert.True(nullResult.message == RpnCalc.Controllers.RpnEvalController.HELP_TEXT);
            Assert.True(nullResult.result == null);

            var emptyStringResult = ((RpnCalc.Controllers.RpnEvalResult)rpnEvalController.Get("").Value.Value);
            Assert.True(emptyStringResult.message == RpnCalc.Controllers.RpnEvalController.HELP_TEXT);
            Assert.True(emptyStringResult.result == null);
        }

        [Fact]
        public void SimpleExpressionTests()
        {
            var rpnEvalController = new RpnEvalController();

            {
                var result = ((RpnCalc.Controllers.RpnEvalResult)rpnEvalController.Get("10/5/p").Value.Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(double.Parse(result.result) == 15);
            }

            {
                var result = ((RpnCalc.Controllers.RpnEvalResult)rpnEvalController.Get("10/5/s").Value.Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(double.Parse(result.result) == 5);
            }

            {
                var result = ((RpnCalc.Controllers.RpnEvalResult)rpnEvalController.Get("10/5/m").Value.Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(double.Parse(result.result) == 50);
            }
            
            {
                var result = ((RpnCalc.Controllers.RpnEvalResult)rpnEvalController.Get("10/5/d").Value.Value);
                Assert.True(result.message == RpnCalc.Controllers.RpnEvalController.SUCCESS_TEXT);
                Assert.True(double.Parse(result.result) == 2);
            }
        }
    }
}
