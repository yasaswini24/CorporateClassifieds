using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Technovert.Internship.Classifieds.Services.Generic;
using Technovert.Internship.Classifieds.Services.Models;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public class AdServices : IAdServices
    {
        //public List<Ads> GetAllAds(int start, int end)
        //{

        //    using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
        //    {

        //        string sql = @"select ads.ID,ads.Name,ads.Type,ads.Price,ads.Views,ads.Category,ads.Description,ads.Expiry,ads.Created,ads.Modified,
        //                        created.*,modifiedBy.*,status.*,category.* from Ads ads
        //                        inner join Users created on created.ID = ads.CreatedBy
        //                        inner join Users modifiedBy on modifiedBy.ID = ads.ModifiedBy
        //                        inner join Status status on status.ID = ads.StatusID
        //                        inner join Category category on category.ID=ads.Category where ads.StatusID =1 order by CURRENT_TIMESTAMP offset " + start + " rows fetch next " + (end - start) + " rows only ";

        //        var adimages = con.Query("select  img.[Image],img.AdID from Images img group by img.AdID,img.[Image]", new[] { typeof(Images) }, objects1 => { Images image = objects1[0] as Images; return image; });

        //        var commentsCount = con.Query("select count(*) as comments,AdID from Comments group by AdID");

        //        var offersCount = con.Query("select count(*) as offers,AdID from Offers group by AdID");

        //        var ad = con.Query<Ads>(sql, new[] { typeof(Ads), typeof(User), typeof(User), typeof(Status), typeof(Category) }, objects =>
        //        {
        //            Ads add = objects[0] as Ads;
        //            add.CreatedByUser = objects[1] as User;

        //            var adimage = adimages.FirstOrDefault(s => s.AdID == add.ID);
        //            add.Images = new List<Images>();
        //            add.Images.Add(adimage);


        //            var AdCommentsCount = commentsCount.FirstOrDefault(s => s.AdID == add.ID);
        //            add.CommentsCount = new int();
        //            add.CommentsCount = AdCommentsCount == null ? 0 : AdCommentsCount.comments;

        //            var OffersCount = offersCount.FirstOrDefault(s => s.AdID == add.ID);
        //            add.OffersCount = new int();
        //            add.OffersCount = OffersCount == null ? 0 : OffersCount.offers;

        //            add.ModifiedByUser = objects[2] as User;
        //            add.Status = objects[3] as Status;

        //            add.CategoryDetails = objects[4] as Category;

        //            return add;
        //        }, splitOn: "ID");

        //        List<Ads> ListOfAds = new List<Ads>(ad);

        //        return ListOfAds;
        //    }


        //}


        public List<Ads> GetAllAds(Filter FilterList)
        {
            int end = 0;
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {

                var start = FilterList.start;
                end = start + 10;
                string sql = String.Format(@"select ads.ID,ads.Name,ads.Type,ads.Price,ads.Views,ads.Category,ads.Description,ads.Expiry,ads.Created,ads.Modified,
                                created.*,modifiedBy.*,status.*,category.* from Ads ads
                                inner join Users created on created.ID = ads.CreatedBy
                                inner join Users modifiedBy on modifiedBy.ID = ads.ModifiedBy
                                inner join Status status on status.ID = ads.StatusID
                                inner join Category category on category.ID=ads.Category 
                                {0} and ads.StatusID=1
                                {1}
                                order by CURRENT_TIMESTAMP offset " + start + " rows fetch next " + (end - start) + " rows only", WhereFunc(FilterList), ImplementSearch(FilterList));

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
        private string WhereFunc(Filter FilterList)
        {
            StringBuilder res = new StringBuilder("where ");
            if (FilterList.AdType.Length != 0)
            {
                if (FilterList.AdType.Length > 1)
                {
                    res.Append("ads.Type in (");
                    for (int i = 0; i < FilterList.AdType.Length; i++)
                    {
                        res.Append(String.Format("'{0}'", FilterList.AdType[i]));
                        if (i + 1 < FilterList.AdType.Length)
                        {
                            res.Append(String.Format(", "));
                        }
                    }
                    res.Append(")");
                }
                else
                {
                    res.Append(String.Format("ads.Type = '{0}' ", FilterList.AdType[0]));
                }
            }
            if (FilterList.AdType.Length != 0 && FilterList.Category.Length != 0 || FilterList.AdType.Length != 0 && FilterList.Location.Length != 0)
            {
                res.Append("and  ");
            }

            if (FilterList.Category.Length != 0)
            {
                if (FilterList.Category.Length > 1)
                {
                    res.Append("Category.Name in (");
                    for (int i = 0; i < FilterList.Category.Length; i++)
                    {
                        res.Append(String.Format("'{0}'", FilterList.Category[i]));
                        if (i + 1 < FilterList.Category.Length)
                        {
                            res.Append(String.Format(", "));
                        }
                    }
                    res.Append(")");
                }
                else
                {
                    res.Append(String.Format("Category.Name = '{0}' ", FilterList.Category[0]));
                }
            }
            if (FilterList.Category.Length != 0 && FilterList.Location.Length != 0)
            {
                res.Append("and  ");
            }
            if (FilterList.Location.Length != 0)
            {
                if (FilterList.Location.Length > 1)
                {
                    res.Append("created.Location in (");
                    for (int i = 0; i < FilterList.Location.Length; i++)
                    {
                        res.Append(String.Format("'{0}'", FilterList.Location[i]));
                        if (i + 1 < FilterList.Location.Length)
                        {
                            res.Append(String.Format(", "));
                        }
                    }
                    res.Append(")");
                }
                else
                {
                    res.Append(String.Format("created.Location = '{0}' ", FilterList.Location[0]));
                }
            }

            string result = res.ToString();
            if (result == "where ")
            {
                result = "";
            }
            return result;
        }

        private string ImplementSearch(Filter FilterList)
        {
            StringBuilder res = new StringBuilder("");

            if (FilterList.Search is null || FilterList.Search.Equals(""))
            {
                string empty = "";
                return empty;
            }
            else if (FilterList.AdType.Length != 0 || FilterList.Category.Length != 0 || FilterList.Location.Length != 0)
            {
                res.Append(String.Format(" and ads.Name like '{0}%'", FilterList.Search));
            }
            else
            {
                res.Append(String.Format("where ads.Name like '{0}%'", FilterList.Search));
            }

            string result = res.ToString();
            return result;
        }



        public List<Ads> GetAdsByUserID(int id, string StatusCode, int start, int end)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                string sql;


                var Status = con.Query("select status.ID from Status status where status.Name='" + StatusCode + "'").FirstOrDefault();

                if (Status == null && StatusCode != "Active")
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

                int offersCount = con.Query<int>("select count(*) from Offers where AdID=" + id).First();

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
                     add.OffersCount = offersCount;
                     return add;
                 }, splitOn: "ID");


                return ad;
            }
        }

        public bool ViewCount(int AdID)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    string sql = "update Ads set Views=Views+1 where ID=" + AdID;
                    con.Query(sql);
                    return true;
                }
                catch(Exception)
                {
                    return false;
                }
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

        public bool AdDeletionByAdmin(int id, int UserID)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    string sql = "select [user].permission from Users [user] where [user].ID=" + UserID;
                    int Access = con.Query<int>(sql).First();
                    if (Access != 0)
                    {
                        //string sql1 = "update Ads set StatusID=4,ModifiedBy=" + UserID + " where ID=" + id;
                        //con.Query(sql1);
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public List<Ads> GetAllReportAds()
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {

                    string sql1 = @"select distinct ads.ID,ads.Name,ads.Type,ads.Category,ads.Description,ads.Created,
                                created.*,category.*from Ads ads
                                inner join Users created on created.ID = ads.CreatedBy
                                inner join Category category on category.ID=ads.Category 
                                inner join Reports reports on reports.AdID=ads.ID where ads.StatusID=1";


                    var adimages = con.Query("select  img.[Image],img.AdID from Images img group by img.AdID,img.[Image]", new[] { typeof(Images) }, objects1 => { Images image = objects1[0] as Images; return image; });

                    ReportServices reportServices = new ReportServices();
                    List<Ads> ReportedAds = (List<Ads>)con.Query<Ads>(sql1, new[] { typeof(Ads), typeof(User), typeof(Category) }, ReportedAdobject =>
                     {
                         Ads ad = ReportedAdobject[0] as Ads;

                         ad.CreatedByUser = ReportedAdobject[1] as User;

                         ad.CategoryDetails = ReportedAdobject[2] as Category;


                         ad.ReportedAds = reportServices.GetAllReportsByAdID(ad.ID);

                         var adimage = adimages.FirstOrDefault(s => s.AdID == ad.ID);
                         ad.Images = new List<Images>();
                         if(adimage!=null)
                            ad.Images.Add(adimage);


                         return ad;

                     }, splitOn: "ID");

                    return ReportedAds;

                }
                catch (Exception)
                {
                    return null;
                }
            }
        }
    }
}
