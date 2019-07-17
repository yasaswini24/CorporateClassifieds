using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Technovert.Internship.Classifieds.Services.Generic;
using Technovert.Internship.Classifieds.Services.IServices;

namespace Technovert.Internship.Classifieds.Services.Services
{
    public class ChatServices :IChatServices
    {
        public List<Chat> GetChatByOfferID(int OfferID)
        {
            using (IDbConnection con = new SqlConnection(@"Server=intdev-pc;Initial Catalog=classifieds;Integrated Security=True"))
            {
                var chats = (List<Chat>)con.Query("select chat.*,sender.*,receiver.* from Chat chat inner join Users sender on sender.ID=chat.Sender inner join Users receiver on receiver.ID=chat.Receiver where chat.OfferID="+OfferID,
                    new[] { typeof(Chat), typeof(User), typeof(User) }, chatObject =>
                    {
                        Chat chat = chatObject[0] as Chat;
                        chat.SenderDetails = chatObject[1] as User;
                        chat.ReceiverDetails = chatObject[2] as User;
                        return chat;
                    }, splitOn: "ID");

                return chats;
            }
        }

        public bool PostMessage(Chat chat)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@OfferID", chat.OfferID);
            param.Add("@Message", chat.Message);
            param.Add("@Sender", chat.SenderDetails.ID);
            param.Add("@Receiver", chat.ReceiverDetails.ID);
            try
            {
                Procedure.ExecuteProcedure<int>("PostMessage", param);
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}
