using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager.Controllers.Entities
{
    public class Statistics
    {
        private string connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";

        //        public static int Compare(DateTime d1, DateTime d2);
        //        <0 − If date1 is earlier than date2
        //        0 − If date1 is the same as date2
        //        >0 − If date1 is later than date2


        public ArrivalStatistics GetWeeklyActivity()
        {
            return getLastActivities(7);
        }

        public ArrivalStatistics GetMonthActivity()
        {
            return getLastActivities(31);
        }

        private ArrivalStatistics getLastActivities(int periodToGet)
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
                                arrivalStatistics.TotalArrivals++;
                                updateLists(arrivalStatistics, employee);
                            }
                        }
                    }
                    else
                        break;
                }
                return arrivalStatistics;
            }
            catch (Exception e)
            {
                throw new Exception("Fail to get Last week activities. " + e.Message);
            }
        }

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

        private List<Calendar> getCalendar()
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

                return calendars;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public ArrivalStatistics GetPercentages(ArrivalStatistics arrivalStatistics)
        {
            ArrivalStatistics precentage = new ArrivalStatistics();
            precentage.Employees = calcPrecentage(arrivalStatistics.Employees, arrivalStatistics.TotalArrivals);
            precentage.Departments = calcPrecentage(arrivalStatistics.Departments, arrivalStatistics.TotalArrivals);
            precentage.Floors = calcPrecentage(arrivalStatistics.Floors, arrivalStatistics.TotalArrivals);
            precentage.Roles = calcPrecentage(arrivalStatistics.Roles, arrivalStatistics.TotalArrivals);

            return precentage;
        }

        private Dictionary<string, int> calcPrecentage(Dictionary<string, int> pairs, int totalArrivals)
        {
            Dictionary<string, int> dictionary = new Dictionary<string, int>();
            foreach (var item in pairs)
            {
                dictionary.Add(item.Key, (item.Value / totalArrivals));
            }

            return dictionary;
        }
    }
}