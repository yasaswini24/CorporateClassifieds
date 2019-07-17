using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Technovert.Internship.Classifieds.Services.Models;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public interface IAdServices
    {
        List<Ads> GetAllAds(Filter FilterList);

        bool UpsertAd(Ads ad);

        List<Ads> GetAdByID(int id);

        List<Ads> GetAdsByUserID(int id, string StatusCode, int start, int end);

        bool AdDeletionByUser(int id);

        bool AdDeletionByAdmin(int id, int AdminID);

        bool ViewCount(int AdID);

        List<Ads> GetAllReportAds();
    }
}