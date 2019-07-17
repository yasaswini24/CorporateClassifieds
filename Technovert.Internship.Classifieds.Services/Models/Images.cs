using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Technovert.Internship.Classifieds.Services
{
    public class Images
    {
        public int ID { get; set; }
        public int AdID { get; set; }
        public byte[] Image{ get; set; }
        public int IsActive { get; set; }
    }
}