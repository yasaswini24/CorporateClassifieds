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
    public class CategoryServices : ICategoryServices
    {

        public List<Category> GetAllCategories()
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                string sql = "select * from Category where IsActive=1";
                var categories = (List<Category>)con.Query<Category>(sql);
                return categories;
            }
        }

        public Category GetCategoryByID(int id)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    string sql = "select * from Category category where category.ID=" + id + "and IsActive=1";
                    AttributeServices attributeServices = new AttributeServices();
                    List<Attributes> Attributes = attributeServices.GetAttributesByCategoryID(id);
                    Category CategoryDetails = (Category)con.Query<Category>(sql, new[] { typeof(Category) }, categoryObjects =>
                         {
                             Category categoryDetails = categoryObjects[0] as Category;
                             categoryDetails.Attributes = new List<Attributes>();
                             categoryDetails.Attributes = Attributes as List<Attributes>;
                             return categoryDetails;
                         }).First();
                    return CategoryDetails;
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }




        public bool DeleteCategoryByID(int CategoryID)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    string sql = "update Category set IsActive=0 where ID=" + CategoryID;
                    con.Query(sql);
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        public bool UpsertCategory(Category category)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    DynamicParameters dynamicParameters = new DynamicParameters();
                    dynamicParameters.Add("@ID", category.ID);
                    dynamicParameters.Add("@Name", category.Name);
                    dynamicParameters.Add("@Icon", category.Icon);
                    //dynamicParameters.Add("@Created", category.ID == 0 ? DateTime.Now : category.Created);
                    //dynamicParameters.Add("@Modified", DateTime.Now);
                    dynamicParameters.Add("@CreatedBy", category.CreatedBy);
                    dynamicParameters.Add("@ModifiedBy", category.ModifiedBy);
                    dynamicParameters.Add("@Description", category.Description);
                    dynamicParameters.Add("@RowCount", direction: ParameterDirection.ReturnValue);

                    Procedure.ExecuteProcedure<int>("UpsertCategory", dynamicParameters);
                    int newCategoryID = dynamicParameters.Get<int>("@RowCount");
                    int CategoryID;
                    if (category.ID != 0)
                        CategoryID = category.ID;
                    else
                        CategoryID = newCategoryID;
                    var s = category.Attributes.Count;
                    var i = 0;
                    AttributeServices attributeServices = new AttributeServices();
                    attributeServices.DeleteAttributes(CategoryID);
                    while ((s > 0 && CategoryID != 0))
                    {
                        if (attributeServices.UpsertAttributes(category.Attributes[i], CategoryID))
                        {
                            s -= 1;
                            i++;
                        }

                        else
                            return false;
                    }

                }
                catch (Exception ex)
                {

                }
                return true;
            }
        }
    }
}
