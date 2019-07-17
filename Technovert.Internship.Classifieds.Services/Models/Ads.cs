using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Technovert.Internship.Classifieds.Services
{
    public class Ads
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Expiry { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public int Views { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }


        public User CreatedByUser { get; set; }
        public User ModifiedByUser { get; set; }
        public Status Status { get; set; }
        public Category CategoryDetails { get; set; }
        public List<Attributes> AttributesDetails { get; set; }
        public List<Images> Images { get; set; }
        public int OffersCount { get; set; }
        public int CommentsCount { get; set; }


        public List<Offers> Offers { get; set; }
    }
}