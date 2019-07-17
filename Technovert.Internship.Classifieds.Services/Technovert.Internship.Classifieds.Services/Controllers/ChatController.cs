using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Technovert.Internship.Classifieds.Services.IServices;

namespace Technovert.Internship.Classifieds.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        public IChatServices ChatServices { get; set; }
        public ChatController(IChatServices chatServices)
        {
            ChatServices = chatServices;
        }
        // GET: api/Chat
        [HttpGet("{OfferID}")]
        public List<Chat> GetChatByID(int OfferID)
        {
            return ChatServices.GetChatByOfferID(OfferID);
        }

        //// GET: api/Chat/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Chat
        [HttpPost]
        public void PostMessage([FromBody] Chat chat)
        {
            ChatServices.PostMessage(chat);
        }

        // PUT: api/Chat/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
