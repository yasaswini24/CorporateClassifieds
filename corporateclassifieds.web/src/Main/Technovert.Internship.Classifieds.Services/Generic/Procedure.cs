using Dapper;
using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Technovert.Internship.Classifieds.Services.Generic
{
    public static class Procedure
    {
        private static string connection = @"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True";

        public static  IEnumerable<T> ExecuteProcedure<T>(string name, DynamicParameters parameters = null)
        {
            using (SqlConnection sqlCon = new SqlConnection(connection))
            {
                sqlCon.Open();
                return sqlCon.Query<T>(name, parameters, commandType: CommandType.StoredProcedure);
                
            }
        }

       
    }
}
