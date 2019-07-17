using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Technovert.Internship.Classifieds.Services
{
    public class Offers
    {
        public int ID { get; set; }
        public int AdID { get; set; }
        public int OfferAmount { get; set; }
        public bool Sold { get; set; }
        public string OfferDesc { get; set; }
        public User OfferByDetails { get; set; }
        public Ads Ad { get; set; }
        //public List<Chat> Chat { get; set; }
    }
}