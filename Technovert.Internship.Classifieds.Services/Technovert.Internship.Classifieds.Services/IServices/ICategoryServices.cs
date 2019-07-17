using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public interface ICategoryServices
    {
        //int GetCategoryID(string CategoryName);

        List<Category> GetAllCategories();

        Category GetCategoryByID(int id);

        bool UpsertCategory(Category category);

        bool DeleteCategoryByID(int CategoryID);
    }
}
