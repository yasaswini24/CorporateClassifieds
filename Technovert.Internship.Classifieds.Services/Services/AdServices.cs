using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Technovert.Internship.Classifieds.Services.Generic;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public class AdServices : IAdServices
    {
        public List<Ads> GetAllAds(int start, int end)
        {

            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {

                string sql = @"select ads.ID,ads.Name,ads.Type,ads.Price,ads.Views,ads.Category,ads.Description,ads.Expiry,ads.Created,ads.Modified,
                                created.*,modifiedBy.*,status.*,category.* from Ads ads
                                inner join Users created on created.ID = ads.CreatedBy
                                inner join Users modifiedBy on modifiedBy.ID = ads.ModifiedBy
                                inner join Status status on status.ID = ads.StatusID
                                inner join Category category on category.ID=ads.Category order by CURRENT_TIMESTAMP offset " + start + " rows fetch next " + (end - start) + " rows only";

                var adimages = con.Query("select  img.[Image],img.AdID from Images img group by img.AdID,img.[Image]", new[] { typeof(Images) }, objects1 => { Images image = objects1[0] as Images; return image; });

                var commentsCount = con.Query("select count(*) as comments,AdID from Comments group by AdID");

                var offersCount = con.Query("select count(*) as offers,AdID from Offers group by AdID");

                var ad = con.Query<Ads>(sql, new[] { typeof(Ads), typeof(User), typeof(User), typeof(Status), typeof(Category) }, objects =>
                {
                    Ads add = objects[0] as Ads;
                    add.CreatedByUser = objects[1] as User;

                    var adimage = adimages.FirstOrDefault(s => s.AdID == add.ID);
                    add.Images = new List<Images>();
                    add.Images.Add(adimage);


                    var AdCommentsCount = commentsCount.FirstOrDefault(s => s.AdID == add.ID);
                    add.CommentsCount = new int();
                    add.CommentsCount = AdCommentsCount == null ? 0 : AdCommentsCount.comments;

                    var OffersCount = offersCount.FirstOrDefault(s => s.AdID == add.ID);
                    add.OffersCount = new int();
                    add.OffersCount = OffersCount == null ? 0 : OffersCount.offers;

                    add.ModifiedByUser = objects[2] as User;
                    add.Status = objects[3] as Status;

                    add.CategoryDetails = objects[4] as Category;

                    return add;
                }, splitOn: "ID");

                List<Ads> ListOfAds = new List<Ads>(ad);

                return ListOfAds;
            }


        }

        public List<Ads> GetAdsByUserID(int id, string StatusCode, int start, int end)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                string sql;


                var Status = con.Query("select status.ID from Status status where status.Name='" + StatusCode+"'").FirstOrDefault();

                if (Status== null && StatusCode != "Active")
                {
                    sql = @"select ads.ID,ads.Name,ads.Type,ads.Price,ads.Views,ads.Category,ads.Description,ads.Expiry,ads.Created,ads.Modified,
                                created.*,modifiedBy.*,status.*,category.* from Ads ads
                                inner join Users created on created.ID = ads.CreatedBy
                                inner join Users modifiedBy on modifiedBy.ID = ads.ModifiedBy
                                inner join Status status on status.ID = ads.StatusID
                                inner join Category category on category.ID=ads.Category
                                where ads.StatusID<>1 and ads.CreatedBy=" + id + " order by CURRENT_TIMESTAMP offset " + start + " rows fetch next " + (end - start) + " rows only";
                }
                else
                {
                    sql = @"select ads.ID,ads.Name,ads.Type,ads.Price,ads.Views,ads.Category,ads.Description,ads.Expiry,ads.Created,ads.Modified,
                                created.*,modifiedBy.*,status.*,category.* from Ads ads
                                inner join Users created on created.ID = ads.CreatedBy
                                inner join Users modifiedBy on modifiedBy.ID = ads.ModifiedBy
                                inner join Status status on status.ID = ads.StatusID
                                inner join Category category on category.ID=ads.Category
                                where ads.StatusID=" + Status.ID + " and ads.CreatedBy=" + id + " order by CURRENT_TIMESTAMP offset " + start + " rows fetch next " + (end - start) + " rows only";
                }


                var adimages = con.Query("select  img.[Image],img.AdID from Images img", new[] { typeof(Images) }, objects1 => { Images image = objects1[0] as Images; return image; });

                var attributedetails = con.Query<Attributes>("select attributes.* from Attributes attributes inner join Category category on category.ID=attributes.CategoryID inner join Ads ads on ads.Category=category.ID where ads.ID=" + id);


                List<Ads> UserAds = (List<Ads>)con.Query<Ads>(sql, new[] { typeof(Ads), typeof(User), typeof(User), typeof(Status), typeof(Category) }, Adobjects =>
                {
                    Ads add = Adobjects[0] as Ads;

                    add.CreatedByUser = Adobjects[1] as User;

                    add.ModifiedByUser = Adobjects[2] as User;

                    add.Status = Adobjects[3] as Status;

                    add.CategoryDetails = Adobjects[4] as Category;

                    add.AttributesDetails = attributedetails as List<Attributes>;

                    var adimage = adimages.FirstOrDefault(s => s.AdID == add.ID);
                    add.Images = new List<Images>();
                    add.Images.Add(adimage);

                    return add;
                }, splitOn: "ID");



                return UserAds;
            }
        }

        public List<Ads> GetAdByID(int id)
        {

            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {

                string sql = @"select ads.ID,ads.Name,ads.Type,ads.Price,ads.Views,ads.Category,ads.Description,ads.Expiry,ads.Created,ads.Modified,
                                created.*,modifiedBy.*,status.*,category.* from Ads ads
                                inner join Users created on created.ID = ads.CreatedBy
                                inner join Users modifiedBy on modifiedBy.ID = ads.ModifiedBy
                                inner join Status status on status.ID = ads.StatusID
                                inner join Category category on category.ID=ads.Category
                                where ads.ID=" + id;

                var adimages = con.Query<Images>("select * from Images where AdID=" + id, new[] { typeof(Images) }, objects => { Images image = objects[0] as Images; return image; });


                var attributedetails = con.Query<Attributes>("select attributes.* from Attributes attributes inner join Category category on category.ID=attributes.CategoryID inner join Ads ads on ads.Category=category.ID where ads.ID=" + id);


                List<Ads> ad = (List<Ads>)con.Query<Ads>(sql, new[] { typeof(Ads), typeof(User), typeof(User), typeof(Status), typeof(Category) }, objects =>
                 {
                     Ads add = objects[0] as Ads;
                     add.CreatedByUser = objects[1] as User;
                     add.ModifiedByUser = objects[2] as User;
                     add.Status = objects[3] as Status;
                     add.CategoryDetails = objects[4] as Category;
                     add.AttributesDetails = attributedetails as List<Attributes>;
                     add.Images = adimages as List<Images>;
                     return add;
                 }, splitOn: "ID");


                return ad;
            }
        }

        public bool UpsertAd(Ads ad)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@ID", ad.ID);
            param.Add("@Name", ad.Name);
            param.Add("@Type", ad.Type);
            param.Add("@Category", ad.CategoryDetails.ID);
            param.Add("@Expiry", ad.Expiry);
            param.Add("@Price", ad.Price);
            param.Add("@Description", ad.Description);
            param.Add("@Views", ad.Views);
            param.Add("@StatusID", ad.Status.ID);
            param.Add("@Created", ad.ID == 0 ? DateTime.Now : ad.Created);
            param.Add("@Modified", DateTime.Now);
            param.Add("@CreatedBy", ad.CreatedByUser.ID);
            param.Add("@ModifiedBy", ad.ModifiedByUser.ID);
            param.Add("@RowCount", direction: ParameterDirection.ReturnValue);

            try
            {

                Procedure.ExecuteProcedure<int>("PostOrUpdateAd", param);
                int newAdID = param.Get<int>("@RowCount");
                ImagesServices imagesServices = new ImagesServices();
                var s = ad.Images.Count;
                var i = 0;
                while ((s > 0 && newAdID != 0))
                {
                    if (imagesServices.AddOrUpdateImage(newAdID, ad.Images[i]))
                    {
                        s -= 1;
                        i++;
                    }

                    else
                        return false;
                }

                return true;

            }
            catch (Exception ex)
            {

                return false;
            }

        }

        public bool AdDeletionByUser(int id)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@StatusID", 3);
                    Procedure.ExecuteProcedure<string>("PostOrUpdateAd", parameters);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public bool AdDeletionByAdmin(int id, int AdminID)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@StatusID", 4);
                    parameters.Add("@ModifiedBy", AdminID);
                    Procedure.ExecuteProcedure<string>("PostOrUpdateAd", parameters);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
    }
}
