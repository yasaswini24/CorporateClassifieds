using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Technovert.Internship.Classifieds.Services.IServices;


namespace Technovert.Internship.Classifieds.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        public IReportServices reportServices { get; set; }
        public ReportController(IReportServices ReportServices)
        {
            reportServices = ReportServices;
        }
        // POST: api/Report
        [HttpPost]
        public ActionResult ReportAd([FromBody] Reports report)
        {
            if (reportServices.Report(report))
                return Ok();
            else
                return null;
        }

        // PUT: api/Report/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
