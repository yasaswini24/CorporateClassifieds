using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Technovert.Internship.Classifieds.Services.IServices
{
    public interface IReportServices
    {
        List<Reports> GetAllReportsByAdID(int AdID);

        bool Report(Reports report);
    }
}
