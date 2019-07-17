using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Technovert.Internship.Classifieds.Services.Generic;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public class UserServices:IUserServices
    {
        
        public IEnumerable<User> GetUsers(int id=0)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@id", id);
            return Procedure.ExecuteProcedure<User>("GetUser", param);
        }

        public void AddOrUpdateUser(User user)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@ID",user.ID);
            param.Add("@Name",user.Name);
            param.Add("@Email",user.Email);
            param.Add("@Phone",user.Phone);
            param.Add("@Location",user.Location);
            param.Add("@Role",user.Role);
            param.Add("@Created",user.ID==0 ? DateTime.Now : user.Created);
            param.Add("@Modified",user.Modified);
            param.Add("@Picture", user.Picture);
            param.Add("@", 1);
            Procedure.ExecuteProcedure<string>("AddOrUpdateUser", param);
        }

        public void DeleteUser(int id)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@ID", id);
            param.Add("@Status",0);
            Procedure.ExecuteProcedure<string>("AddOrUpdateUser", param);
        }
    }
}
