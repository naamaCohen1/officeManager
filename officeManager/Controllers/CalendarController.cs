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


        /// <summary>
        /// Performs GET request to https://localhost:44375/api/calendar
        /// Gets all calendar events
        /// </summary>
        /// <returns> List of all calendar events as <see cref="List{Calendar}"/> </returns>
        [HttpGet]
        public async Task<ActionResult<List<Calendar>>> Get()
        {
            List<Calendar> calendars = new List<Calendar>();
            string sql = "select * from tlbCalendar";
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    string EmployeesArriving = dataReader["EmployeesArriving"].ToString().Trim();
                    string SittingCapacity = dataReader["SittingCapacity"].ToString().Trim();
                    string ParkingCapacity = dataReader["ParkingCapacity"].ToString().Trim();
                    string WaitingList = dataReader["WaitingList"].ToString().Trim();
                    string Date = dataReader["Date"].ToString().Trim();

                    calendars.Add(new Calendar(
                        Date, EmployeesArriving, SittingCapacity, ParkingCapacity, WaitingList));
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (calendars.Count == 0)
                    return new NotFoundObjectResult("No Events on Calendar");
                string json = JsonConvert.SerializeObject(calendars);
                return new OkObjectResult(json);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        //POST https://localhost:44375/api/calendar
        //{"date": "07/21/2021",
        //"id": "204049316"
        //}
        /// <summary>
        /// Performs GET request to https://localhost:44375/api/calendar/mm.dd.yyyy
        /// Adding employee to EmployeesArriving in the requested day 
        /// </summary>
        /// <param name="calendarUser"> Employee to be added as <see cref="CalendarUser"/> </param>
        /// <returns> ???????? </returns>
        [HttpPost]
    public async Task<ActionResult<string>> Post([FromBody] CalendarUser calendarUser)
        {

            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", calendarUser.Date);
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
                if(ArraivingID !=null)
                    ArraivingID = ArraivingID.Trim();
                string[] employees = ArraivingID.Split(';');
                foreach (string employee in employees)
                {
                    if (employee.Equals(""))
                        continue;
                    CalendarUser user = new CalendarUser();
                    user.Id = employee;
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
                    ArraivingID += string.Format("{0};", calendarUser.Id);
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

            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", calendarUser.Date);
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
                    if(employee.Equals(calendarUser.Id))
                        continue;
                    
                    
                        newArraivingID += employee +";";
                        CalendarUser user = new CalendarUser();
                        user.Id = employee;
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

        /// <summary>
        /// Performs GET request to https://localhost:44375/api/calendar/mm.dd.yyyy
        /// Adding employee to EmployeesArriving in the requested day 
        /// </summary>
        /// <param name="calendarUser"> Employee to be added as <see cref="CalendarUser"/> </param>
        /// <returns> ???????? </returns>
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
                        user.Id = employee;
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
