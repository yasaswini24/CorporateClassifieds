using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public class AttributeServices : IAttributeServices
    {
        public List<Attributes> GetAttributes(int CategoryID)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                string sql = "select Attributes.* from Attributes attributes where attributes.CategoryID=" + CategoryID;
                return (List<Attributes>)con.Query(sql,new[]{typeof(Attributes) },objects =>{ Attributes attributes = objects[0] as Attributes; return attributes; });
            }
        }

    }
}
