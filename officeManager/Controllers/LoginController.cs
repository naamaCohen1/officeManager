using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        //[ResponseType(typeof(User))]
        public async Task<ActionResult<string>> Post([FromBody] LoginUser loginUser)
        {
            if (Validation.CheckValidationUserLogin(loginUser.username, loginUser.password))
            {
                List<bool> res = loginUser.CheckUserName();
                if (res[0] == true && res[1] == false)
                {
                    return new NotFoundObjectResult("user name is incorrent"); 
                }
                if (res[0] == false && res[1] == false)
                {
                    return new NotFoundObjectResult("user password is incorrent");
                }
                return new OkResult();
            }
            else
            {
                return new BadRequestResult();
            }
            //return new OkResult();
        }

        //[HttpPost]
        //public ActionResult Post([FromBody] LoginUser loginUser)
        //{
        //    if (Validation.CheckValidationUserLogin(loginUser.username, loginUser.password))
        //    {
        //        if (!loginUser.AddUser())
        //        {
        //            return NotFound();
        //        }
        //    }
        //    else
        //    {
        //        return BadRequest();
        //    }
        //    return Ok(loginUser);
        //}
    }
}
