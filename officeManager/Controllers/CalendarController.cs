using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using officeManager.Controllers.Entities;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace officeManager.Controllers
{


    [Route("api/[controller]")]
    [Route("calendar")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";


        //POST https://localhost:5001/api/calendar
        //{"date": "07/21/2021",
        //"id": "204049316"
        //}
        [HttpPost]
    public async Task<ActionResult<string>> Post([FromBody] CalendarUser calendarUser)
        {

            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", calendarUser.date);
            string capacity = null;
            string ArraivingID = null;
            List<string> sendingEmployees = new List<string>();
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    ArraivingID = dataReader["EmployeesArriving"].ToString();
                    capacity = dataReader["SittingCapacity"].ToString();
                }
                dataReader.Close();
                ArraivingID = ArraivingID.Trim();
                string[] employees = ArraivingID.Split(';');
                foreach (string employee in employees)
                {
                    if (employee.Equals(""))
                        continue;
                    CalendarUser user = new CalendarUser();
                    user.id = employee;
                    string name = user.GetEmployeeName(connection);
                    sendingEmployees.Add(name);
                }
                int intCapacity = int.Parse(capacity);
                if (intCapacity == 0)
                    return new NotFoundObjectResult("there is no place in this day,please register to waiting list");
                else
                {
                    string names = calendarUser.GetEmployeeName(connection);
                    if(names == null)
                      return new NotFoundObjectResult("there is no employee with this id");
                    intCapacity--;
                    calendarUser.UpdateCapacity(connection, intCapacity);
                    ArraivingID = ArraivingID.Trim();
                    ArraivingID += string.Format("{0};", calendarUser.id);
                    calendarUser.UpdateArrivingID(connection, ArraivingID);
                    sendingEmployees.Add(calendarUser.GetEmployeeName(connection));
                }
                string json = JsonConvert.SerializeObject(sendingEmployees);
                command.Dispose();
                connection.Close();
                return new OkObjectResult(json);
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult<string>> DELETE([FromBody] CalendarUser calendarUser)
        {

            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", calendarUser.date);
            string ArraivingID = null;
            string newArraivingID = null;
            List<string> sendingEmployees = new List<string>();
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    ArraivingID = dataReader["EmployeesArriving"].ToString();
                }
                dataReader.Close();
                ArraivingID = ArraivingID.Trim();
                string[] employees = ArraivingID.Split(';');
                foreach (string employee in employees)
                {
                    if (employee.Equals(""))
                        continue;
                    if(employee.Equals(calendarUser.id))
                        continue;
                    
                    
                        newArraivingID += employee +";";
                        CalendarUser user = new CalendarUser();
                        user.id = employee;
                        string name = user.GetEmployeeName(connection);
                        sendingEmployees.Add(name);
                    
                    
                }
                calendarUser.UpdateArrivingID(connection, newArraivingID);
                string json = JsonConvert.SerializeObject(sendingEmployees);
                command.Dispose();
                connection.Close();
                return new OkObjectResult(json);
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }

        //GET https://localhost:5001/api/calendar/mm.dd.yyyy
        [HttpGet("{date}")]
        public ActionResult<string> Get(string date)
        {
            date.Replace(".", "/");
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", date);
            string CommingTotheOffice = null;
            List<string> sendingEmployees = new List<string>();
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
                if (CommingTotheOffice != null)
                {
                    CommingTotheOffice = CommingTotheOffice.Trim();
                    string[] employees = CommingTotheOffice.Split(';');
                    foreach (string employee in employees)
                    {
                        if (employee.Equals(""))
                            continue;
                        CalendarUser user = new CalendarUser();
                        user.id = employee;
                        string name = user.GetEmployeeName(connection);
                        sendingEmployees.Add(name);
                    }
                    connection.Close();
                    string json = JsonConvert.SerializeObject(sendingEmployees);
                    return new OkObjectResult(json);
                }
                return NotFound();

            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}
