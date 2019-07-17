using System.Collections.Generic;
using Technovert.Internship.Classifieds.Services.Models;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public interface IUserServices
    {
       
        List<User> GetUsers(int id = 0);

        bool GetUserByName(string Name);

        int AddOrUpdateUser(List<User> user);

        bool DeleteUser(int UserID);

        User ValidateUser(Credentials credentials);

        bool UpsertUserCredentials(UserRegistration userInfo);
    }
}