using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Technovert.Internship.Classifieds.Services
{
    public class Reports
    {
        public int ID { get; set; }
        public int AdID { get; set; }
        public string Report { get; set; }
        public string ReportedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}