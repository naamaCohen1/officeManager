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
        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] LoginUser loginUser)
        {
            if (Validation.CheckValidationUserLogin(loginUser.Username, loginUser.Password))
            {
                List<bool> res = loginUser.CheckUserName();
                if (res[0] == false || res[1] == false)
                {
                    return new NotFoundObjectResult("Invalid username or password"); 
                }
                string userRole = loginUser.GetUserPermission();
                return new OkObjectResult(userRole);
            }
            else
            {
                return new BadRequestResult();
            }
            //return new OkResult();
            //return ObjectResult(loginUser);
        }

    }
}
