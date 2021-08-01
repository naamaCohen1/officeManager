using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager.Controllers.Entities
{
    public class SearchObject
    {
        private string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";

        public string Id { get; set; }
        public string Date { get; set; }
        public string Category { get; set; }
        public string Input { get; set; }
        private Statistics statistics;

        /// <summary>
        /// Constructor
        /// </summary>
        public SearchObject()
        {
            updateCalendar();
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SearchObject(string Id, string Date, string Category, string Input)
        {
            this.Category = Category;
            this.Input = Input;
            this.Date = Date;
            this.Id = Id;
            updateCalendar();
        }


        /// <summary>
        /// This method initialize the statistics object
        /// </summary>
        private void updateCalendar()
        {
            statistics = new Statistics();
        }

        /// <summary>
        /// This method gets a date and fix to correct format
        /// </summary>
        /// <returns> Fixed date</returns>
        private string fixDateFormat()
        {
            char[] dateIndex = Date.ToArray<char>();
            string newDate = null;
            for (int i = 0; i < dateIndex.Length; i++)
            {
                if (dateIndex[i] == '.')
                {
                    if (i - 1 == 0)
                    {
                        newDate = newDate.Insert(0, "0");
                    }
                    else if (dateIndex[i - 2] == '.')
                    {
                        newDate = newDate.Insert(i, "0");
                    }
                }
                newDate += dateIndex[i];
            }
            return newDate;
        }

        /// <summary>
        /// This method gets all the employees from the requested floor which will arrive in the next 7 days
        /// </summary>
        /// <param name="floor">Floor to search</param>
        /// <returns>Employees names </returns>
        /// <seealso cref="fixDateFormat"/>
        /// <seealso cref="addNameToList(ref List{string}, string)"/>
        public List<string> GetImployeeByFloor(int floor)
        {
            List<Calendar> calendars = statistics.getCalendar();
            string newDate = fixDateFormat();
            DateTime date_test = DateTime.ParseExact(newDate, "MM.dd.yyyy", CultureInfo.InvariantCulture);
            DateTime week_ahead = date_test.AddDays(7);
            string currentFloor = null, fullName = null;
            List<string> employees = new List<string>();

            try
            {
                foreach (Calendar calendar in calendars)
                {
                    DateTime curr = Convert.ToDateTime(calendar.Date);
                    if (DateTime.Compare(curr, week_ahead) <= 0 && DateTime.Compare(curr, date_test) >= 0)
                    {
                        if (!calendar.EmployeesArriving.Equals(""))
                        {
                            List<string> currEemployees = new List<string>(calendar.EmployeesArriving.Trim().Split(';'));
                            SqlConnection connection = new SqlConnection(connetionString);
                            connection.Open();
                            foreach (string employee in currEemployees)
                            {
                                if (employee.Equals("") || employee.Equals(Id))
                                    continue;
                                string sql = string.Format("select *  from tlbEmployees WHERE id = '{0}'", employee);
                                SqlCommand command = new SqlCommand(sql, connection);
                                SqlDataReader dataReader = command.ExecuteReader();
                                while (dataReader.Read())
                                {
                                    currentFloor = dataReader["Floor"].ToString().Trim();
                                    fullName = dataReader["FirstName"].ToString().Trim();
                                    fullName += " " + dataReader["LastName"].ToString().Trim();
                                }
                                dataReader.Close();
                                command.Dispose();
                                int intFloor = int.Parse(currentFloor);

                                if (intFloor == floor)
                                {
                                    addNameToList(ref employees, fullName);
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                return employees;
            }
            catch (Exception e)
            {
                throw new Exception("Fail to search by floor " + e.Message);
            }
        }

        /// <summary>
        /// This method search for the employee Name in the last 7 days
        /// </summary>
        /// <param name="name">Employee name to get </param>
        /// <returns>Employees names</returns>
        /// <seealso cref="fixDateFormat"/>
        /// <seealso cref="addNameToList(ref List{string}, string)"/>
        public List<string> GetEmployeeByName(string name)
        {
            List<Calendar> calendars = statistics.getCalendar();
            string newDate = fixDateFormat();
            DateTime date_test = DateTime.ParseExact(newDate, "MM.dd.yyyy", CultureInfo.InvariantCulture);
            DateTime week_ahead = date_test.AddDays(7);
            string fullName = null;
            List<string> employees = new List<string>();

            try
            {
                foreach (Calendar calendar in calendars)
                {
                    DateTime curr = Convert.ToDateTime(calendar.Date);
                    if (DateTime.Compare(curr, week_ahead) <= 0 && DateTime.Compare(curr, date_test) >= 0)
                    {
                        if (!calendar.EmployeesArriving.Equals(""))
                        {
                            List<string> currEemployees = new List<string>(calendar.EmployeesArriving.Trim().Split(';'));
                            SqlConnection connection = new SqlConnection(connetionString);
                            connection.Open();
                            foreach (string employee in currEemployees)
                            {
                                if (employee.Equals("") || employee.Equals(Id))
                                    continue;
                                string sql = string.Format("select *  from tlbEmployees WHERE id = '{0}'", employee);
                                SqlCommand command = new SqlCommand(sql, connection);
                                SqlDataReader dataReader = command.ExecuteReader();
                                while (dataReader.Read())
                                {
                                    fullName = dataReader["FirstName"].ToString().Trim();
                                    fullName += " " + dataReader["LastName"].ToString().Trim();
                                }
                                dataReader.Close();
                                command.Dispose();

                                if (fullName.ToLower().Contains(name.ToLower()))
                                {
                                    addNameToList(ref employees, fullName);
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                return employees;
            }
            catch (Exception e)
            {
                throw new Exception("Fail to get  to search by name  " + e.Message);
            }
        }

        /// <summary>
        /// This method gets all the employees from the requested department which will arrive in the next 7 days
        /// </summary>
        /// <param name="department">Department to search </param>
        /// <returns>Employees names </returns>
        /// <seealso cref="fixDateFormat"/>
        /// <seealso cref="addNameToList(ref List{string}, string)"/>
        public List<string> GetImployeeByDeparment(string department)
        {
            List<Calendar> calendars = statistics.getCalendar();
            string newDate = fixDateFormat();
            DateTime date_test = DateTime.ParseExact(newDate, "MM.dd.yyyy", CultureInfo.InvariantCulture);
            DateTime week_ahead = date_test.AddDays(7);
            string fullName = null, dept = null;
            List<string> employees = new List<string>();

            try
            {
                foreach (Calendar calendar in calendars)
                {
                    DateTime curr = Convert.ToDateTime(calendar.Date);
                    if (DateTime.Compare(curr, week_ahead) <= 0 && DateTime.Compare(curr, date_test) >= 0)
                    {
                        if (!calendar.EmployeesArriving.Equals(""))
                        {
                            List<string> currEemployees = new List<string>(calendar.EmployeesArriving.Trim().Split(';'));
                            SqlConnection connection = new SqlConnection(connetionString);
                            connection.Open();
                            foreach (string employee in currEemployees)
                            {
                                if (employee.Equals("") || employee.Equals(Id))
                                    continue;
                                string sql = string.Format("select *  from tlbEmployees WHERE id = '{0}'", employee);
                                SqlCommand command = new SqlCommand(sql, connection);
                                SqlDataReader dataReader = command.ExecuteReader();
                                while (dataReader.Read())
                                {
                                    dept = dataReader["Department"].ToString().Trim();
                                    fullName = dataReader["FirstName"].ToString().Trim();
                                    fullName += " " + dataReader["LastName"].ToString().Trim();
                                }
                                dataReader.Close();
                                command.Dispose();

                                if (dept.ToLower().Equals(department.ToLower()))
                                {
                                    addNameToList(ref employees, fullName);
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                return employees;
            }
            catch (Exception e)
            {
                throw new Exception("Fail to get  to search by name  " + e.Message);
            }
        }

        /// <summary>
        /// This method add the given user name to the list (if not exist)
        /// </summary>
        /// <param name="employees"> List to add the user to </param>
        /// <param name="newName">User name to add</param>
        private void addNameToList(ref List<string> employees, string newName)
        {
            foreach (string name in employees)
            {
                if (name.Equals(newName))
                {
                    return;
                }
            }
            employees.Add(newName);
        }
    }
}
