using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Technovert.Internship.Classifieds.Services
{
    public class Chat
    {
        public int ID { get; set; }
        public int OfferID { get; set; }
        public string Message { get; set; }
        public User SenderDetails { get; set; }
        public User ReceiverDetails { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}