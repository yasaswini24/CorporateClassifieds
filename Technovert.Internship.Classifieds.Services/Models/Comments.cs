using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Technovert.Internship.Classifieds.Services
{
    public class Comments
    {
        public int ID { get; set; }
        public int CommentBy { get; set; }
        public int AdID { get; set; }
        public int ParentCommentID { get; set; }
        public DateTime Created { get; set; }
    }
}