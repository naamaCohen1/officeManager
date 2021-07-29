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
        public ActionResult<List<Calendar>> Get()
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


        /// <summary>
        /// Performs GET request to https://localhost:44375/api/calendar
        /// Adding employee to EmployeesArriving in the requested day 
        /// </summary>
        /// <param name="calendarUser"> Employee to be added as <see cref="CalendarUser"/> 
        /// {"date": "07/21/2021",
        ///"id": "204049316"
        ///}
        /// </param>
        /// <returns> calendar object as <see cref="Calendar"/> </returns>
        [HttpPost]
        public ActionResult<Calendar> Post([FromBody] CalendarUser calendarUser)
        {
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", calendarUser.Date);
            Calendar calendar = new Calendar();
            int intCapacity;

            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    calendar.EmployeesArriving = dataReader["EmployeesArriving"].ToString().Trim();
                    calendar.SittingCapacity = dataReader["SittingCapacity"].ToString();
                    calendar.Date = dataReader["Date"].ToString();
                    calendar.ParkingCapacity = dataReader["ParkingCapacity"].ToString();
                }
                dataReader.Close();
                command.Dispose();
                if (calendar.Date != null)
                {
                    intCapacity = int.Parse(calendar.SittingCapacity);
                    if (intCapacity == 0)
                        return new OkObjectResult("no space");
                    string employeesName = calendarUser.returnCommingName(calendar.EmployeesArriving, connection);

                    if (calendar.EmployeesArriving == null || !calendar.EmployeesArriving.Contains(calendarUser.Id))
                    {
                        calendarUser.UpdateCapacity(connection, --intCapacity);
                        calendar.EmployeesArriving += string.Format("{0};", calendarUser.Id);
                        calendarUser.UpdateArrivingID(connection, calendar.EmployeesArriving);
                        employeesName += calendarUser.GetEmployeeName(connection) +',';
                    }
                    command.Dispose();
                    connection.Close();
                    calendar.EmployeesArriving = employeesName;
                    return new OkObjectResult(JsonConvert.SerializeObject(calendar));
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }

        [HttpPut]
        public ActionResult Put([FromBody] CalendarUser calendarUser)
        {
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", calendarUser.Date);
            string waitingList = null, date = null; 
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    waitingList = dataReader["WaitingList"].ToString().Trim();
                    date = dataReader["Date"].ToString().Trim();
                }

                dataReader.Close();
                command.Dispose();
                if (date != null)
                {
                    if (waitingList == null || !waitingList.Contains(calendarUser.Id))
                    {
                        waitingList += calendarUser.Id + ";";
                        sql = string.Format("update tlbCalendar set WaitingList='{0}' WHERE date = '{1}'", waitingList, calendarUser.Date);
                        command = new SqlCommand(sql, connection);
                        command.ExecuteNonQuery();
                        command.Dispose();
                    }
                }
                connection.Close();
                return NoContent();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        [HttpPut("{date}")]
        public ActionResult Put(string date)
        {
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", date);
            string parkigCapacity = null,dateCal = null;
            int intPark;
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    dateCal = dataReader["Date"].ToString().Trim();
                    parkigCapacity = dataReader["ParkingCapacity"].ToString().Trim();
                }
                dataReader.Close();
                command.Dispose();
                if (dateCal != null)
                {
                    intPark = int.Parse(parkigCapacity);
                    if (intPark > 0)
                    {
                        sql = string.Format("update tlbCalendar set ParkingCapacity={0} WHERE date = '{1}'", --intPark, date);
                        command = new SqlCommand(sql, connection);
                        command.ExecuteNonQuery();
                        command.Dispose();
                        return NoContent();
                    }
                    else
                        return new OkObjectResult("no parking left");
                }
               
                connection.Close();
                return NoContent();
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }
        [HttpDelete]
        public ActionResult<Calendar> Delete([FromBody] CalendarUser calendarUser)
        {
            Calendar calendar = new Calendar();
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", calendarUser.Date);
            List<string> sendingEmployees = new List<string>();
            int intCap;
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    calendar.EmployeesArriving = dataReader["EmployeesArriving"].ToString();
                    calendar.SittingCapacity = dataReader["SittingCapacity"].ToString();
                    calendar.Date = dataReader["Date"].ToString();
                }
                dataReader.Close();
                if (calendar.Date != null)
                {
                    intCap = int.Parse(calendar.SittingCapacity);


                    if (calendar.EmployeesArriving == null || !calendar.EmployeesArriving.Contains(calendarUser.Id))
                    {
                        return NotFound();

                    }
                    else
                    {
                        calendarUser.UpdateCapacity(connection, ++intCap);
                        string removeId = string.Format("{0};", calendarUser.Id);
                        calendar.EmployeesArriving = calendar.EmployeesArriving.Replace(removeId, "");
                        calendarUser.UpdateArrivingID(connection, calendar.EmployeesArriving);
                    }
                    string employeesName = calendarUser.returnCommingName(calendar.EmployeesArriving, connection);
                    command.Dispose();
                    connection.Close();
                    calendar.EmployeesArriving = employeesName;
                    return new OkObjectResult(JsonConvert.SerializeObject(calendar));

                }
                return BadRequest();
               
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
        public ActionResult<Calendar> Get(string date)
        {
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", date);
            Calendar calendar = new Calendar();

            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    calendar.EmployeesArriving= dataReader["EmployeesArriving"].ToString();
                    calendar.Date = dataReader["Date"].ToString();

                }
                dataReader.Close();
                command.Dispose();
                if (calendar.Date != null)
                {
                    if (calendar.EmployeesArriving != null)
                    {
                        CalendarUser calUser = new CalendarUser();
                        calendar.EmployeesArriving = calUser.returnCommingName(calendar.EmployeesArriving, connection);
                        connection.Close();
                        return new OkObjectResult(JsonConvert.SerializeObject(calendar));
                    }
                    connection.Close();
                    return new OkResult();
                }
                 sql = string.Format("insert into tlbCalendar values('{0}',null,6,6,null)", date);
                command = new SqlCommand(sql, connection);
                dataReader = command.ExecuteReader();
                ///dataReader.Read();
                command.Dispose();
                connection.Close();
                //add date to calendar. defualt values
                return NotFound();

            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}
