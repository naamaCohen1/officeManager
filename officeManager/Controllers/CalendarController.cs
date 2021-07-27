﻿using Microsoft.AspNetCore.Mvc;
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
        public ActionResult<string> Post([FromBody] CalendarUser calendarUser)
        {

            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", calendarUser.Date);
            string capacity = null;
            string ArraivingID = null;
            string date = null;
            List<string> sendingEmployees = new List<string>();
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    ArraivingID = dataReader["EmployeesArriving"].ToString().Trim();
                    capacity = dataReader["SittingCapacity"].ToString();
                    date = dataReader["Date"].ToString();
                }
                dataReader.Close();

                if (date != null)
                {


                    if (ArraivingID != null)
                    { 
                        if (!ArraivingID.Contains(calendarUser.Id))
                        {
                            intCapacity--;
                            calendarUser.UpdateCapacity(connection, intCapacity);
                            ArraivingID += string.Format("{0};", calendarUser.Id);
                            calendarUser.UpdateArrivingID(connection, ArraivingID);
                            //sendingEmployees.Add(calendarUser.GetEmployeeName(connection));
                            //ArraivingID += calendarUser.Id + ";";
                            Console.WriteLine(ArraivingID);
                        }
                        sendingEmployees = calendarUser.returnCommingList(ArraivingID, connection);
                        //string[] employees = ArraivingID.Split(';');
                        //foreach (string employeeID in employees)
                        //{
                        //    if (employeeID.Equals("") || employeeID.Equals(calendarUser.Id))
                        //        continue;
                        //    CalendarUser user = new CalendarUser();
                        //    user.Id = employeeID;
                        //    string name = user.GetEmployeeName(connection);
                        //    sendingEmployees.Add(name);
                        //}
                    }

                    else 
                    {
                        intCapacity--;
                        calendarUser.UpdateCapacity(connection, intCapacity);
                        ArraivingID = string.Format("{0};", calendarUser.Id);
                        calendarUser.UpdateArrivingID(connection, ArraivingID);
                        sendingEmployees.Add(calendarUser.GetEmployeeName(connection));
                        //ArraivingID += calendarUser.Id + ";";
                        Console.WriteLine(ArraivingID);
                    }
                    int intCapacity = int.Parse(capacity);
                    if (intCapacity == 0)
                        return new OkObjectResult("there is no place in this day,please register to waiting list");
                    string json = JsonConvert.SerializeObject(sendingEmployees);
                    command.Dispose();
                    connection.Close();
                    return new OkObjectResult(json);
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }

        [HttpPut("{date}")]
        public ActionResult Put([FromBody] string id, string date)
        {
            date.Replace(".", "/");
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", date);
            string waitingList = null;
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    waitingList = dataReader["WaitingList"].ToString().Trim();
                }

                dataReader.Close();
                command.Dispose();
                if (!waitingList.Contains(id))
                {
                    if (waitingList != null)
                    {
                        waitingList += ";" + id;
                    }
                    else
                    {
                        waitingList = id;
                    }

                    sql = string.Format("update tlbCalendar set WaitingList='{0}' WHERE date = '{1}'", waitingList, date);
                    command = new SqlCommand(sql, connection);
                    command.ExecuteNonQuery();
                    command.Dispose();
                }
                connection.Close();
                return NoContent();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        [HttpDelete]
        public ActionResult<string> Delete([FromBody] CalendarUser calendarUser)
        {

            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", calendarUser.Date);
            string ArraivingID = null;
            string newArraivingID = null;
            string capacity = null;
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
                    if (employee.Equals(calendarUser.Id))
                    {
                        int intCap = int.Parse(capacity);
                        calendarUser.UpdateCapacity(connection, intCap++);
                    }
                    newArraivingID += employee + ";";
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
            //date.Replace(".", "/");
            string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}'", date);
            string CommingTotheOffice = null;
            string calDate = null;
           // List<string> sendingEmployees = new List<string>();
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    CommingTotheOffice = dataReader["EmployeesArriving"].ToString();
                    calDate = dataReader["Date"].ToString();

                }

                dataReader.Close();
                command.Dispose();
                if (calDate != null)
                {
                    if (CommingTotheOffice != null)
                    {
                        //string[] employees = CommingTotheOffice.Trim().Split(';');
                        //foreach (string employee in employees)
                        //{
                        //    if (employee.Equals(""))
                        //        continue;
                        //    CalendarUser user = new CalendarUser();
                        //    user.Id = employee;
                        //    string name = user.GetEmployeeName(connection);
                        //    sendingEmployees.Add(name);
                        //}
                        CalendarUser caluser = new CalendarUser();
                        List<string> sendingEmployees = caluser.returnCommingList(CommingTotheOffice, connection);
                        connection.Close();
                        return new OkObjectResult(JsonConvert.SerializeObject(sendingEmployees));
                    }
                    connection.Close();
                    return new OkResult();
                }
                 sql = string.Format("insert into tlbCalendar values('{0}',null,6,6,null)", date);
                command = new SqlCommand(sql, connection);
                dataReader = command.ExecuteReader();
                dataReader.Read();
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
