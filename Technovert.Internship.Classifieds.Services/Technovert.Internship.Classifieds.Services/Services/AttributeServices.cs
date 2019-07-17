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
    public class AttributeServices : IAttributeServices
    {
        public List<Attributes> GetAttributesByCategoryID(int CategoryID)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                string sql = "select Attributes.* from Attributes attributes where attributes.CategoryID=" + CategoryID + " and IsActive=1";
                return (List<Attributes>)con.Query(sql, new[] { typeof(Attributes) }, objects => { Attributes attributes = objects[0] as Attributes; return attributes; });
            }
        }

        public bool UpsertAttributes(Attributes attribute, int CategoryID)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    DynamicParameters dynamicParameters = new DynamicParameters();

                    dynamicParameters.Add("@ID", attribute.ID);
                    dynamicParameters.Add("@CategoryID", CategoryID);
                    dynamicParameters.Add("@Name", attribute.Name);
                    dynamicParameters.Add("@Type", attribute.Type);
                    dynamicParameters.Add("@Value", attribute.Value);
                    dynamicParameters.Add("@Mandatory", attribute.Mandatory != "false" ? 1 : 0);
                    dynamicParameters.Add("@Description", attribute.Description);
                    dynamicParameters.Add("@CreatedBy", attribute.CreatedBy);
                    dynamicParameters.Add("@ModifiedBy", attribute.ModifiedBy);
                    dynamicParameters.Add("@Created", attribute.ID == 0 ? DateTime.Now : attribute.Created);
                    dynamicParameters.Add("@Modified", DateTime.Now);



                    Procedure.ExecuteProcedure<int>("UpsertAttribute", dynamicParameters);
                    return true;

                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
        public bool DeleteAttributes(int CategoryID)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    string sql = "update Attributes set IsActive=0 where CategoryID=" + CategoryID;
                    con.Query<int>(sql);
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }

            }
        }
    }
}
