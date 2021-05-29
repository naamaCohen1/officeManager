using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using officeManager.Controllers.Entities;
using System.Data.SqlClient;
using Newtonsoft.Json;

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
            string ArraivingName = null;
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    ArraivingName = dataReader["EmployeesArriving"].ToString();
                    capacity = dataReader["SittingCapacity"].ToString();
                }
                dataReader.Close();
                int intCapacity = int.Parse(capacity);
                if (intCapacity == 0)
                    return new NotFoundObjectResult("there is no place in this day,please register to waiting list");
                else
                {
                    string name = calendarUser.GetEmployeeName(connection);
                    if(name == null)
                        return new NotFoundObjectResult("there is no employee with this id");
                    intCapacity--;
                    calendarUser.UpdateCapacity(connection, intCapacity);
                    ArraivingName = ArraivingName.Trim();
                    ArraivingName+=string.Format(", {0}", name);
                    calendarUser.UpdateArrivingName(connection, ArraivingName);
                }
                string json = JsonConvert.SerializeObject(ArraivingName);
                command.Dispose();
                connection.Close();
                return new OkObjectResult(json);
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }

        //GET https://localhost:44375/api/calendar/mm.dd.yyyy
        [HttpGet("{date}")]
        public ActionResult<string> Get(string date)
        {
            date.Replace(".", "/");
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", date);
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
