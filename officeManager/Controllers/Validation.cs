using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace officeManager.Controllers
{
    public class Validation
    {
        static public bool CheckValidationUserLogin(string username, string password)
        {

            bool isValidPassword = password.All(c=>char.IsDigit(c));
            bool isValidUserName = username.All(c => char.IsWhiteSpace(c) || char.IsLetter(c));

            return isValidPassword && isValidUserName;

        }
      
    }
}
