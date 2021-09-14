using Microsoft.AspNetCore.Mvc;
using System;
using officeManager.Controllers.Entities;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Collections.Generic;
using officeManager.constants;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("calendar")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        /// <summary>
        /// Performs GET request to http://officemanager.us-east-1.elasticbeanstalk.com/api/calendar/{orgID}
        /// Gets all calendar events
        /// </summary>
        /// <returns> List of all calendar events as <see cref="List{Calendar}"/> </returns>
        [HttpGet("{orgID}")]
        public ActionResult<List<Calendar>> Get(string orgID)
        {
            List<Calendar> calendars = new List<Calendar>();
            string sql = string.Format("select * from tlbCalendar where orgID={0}", orgID);
            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    string employeesArriving = dataReader["EmployeesArriving"].ToString().Trim();
                    string sittingCapacity = dataReader["SittingCapacity"].ToString().Trim();
                    string parkingCapacity = dataReader["ParkingCapacity"].ToString().Trim();
                    string waitingList = dataReader["WaitingList"].ToString().Trim();
                    string date = dataReader["Date"].ToString().Trim();

                    calendars.Add(new Calendar(
                        date, employeesArriving, sittingCapacity, parkingCapacity, waitingList, orgID));
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
        /// Performs POST request to http://officemanager.us-east-1.elasticbeanstalk.com/api/calendar/{orgID}
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
        [HttpPost("{orgID}")]
        public ActionResult<Calendar> Post(string orgID, [FromBody] CalendarUser calendarUser)
        {
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}' and OrgID={1}", calendarUser.Date, orgID);
            Calendar calendar = new Calendar();
            int capacity;
            string employeesName = null;

            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
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
                    capacity = int.Parse(calendar.SittingCapacity);
                    if (capacity == 0)
                        return new OkObjectResult("no space");
                    employeesName = calendarUser.GetComingEmployeesNames(calendar.EmployeesArriving, connection, orgID);

                    if (calendar.EmployeesArriving == null || !calendar.EmployeesArriving.Contains(calendarUser.Id))
                    {
                        calendarUser.UpdateCapacity(connection, --capacity, orgID);
                        calendar.EmployeesArriving += string.Format("{0};", calendarUser.Id);
                        calendarUser.UpdateArrivingID(connection, calendar.EmployeesArriving, orgID);
                        employeesName += calendarUser.GetEmployeeName(connection, orgID) + ',';
                    }
                    command.Dispose();
                    connection.Close();
                    calendar.EmployeesArriving = employeesName;
                    return new OkObjectResult(JsonConvert.SerializeObject(calendar));
                }
                else
                {
                    Office office = new Office();
                    office.GetOfficeById(orgID);
                    calendar.OrgID = office.ID;
                    calendar.ParkingCapacity = office.ParkingAmount;
                    calendar.SittingCapacity = office.OfficeCapacity;
                    calendar.EmployeesArriving += string.Format("{0};", calendarUser.Id);
                    calendar.InsertDate();
                    employeesName = calendarUser.GetEmployeeName(connection, orgID) + ',';
                    calendar.EmployeesArriving = employeesName;
                    return new OkObjectResult(JsonConvert.SerializeObject(calendar));
                }
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }

        /// <summary>
        /// Performs PUT request to http://officemanager.us-east-1.elasticbeanstalk.com/api/calendar/{orgID}
        /// Add User to Waiting list
        /// </summary>
        /// <param name="calendarUser"> User to add to waiting list as <see cref="CalendarUser"/></param>
        /// <returns><see cref="IActionResult"/></returns>
        [HttpPut("{orgID}")]
        public ActionResult Put(string orgID, [FromBody] CalendarUser calendarUser)
        {
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}' and OrgID={1}", calendarUser.Date, orgID);
            string waitingList = null, date = null;
            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
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
        /// Performs PUT request to http://officemanager.us-east-1.elasticbeanstalk.com/api/calendar/{orgID}/{date}
        /// Update ParkingCapacity in the requested date
        /// </summary>
        /// <param name="date"> Date to update the details in </param>
        /// <returns><see cref="ActionResult"/></returns>
        [HttpPut("{orgID}/{date}")]
        public ActionResult Put(string orgID, string date)
        {
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}' and OrgID={1}", date, orgID);
            string parkigCapacity = null, calendarDate = null;
            int parking;
            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    calendarDate = dataReader["Date"].ToString().Trim();
                    parkigCapacity = dataReader["ParkingCapacity"].ToString().Trim();
                }
                dataReader.Close();
                command.Dispose();
                if (calendarDate != null)
                {
                    parking = int.Parse(parkigCapacity);
                    if (parking > 0)
                    {
                        sql = string.Format("update tlbCalendar set ParkingCapacity={0} WHERE date = '{1}'", --parking, date);
                        command = new SqlCommand(sql, connection);
                        command.ExecuteNonQuery();
                        command.Dispose();
                        return NoContent();
                    }
                    else
                        return new OkObjectResult("No parking place left");
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
        /// Performs DELETE request to http://officemanager.us-east-1.elasticbeanstalk.com/api/calendar/{orgID}
        /// Delete a user from the requested day
        /// </summary>
        /// <param name="calendarUser">User to delete and a date as <see cref="CalendarUser"/></param>
        /// <returns>Updates calendar as <see cref="Calendar"/></returns>
        [HttpDelete("{orgID}")]
        public ActionResult<Calendar> Delete(string orgID, [FromBody] CalendarUser calendarUser)
        {
            Calendar calendar = new Calendar();
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}' and orgID={1}", calendarUser.Date, orgID);
            int capacity;

            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
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
                    capacity = int.Parse(calendar.SittingCapacity);
                    if (calendar.EmployeesArriving == null || !calendar.EmployeesArriving.Contains(calendarUser.Id))
                        return NotFound();
                    else
                    {
                        calendarUser.UpdateCapacity(connection, ++capacity, orgID);
                        string idToRemove = string.Format("{0};", calendarUser.Id);
                        calendar.EmployeesArriving = calendar.EmployeesArriving.Replace(idToRemove, "");
                        calendarUser.UpdateArrivingID(connection, calendar.EmployeesArriving, orgID);

                        if (!string.IsNullOrEmpty(calendar.WaitingList))
                        {
                            calendarUser.UpdateCapacity(connection, --capacity, orgID);
                            string idFromWaitingList = calendar.WaitingList.Split(";")[0];
                            string idToAdd = string.Format("{0};", idFromWaitingList);
                            calendar.EmployeesArriving += idToAdd;
                            calendarUser.UpdateArrivingID(connection, calendar.EmployeesArriving, orgID);
                            calendar.WaitingList = calendar.WaitingList.Replace(idToAdd, "");
                            calendarUser.UpdateWaitingList(connection, calendar.WaitingList, orgID);
                            calendarUser.SendWaitingListEmail(connection, idFromWaitingList, calendar.Date, orgID);
                        }
                    }
                    string employeesName = calendarUser.GetComingEmployeesNames(calendar.EmployeesArriving, connection, orgID);
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
        /// Performs GET request to http://officemanager.us-east-1.elasticbeanstalk.com/api/calendar/{orgID}/mm.dd.yyyy
        /// Adding employee to EmployeesArriving in the requested day 
        /// </summary>
        /// <param name="calendarUser"> Employee to be added as <see cref="CalendarUser"/> </param>
        /// <returns> <see cref="Calendar"/> </returns>
        [HttpGet("{orgID}/{date}")]
        public ActionResult<Calendar> Get(string orgID, string date)
        {
            string sql = string.Format("select * from tlbCalendar WHERE date = '{0}' and OrgID={1}", date, orgID);
            Calendar calendar = new Calendar();

            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
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
                        CalendarUser user = new CalendarUser();
                        calendar.EmployeesArriving = user.GetComingEmployeesNames(calendar.EmployeesArriving, connection, orgID);
                        connection.Close();
                        return new OkObjectResult(JsonConvert.SerializeObject(calendar));
                    }
                    connection.Close();
                    return new OkResult();
                }
                else
                    connection.Close();

                Office office = new Office();
                office.GetOfficeById(orgID);
                calendar.OrgID = office.ID;
                calendar.Date = date;
                calendar.ParkingCapacity = office.ParkingAmount;
                calendar.SittingCapacity = office.OfficeCapacity;
                calendar.EmployeesArriving = null;
                calendar.WaitingList = null;
                calendar.InsertDate();
                return NotFound();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        /// <summary>
        /// Performs POST request to http://officemanager.us-east-1.elasticbeanstalk.com/api/calendar/{orgID}/{id}
        /// Gets all dates users signed to 
        /// </summary>
        /// <param name="id">User to get his dates</param>
        /// <returns>List of Dates</returns>
        [HttpPost("{orgID}/{id}")]
        public ActionResult<List<string>> Post(string orgID, string id)
        {
            try
            {
                List<string> dates = new List<string>();
                string sql = string.Format("SELECT * FROM tlbCalendar WHERE EmployeesArriving LIKE '%{0}%' and OrgID={1}", id, orgID);
                DateTime today_date = DateTime.Today;

                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    string date = dataReader["Date"].ToString().Trim();
                    DateTime curr_date = Convert.ToDateTime(date);
                    if (DateTime.Compare(today_date, curr_date) <= 0)
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