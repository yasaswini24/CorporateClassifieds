using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Technovert.Internship.Classifieds.Services
{
    public class Category
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public byte[] Icon { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public string Description { get; set; }

        public List<Attributes> Attributes { get; set; }
        //public User CreatedBy { get; set; }
        //public User ModifiedBy { get; set; }
    }
}