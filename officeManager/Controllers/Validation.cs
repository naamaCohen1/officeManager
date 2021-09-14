using System.Linq;

namespace officeManager.Controllers
{
    public class Validation
    {
        /// <summary>
        /// This method checks the email and password format validation
        /// </summary>
        /// <param name="username"> user's email </param>
        /// <param name="password"> user's id </param>
        /// <returns> True if email and password are in a valid format </returns>
        public static bool CheckValidationUserLogin(string username, string password)
        {
            if (string.IsNullOrEmpty(password))
                return false;
            bool isValidPassword = password.All(c => char.IsDigit(c));
            if (string.IsNullOrEmpty(username))
                return false;
            var addr = new System.Net.Mail.MailAddress(username);
            bool isValidUsername = addr.Address == username;

            return isValidPassword && isValidUsername;
        }
    }
}