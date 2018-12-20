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
    }
}
