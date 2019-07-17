using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Technovert.Internship.Classifieds.Services
{
    public class Attributes
    {
        public int ID { get; set; }
        public int CategoryID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
        public bool Mandatory { get; set; }
        public string Description { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }


        //public User CreatedBy { get; set; }
        //public User ModifiedBy { get; set; }
    }
}