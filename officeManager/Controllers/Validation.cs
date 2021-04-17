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
            if (string.IsNullOrEmpty(password))
                return false;
            bool isValidPassword = password.All(c=>char.IsDigit(c));
            if (string.IsNullOrEmpty(username))
                return false;
            bool isValidUserName = username.All(c => char.IsWhiteSpace(c) || char.IsLetter(c));

            return isValidPassword && isValidUserName;

        }
      
    }
}
