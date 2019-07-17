using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Technovert.Internship.Classifieds.Services.Services;

namespace Technovert.Internship.Classifieds.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public ICategoryServices categoryServices;
        public IAttributeServices attributeServices;



        public CategoryController(ICategoryServices CategoryServices,IAttributeServices AttributeServices)
        {
            categoryServices = CategoryServices;
            attributeServices = AttributeServices;
        }


       
        [HttpGet]
        public List<Category> GetAllCategories()
        {
            return categoryServices.GetAllCategories();
        }

       


        [HttpGet("{id}")]
        public ActionResult<Category> GetCategoryByID(int id)
        {
            Category category = categoryServices.GetCategoryByID(id);
            if (category != null)
                return category;
            else
                return BadRequest();
        }



        [HttpPost]
        public void AddOrUpdateCategory([FromBody] Category category)
        {
            
        }

       

        // DELETE: api/ApiWithActions/5
        [Route("DeleteCategory/{id}")]
        public ActionResult Delete(int id)
        {
            if (categoryServices.DeleteCategoryByID(id))
                return Ok();
            else
                return BadRequest();
        }
    }
}
