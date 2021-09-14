using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        /// <summary>
        /// This methos checks the username and password are correct
        /// </summary>
        /// <param name="loginUser"> Login user to check </param>
        /// <returns>User permission <see cref="IActionResult"/></returns>
        /// <seealso cref="Validation.CheckValidationUserLogin(string, string)"/>
        /// <seealso cref="LoginUser.CheckUser"/>
        /// <seealso cref="LoginUser.GetUserPermissionandOrgID"/>
        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] LoginUser loginUser)
        {
            if (Validation.CheckValidationUserLogin(loginUser.Username, loginUser.Password))
            {
                List<bool> validationResults = loginUser.CheckUser();
                if (validationResults[0] == false || validationResults[1] == false)
                {
                    return new NotFoundObjectResult("Invalid username or password");
                }
                string userRole = loginUser.GetUserPermissionandOrgID();
                return new OkObjectResult(userRole);
            }
            else
            {
                return new BadRequestResult();
            }
        }
    }
}