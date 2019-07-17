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
        public string ReportDescription { get; set; }
        public string ReportCategory { get; set; }
        public User ReportedBy { get; set; }
        public User ModifiedBy { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}