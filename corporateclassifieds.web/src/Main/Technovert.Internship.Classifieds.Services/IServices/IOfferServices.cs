using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Technovert.Internship.Classifieds.Services.IServices
{
    public interface IOfferServices
    {
        List<Offers> GetAllOffersByUserID(int UserID);

    }
}
