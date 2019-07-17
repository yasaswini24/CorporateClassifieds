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
    public class OffersController : ControllerBase
    {
        public IOfferServices offerServices { get; set; }
        public OffersController(IOfferServices OfferServices)
        {
            offerServices = OfferServices;
        }

        // GET: api/Offers
        [HttpGet("{UserID}", Name = "Get")]
        public List<Offers> GetAllOffersByUserID(int UserID)
        {
            return offerServices.GetAllOffersByUserID(UserID);
        }

        //// GET: api/Offers/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Offers
        [HttpPost]
        public ActionResult MakeAnOffer([FromBody]Offers offer)
        {
            if (offerServices.MakeAnOffer(offer))
                return Ok();
            else
                return null;
        }

        // PUT: api/Offers/5
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
