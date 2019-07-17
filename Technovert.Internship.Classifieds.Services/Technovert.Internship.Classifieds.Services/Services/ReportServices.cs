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
    public class ReportServices : IReportServices
    {
        public List<Reports> GetAllReportsByAdID(int AdID)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    string sql = "select report.ID,report.AdID,report.ReportDescription,report.ReportCategory,report.Created,report.Modified,reportedBy.* from Reports report inner join Users reportedBy on report.ReportedBy=reportedBy.ID where report.AdID=" + AdID;
                    List<Reports> Reports = (List<Reports>)con.Query(sql, new[] { typeof(Reports),typeof(User) }, reportsObject => 
                    {
                        Reports reports = reportsObject[0] as Reports;
                        reports.ReportedBy = reportsObject[1] as User;
                        return reports;
                    },splitOn: "ID");

                    return Reports;
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }

        public bool Report(Reports report)
        {

            try
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@AdID", report.AdID);
                param.Add("@ReportDescription", report.ReportDescription);
                param.Add("@ReportedBy", report.ReportedBy.ID);
                //param.Add("@ModifiedBy", report.ModifiedBy);
                //param.Add("@Created", report.Created);
                //param.Add("@Modified", report.Modified);
                param.Add("@ReportCategory", report.ReportCategory);
                Procedure.ExecuteProcedure<int>("Report", param);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
