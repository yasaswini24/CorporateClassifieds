using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Technovert.Internship.Classifieds.Services;
using Dapper;
using Technovert.Internship.Classifieds.Services.Generic;
using Technovert.Internship.Classifieds.Services.Services;

namespace Technovert.Internship.Classifieds.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public IUserServices UserServices { get; set; }
        public UserController(IUserServices userServices)
        {
            UserServices = userServices;
        }


        // GET: api/Classifieds
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return UserServices.GetUsers();

        }

        [Route("{id}")]
        [HttpGet]
        public IEnumerable<User> GetUserByID(int id = 0)
        {
            if (id == 0)
                return GetUsers();
            else
                return UserServices.GetUsers(id);
        }

        // POST: api/Classifieds
        [HttpPost]
        public void PostUser([FromBody] User user)
        {
            UserServices.AddOrUpdateUser(user);
        }

        [HttpDelete("{id}")]
        public void DeleteUser(int id)
        {
            UserServices.DeleteUser(id);
        }
    }
}
