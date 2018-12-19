using System;
using apitest.Controllers;
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
            var ctl = new RpnEvalController();

            var r1 = ctl.Get("");
            Assert.True(r1.Value == "this is help text");
            
            var r2 = ctl.Get(null);
            Assert.True(r2.Value == "this is help text");
        }
    }
}
