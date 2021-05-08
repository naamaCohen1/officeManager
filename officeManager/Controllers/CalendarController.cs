using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using officeManager.Controllers.Entities;
using System.Data.SqlClient;

namespace officeManager.Controllers
{
    

    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] Calendar calendar)
        {
            //if (Validation.CheckValidationUserLogin(loginUser.username, loginUser.password))
            //{
            //    List<bool> res = loginUser.CheckUserName();
            //    if (res[0] == true && res[1] == false)
            //    {
            //        return new NotFoundObjectResult("user name is incorrent");
            //    }
            //    if (res[0] == false && res[1] == false)
            //    {
            //        return new NotFoundObjectResult("user password is incorrent");
            //    }
            //    return new OkResult();
            //}
            //else
            //{
            //    return new BadRequestResult();
            //}
            return new BadRequestResult();
        }
        [HttpGet]
        public async Task<ActionResult<string>> Get([FromBody] Date date_la)
        {
            DateTime date = DateTime.Parse(date_la.date);
            string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";
            string sql = string.Format("select * from tblCalender WHERE Date = '{0}'", date);
            string CommingTotheOffice = null;
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    CommingTotheOffice= dataReader["EmployeesArriving"].ToString();
                
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (CommingTotheOffice == null)
                    return NotFound();
                return new OkResult();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}
