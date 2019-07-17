using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Technovert.Internship.Classifieds.Services.Generic;
using Technovert.Internship.Classifieds.Services.Models;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public class UserServices : IUserServices
    {

        public List<User> GetUsers(int id = 0)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@id", id);
            return Procedure.ExecuteProcedure<User>("GetUser", param).ToList();
        }


        public bool GetUserByName(string Name)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    string sql = "select count(*) from Credentials where UserName='" + Name + "'";
                    int row = (int)con.Query<int>(sql).First();
                    if (row != 0)
                        return true;
                    else
                        return false;
                }

                catch (Exception ex)
                {
                    return false;
                }
            }
        }


        public User ValidateUser(Credentials credentials)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    string sql = @"select users.ID from Users users inner join Credentials credentials on users.ID=credentials.UserID where credentials.UserName='" + credentials.Username + "' and credentials.Password='" + credentials.Password + "' and users.IsActive=1";
                    int UserID = con.Query<int>(sql).FirstOrDefault();
                    if (UserID != 0)
                        return GetUsers(UserID).First();
                    else
                        return null;
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }

        public bool UpsertUserCredentials(UserRegistration userInfo)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                try
                {
                    List<User> userDetails = new List<User>();
                    userDetails.Add(userInfo.user);
                    int UserID = AddOrUpdateUser(userDetails);
                    if (GetUsers(UserID).Count == 0)
                    {
                        Credentials credentials = new Credentials();
                        credentials.Username = userInfo.Username;
                        credentials.Password = userInfo.Password;

                        string sql = @"insert into Credentials values('" + credentials.Username + "','" + credentials.Password + "'," + UserID + ")";
                        con.Query(sql);

                    }
                    else
                    {
                        Credentials credentials = new Credentials();
                        credentials.Username = userInfo.Username;
                        credentials.Password = userInfo.Password;

                        string sql = @"update Credentials set UserName='" + credentials.Username + "',Password ='" + credentials.Password + "' where UserID=" + UserID;
                        con.Query(sql);
                    }
                    return true;

                }
                catch (Exception)
                {
                    return false;
                }

            }
        }

        public int AddOrUpdateUser(List<User> user)
        {
            try
            {
                for (int i = 0; i < user.Count; i++)
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ID", user[i].ID);
                    param.Add("@Name", user[i].Name);
                    param.Add("@Email", user[i].Email);
                    param.Add("@Phone", user[i].Phone);
                    param.Add("@Location", user[i].Location);
                    param.Add("@Created", user[i].ID == 0 ? DateTime.Now : user[i].Created);
                    param.Add("@Modified", DateTime.Now);
                    param.Add("@Picture", user[i].Picture);
                    if (user[i].ID == null)
                    {
                        user[i].IsActive = true;
                        user[i].Permission = false;
                    }
                    param.Add("@Role", user[i].Permission?"Moderator":"User");
                    param.Add("@IsActive", user[i].IsActive);
                    param.Add("@Permission", user[i].Permission);
                    param.Add("@RowCount", direction: ParameterDirection.ReturnValue);
                    Procedure.ExecuteProcedure<string>("AddOrUpdateUser", param);
                    int newUserID = param.Get<int>("@RowCount");
                    if (user[i].ID ==0)
                        return newUserID;
                }
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public bool DeleteUser(int UserID)
        {
            try
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@ID", UserID);
                param.Add("@Status", 0);
                Procedure.ExecuteProcedure<string>("AddOrUpdateUser", param);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
