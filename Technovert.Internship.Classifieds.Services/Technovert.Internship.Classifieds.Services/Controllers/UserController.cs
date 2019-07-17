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
using Technovert.Internship.Classifieds.Services.Models;

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

        [Route("FindUser/{Name}")]
        [HttpPost]
        public ActionResult FindUser(string Name)
        {
            if (UserServices.GetUserByName(Name))
                return Ok();
            else
                return BadRequest();
        }

        [Route("Validate/")]
        [HttpPost]
        public ActionResult<User> ValidateUser([FromBody]Credentials credentials)
        {
            User user= UserServices.ValidateUser(credentials);
            if (user!=null)
                return user;
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("SignUp/")]
        public ActionResult UserSignUp([FromBody] UserRegistration userInfo)
        {
            if (UserServices.UpsertUserCredentials(userInfo))
                return Ok();
            else
                return BadRequest();
        }

        [HttpPost]
        public ActionResult PostUser([FromBody] List<User> user)
        {
            if (UserServices.AddOrUpdateUser(user)!=0)
                return Ok();
            else
                return BadRequest();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteUser(int id)
        {
            if (UserServices.DeleteUser(id))
                return Ok();
            else
                return BadRequest();
        }
    }
}
