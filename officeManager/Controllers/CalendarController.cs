using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using officeManager.Controllers.Entities;
using System.Data.SqlClient;
using System.Globalization;

namespace officeManager.Controllers
{
    

    [Route("api/[controller]")]
    [Route("calendar")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";

        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] CalendarUser calendarUser)
        {
            
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", calendarUser.date);
            string capacity = null;
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    capacity = dataReader["SittingCapacity"].ToString();
                }
                int intCapacity = int.Parse(capacity);
                if (intCapacity == 0)
                    return new NotFoundObjectResult("there is no place in this day,please register to waiting list");
                else
                {
                    dataReader.Close();
                    intCapacity--;
                    sql = string.Format("UPDATE tlbCalendar SET SittingCapacity = {0} where date = '{1}'",intCapacity.ToString(), calendarUser.date);
                    command = new SqlCommand(sql, connection);
                    dataReader = command.ExecuteReader();
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();
                return new OkObjectResult(capacity.Trim());
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
            return new BadRequestResult();
        }
        //GET https://localhost:44375/api/calendar
        [HttpGet]
        public async Task<ActionResult<string>> Get([FromBody] DateClass dateClass)
        {
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", dateClass.date);
            string CommingTotheOffice = null;
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    CommingTotheOffice = dataReader["EmployeesArriving"].ToString();
                }
                              
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (CommingTotheOffice == null)
                    return NotFound();
                 return new OkObjectResult(CommingTotheOffice.Trim());
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}
