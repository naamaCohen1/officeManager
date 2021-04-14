using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using officeManager.Controllers;



namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get([FromBody] LoginUser loginUser)
        {
            if (Validation.CheckValidationUserLogin(loginUser.username, loginUser.password))
            {
                if (!loginUser.CheckUserName())
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
            return Ok(loginUser);
        }
    }
}
