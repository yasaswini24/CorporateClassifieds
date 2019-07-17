using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public interface IAdServices
    {
        List<Ads> GetAllAds(int start,int end);

        bool UpsertAd(Ads ad);

        List<Ads> GetAdByID(int id);

        List<Ads> GetAdsByUserID(int id,string StatusCode,int start,int end);

        bool AdDeletionByUser(int id);

        bool AdDeletionByAdmin(int id, int AdminID);
    }
}