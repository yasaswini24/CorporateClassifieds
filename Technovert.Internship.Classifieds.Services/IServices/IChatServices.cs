using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Technovert.Internship.Classifieds.Services.IServices
{
    public interface IChatServices
    {
        List<Chat> GetChatByOfferID(int OfferID);

        bool PostMessage(Chat chat);

    }
}
