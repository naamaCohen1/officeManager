﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager.Controllers.Entities
{
    public class Statistics
    {
        //private string connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";
        private string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";

        //        public static int Compare(DateTime d1, DateTime d2);
        //        <0 − If date1 is earlier than date2
        //        0 − If date1 is the same as date2
        //        >0 − If date1 is later than date2

        /// <summary>
        /// This method gets all the events in the requested reriod of time
        /// </summary>
        /// <param name="periodToGet"> Amount of days to get</param>
        /// <returns>Data as <see cref="ArrivalStatistics"/></returns>
        /// <seealso cref="getCalendar"/>
        /// <seealso cref="updateLists"/>
        public ArrivalStatistics GetLastActivities(int periodToGet)
        {
            ArrivalStatistics arrivalStatistics = new ArrivalStatistics();
            var events = getCalendar();
            DateTime today_date = DateTime.Today;
            DateTime week_ago = DateTime.Today.AddDays(-periodToGet);
            try
            {
                foreach (Calendar calendar in events)
                {
                    DateTime curr = Convert.ToDateTime(calendar.Date);
                    if (DateTime.Compare(curr, week_ago) >= 0 && DateTime.Compare(curr, today_date) <= 0)
                    {
                        if (!calendar.EmployeesArriving.Equals(""))
                        {
                            List<string> employees = new List<string>(calendar.EmployeesArriving.Trim().Split(';'));
                            foreach (string employee in employees)
                            {
                                if (employee.Equals(""))
                                    continue;
                                arrivalStatistics.TotalArrivals++;
                                updateLists(arrivalStatistics, employee);
                            }
                        }
                    }
                }
                return arrivalStatistics;
            }
            catch (Exception e)
            {
                throw new Exception("Fail to get Last week activities. " + e.Message);
            }
        }

        /// <summary>
        /// This method update the counter of the requested user
        /// </summary>
        /// <param name="arrivalStatistics">Current <see cref="ArrivalStatistics"/> object </param>
        /// <param name="employee">Employee ID To update his arrival counter</param>
        /// <seealso cref="getUser(string)"/>
        private void updateLists(ArrivalStatistics arrivalStatistics, string employee)
        {
            User user = getUser(employee);

            if (arrivalStatistics.Employees.ContainsKey(employee))
                arrivalStatistics.Employees[employee] = ++arrivalStatistics.Employees[user.ID];
            else
                arrivalStatistics.Employees.Add(user.ID, 1);

            if (arrivalStatistics.Departments.ContainsKey(user.Department))
                arrivalStatistics.Departments[user.Department] = ++arrivalStatistics.Departments[user.Department];
            else
                arrivalStatistics.Departments.Add(user.Department, 1);

            if (arrivalStatistics.Roles.ContainsKey(user.Role))
                arrivalStatistics.Roles[user.Role] = ++arrivalStatistics.Roles[user.Role];
            else
                arrivalStatistics.Roles.Add(user.Role, 1);

            if (arrivalStatistics.Floors.ContainsKey(user.Floor))
                arrivalStatistics.Floors[user.Floor] = ++arrivalStatistics.Floors[user.Floor];
            else
                arrivalStatistics.Floors.Add(user.Floor, 1);
        }

        /// <summary>
        /// Performs GET request to https://localhost:44375/api/users/{id}
        /// Gets a specific user's details
        /// </summary>
        /// <param name="id">User ID to get</param>
        /// <returns>Requested user as <see cref="User"/></returns>
        private User getUser(string id)
        {
            string sql = string.Format("select * from tlbEmployees where ID={0}", id);
            var user = new User();
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    user.ID = dataReader["ID"].ToString().Trim();
                    user.FirstName = dataReader["FirstName"].ToString().Trim();
                    user.LastName = dataReader["LastName"].ToString().Trim();
                    user.CarNumber = dataReader["CarNumber"].ToString().Trim();
                    user.Floor = dataReader["Floor"].ToString().Trim();
                    user.RoomNumber = dataReader["RoomNumber"].ToString().Trim();
                    user.Role = dataReader["Role"].ToString().Trim();
                    user.PermissionLevel = dataReader["PermissionLevel"].ToString().Trim();
                    user.Department = dataReader["Department"].ToString().Trim();
                    user.Email = dataReader["Email"].ToString().Trim();
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (user.FirstName == null)
                    throw new Exception("User with ID [" + id + "] was not found");
                return user;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        /// <summary>
        /// Performs GET request to https://localhost:44375/api/calendar
        /// Gets all events from calendar
        /// </summary>
        /// <returns>All Calendar events as list of <see cref="Calendar"/></returns>
        public List<Calendar> getCalendar()
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

                return calendars.OrderBy(x => x.Date).ToList();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}