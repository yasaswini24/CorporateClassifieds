using System.Collections.Generic;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public interface IImagesServices
    {
        bool AddOrUpdateImage(int AdID,Images image);
        bool DeleteImage(int id);
        List<Images> GetImage(int id = 0);
    }
}