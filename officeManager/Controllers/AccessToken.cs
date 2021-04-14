using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Content.OAuth;      
using Newtonsoft.Json;
namespace officeManager.Controllers
{

    public class AccessToken
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string Expiration { get; set; }
        public AccessToken()
        {
            //_tokens = GetOauthTokens(null, _clientId);
        }
    }
}
