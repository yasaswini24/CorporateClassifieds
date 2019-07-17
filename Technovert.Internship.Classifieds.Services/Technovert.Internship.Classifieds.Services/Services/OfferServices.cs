using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Technovert.Internship.Classifieds.Services.Generic;
using Technovert.Internship.Classifieds.Services.IServices;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public class OfferServices : IOfferServices
    {

        List<Offers> IOfferServices.GetAllOffersByUserID(int UserID)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                string sql;

                sql = @"select offers.*,ads.ID,ads.Name,offerBy.* from Offers offers inner join Ads ads  on offers.AdID=ads.ID
                                inner join Users offerBy on offerBy.ID=offers.OfferBy
                                where ads.CreatedBy=" + UserID;

                

                var adimages = con.Query("select  img.[Image],img.AdID from Images img where img.AdID in(select ads.ID from Ads ads where ads.CreatedBy="+UserID+")", new[] { typeof(Images) }, objects1 => { Images image = objects1[0] as Images; return image; });

                var result = con.Query(sql);

                List<Offers> Offers = (List<Offers>)con.Query<Offers>(sql, new[] {  typeof(Offers), typeof(Ads),typeof(User) }, Offerobjects =>
                {
                    Offers Offer=Offerobjects[0] as Offers;

                    Offer.Ad = Offerobjects[1] as Ads;

                    Offer.OfferByDetails = Offerobjects[2] as User;

                    //ChatServices chatServices = new ChatServices();
                    //Offer.Chat=chatServices.GetChatByOfferID(Offer.ID);

                    var adimage = adimages.FirstOrDefault(s => s.AdID == Offer.Ad.ID);
                    Offer.Ad.Images = new List<Images>();
                    Offer.Ad.Images.Add(adimage);

                    return Offer;
                }, splitOn: "ID");



                return Offers;
            }
        }

        public bool MakeAnOffer(Offers offer)
        {
            try
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@AdId", offer.AdID);
                param.Add("@OfferAmount", offer.OfferAmount);
                param.Add("@OfferDesc", offer.OfferDesc);
                param.Add("@OfferBy", offer.OfferByDetails.ID);
                Procedure.ExecuteProcedure<int>("MakeAnOffer", param);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
