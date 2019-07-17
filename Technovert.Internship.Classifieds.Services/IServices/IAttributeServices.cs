using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public interface IAttributeServices
    {
        List<Attributes> GetAttributes(int CategoryID);
    }
}
