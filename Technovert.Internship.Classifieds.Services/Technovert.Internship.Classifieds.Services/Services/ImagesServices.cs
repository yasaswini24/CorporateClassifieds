using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Technovert.Internship.Classifieds.Services.Generic;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public class ImagesServices : IImagesServices
    {
        public List<Images> GetImage(int id = 0)
        {

            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@id", id);

                return (List<Images>)Procedure.ExecuteProcedure<Images>("GetImage", param);
            }

        }

        public bool AddOrUpdateImage(int AdID, Images image)
        {
            try
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@ID", image.ID == null ? 0 : image.ID);
                param.Add("@AdID", image.AdID == 0 ? AdID : image.AdID);
                param.Add("@Image", image.Image);
                Procedure.ExecuteProcedure<string>("AddOrUpdateImage", param);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool DeleteImage(int id)
        {
            try
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@ID", id);
                param.Add("@Status", 0);
                Procedure.ExecuteProcedure<string>("AddOrUpdateImage", param);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
