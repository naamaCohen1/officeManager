using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Data.SqlClient;
using Newtonsoft.Json;

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
                List<bool> res = loginUser.CheckUser();
                if (res[0] == false || res[1] == false)
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