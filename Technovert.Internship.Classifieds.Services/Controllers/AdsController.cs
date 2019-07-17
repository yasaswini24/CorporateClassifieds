using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Technovert.Internship.Classifieds.Services.Models;
using Technovert.Internship.Classifieds.Services.Services;

namespace Technovert.Internship.Classifieds.Services.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AdsController : ControllerBase
    {

        public IAdServices AdService { get; set; }

        public AdsController(IAdServices adService)
        {
            AdService = adService;
        }


        [HttpGet]
        [Route("{start}/{end}")]
        public List<Ads> GetAllAds(int start,int end)
        {
            return AdService.GetAllAds(start,end);
        }



        [HttpGet("{id}")]
        public List<Ads> GetAdByID(int id)
        {
            return AdService.GetAdByID(id);
        }

        [HttpGet("GetAdsByUserID/{id}/{StatusCode}/{start}/{end}")]
        public List<Ads> GetAdsByUserID(int id,string StatusCode,int start,int end)
        {
            return AdService.GetAdsByUserID(id,StatusCode,start,end);
        }

        //[HttpGet("image/{id}")]
        //public List<Images> GetImagesByAdID(int id)
        //{
        //    return ImagesServices.GetImage(id);
        //}


        [HttpPost]
        public ActionResult UpsertAd([FromBody]Ads ad)
        {
            if (AdService.UpsertAd(ad))
                return Ok();
            else
                return null;

        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }
}
