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
        //private string connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";

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
        /// Performs POST request to https://localhost:44375/api/calendar
        /// Adding employee to EmployeesArriving in the requested day 
        /// </summary>
        /// <param name="calendarUser"> Employee to be added as <see cref="CalendarUser"/> 
        /// <code>
        /// {
        ///     "date": "07/21/2021",
        ///     "id": "204049316"
        /// }
        /// </code>
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
                    string employeesName = calendarUser.GetComingEmployeesNames(calendar.EmployeesArriving, connection);

                    if (calendar.EmployeesArriving == null || !calendar.EmployeesArriving.Contains(calendarUser.Id))
                    {
                        calendarUser.UpdateCapacity(connection, --intCapacity);
                        calendar.EmployeesArriving += string.Format("{0};", calendarUser.Id);
                        calendarUser.UpdateArrivingID(connection, calendar.EmployeesArriving);
                        employeesName += calendarUser.GetEmployeeName(connection) + ',';
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

        /// <summary>
        /// Performs PUT request to https://localhost:44375/api/calendar
        /// Add User to Waiting list
        /// </summary>
        /// <param name="calendarUser"> User to add to waiting list as <see cref="CalendarUser"/></param>
        /// <returns><see cref="IActionResult"/></returns>
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

        /// <summary>
        /// Performs PUT request to https://localhost:44375/api/calendar/{date}
        /// Update ParkingCapacity in the requested date
        /// </summary>
        /// <param name="date"> Date to update the details in </param>
        /// <returns><see cref="ActionResult"/></returns>
        [HttpPut("{date}")]
        public ActionResult Put(string date)
        {
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", date);
            string parkigCapacity = null, dateCal = null;
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

        /// <summary>
        /// Performs DELETE request to https://localhost:44375/api/calendar
        /// Delete a user from the requested day
        /// </summary>
        /// <param name="calendarUser">User to delete and a date as <see cref="CalendarUser"/></param>
        /// <returns>Updates calendar as <see cref="Calendar"/></returns>
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
                    calendar.EmployeesArriving = dataReader["EmployeesArriving"].ToString().Trim();
                    calendar.SittingCapacity = dataReader["SittingCapacity"].ToString().Trim();
                    calendar.Date = dataReader["Date"].ToString().Trim();
                    calendar.WaitingList = dataReader["WaitingList"].ToString().Trim();
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

                        if (calendar.WaitingList != null || calendar.WaitingList != "")
                        {
                            calendarUser.UpdateCapacity(connection, --intCap);
                            string waitId = calendar.WaitingList.Split(";")[0];
                            string addId = string.Format("{0};", waitId);
                            calendar.EmployeesArriving += addId;
                            calendarUser.UpdateArrivingID(connection, calendar.EmployeesArriving);
                            calendar.WaitingList = calendar.WaitingList.Replace(addId, "");
                            calendarUser.UpdateWaitingList(connection, calendar.WaitingList);
                        }
                    }

                    string employeesName = calendarUser.GetComingEmployeesNames(calendar.EmployeesArriving, connection);
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
                    calendar.EmployeesArriving = dataReader["EmployeesArriving"].ToString();
                    calendar.Date = dataReader["Date"].ToString();
                }
                dataReader.Close();
                command.Dispose();
                if (calendar.Date != null)
                {
                    if (calendar.EmployeesArriving != null)
                    {
                        CalendarUser calUser = new CalendarUser();
                        calendar.EmployeesArriving = calUser.GetComingEmployeesNames(calendar.EmployeesArriving, connection);
                        connection.Close();
                        return new OkObjectResult(JsonConvert.SerializeObject(calendar));
                    }
                    connection.Close();
                    return new OkResult();
                }
                sql = string.Format("insert into tlbCalendar values('{0}',null,6,6,null)", date);
                command = new SqlCommand(sql, connection);
                dataReader = command.ExecuteReader();
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

        /// <summary>
        /// Performs POST request to https://localhost:44375/api/calendar/id
        /// Gets all dates users signed to 
        /// </summary>
        /// <param name="id">User to get his dates</param>
        /// <returns>List of Dates</returns>
        [HttpPost("{id}")]
        public ActionResult<List<string>> Post(string id)
        {
            try
            {
                List<string> dates = new List<string>();
                string sql = string.Format("SELECT * FROM tlbCalendar WHERE EmployeesArriving LIKE '%{0}%'", id);
                DateTime today_date = DateTime.Today;

                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    string date = dataReader["Date"].ToString().Trim();
                    DateTime curr = Convert.ToDateTime(date);
                    if (DateTime.Compare(today_date, curr) <= 0)
                        dates.Add(date.Split(" ")[0]);
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                string json = JsonConvert.SerializeObject(dates);
                return new OkObjectResult(json);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}
