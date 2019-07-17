using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public class CategoryServices : ICategoryServices
    {



        public List<Category> GetAllCategories()
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                string sql = "select * from Category";
                var categories = (List<Category>)con.Query<Category>(sql);
                return categories;
            }
        }

        public Category GetCategoryByID(int id)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                string sql = "select * from Category category where category.ID=" + id;
                string sql2 = "select * from Attributes attributes where attributes.CategoryID=" + id;
                List<Attributes> Attributes = (List<Attributes>)con.Query<Attributes>(sql2, new[] { typeof(Attributes) }, attributesObject => { Attributes attributes = attributesObject[0] as Attributes; return attributes; });
                Category CategoryDetails = (Category)con.Query<Category>(sql, new[] { typeof(Category) }, categoryObjects =>
                     {
                         Category categoryDetails = categoryObjects[0] as Category;
                         categoryDetails.Attributes = new List<Attributes>();
                         categoryDetails.Attributes = Attributes as List<Attributes>;
                         return categoryDetails;
                     }).First();
                return CategoryDetails;
            }
        }

    }
}
