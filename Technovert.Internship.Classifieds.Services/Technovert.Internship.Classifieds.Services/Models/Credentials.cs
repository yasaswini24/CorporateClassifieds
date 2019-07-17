using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Technovert.Internship.Classifieds.Services
{
    public class Credentials
    {
        //public int ID { get; set; }
        public string Username { get; set; }
        protected virtual string PasswordStored { get; set; }

        public string Password
        {
            get
            {
                return Decrypt(PasswordStored);
            }
            set
            {
                PasswordStored = Encrypt(value);
            }
        }

        private string Encrypt(string value)
        {
            //encryption code
            return value + "infinity";
        }

        private string Decrypt(string value)
        {
            //decryption code
            return value;
        }
    }
}