using officeManager.constants;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace officeManager.Controllers.Entities
{
    public class SearchObject
    {
        public string Id { get; set; }
        public string Date { get; set; }
        public string Category { get; set; }
        public string Input { get; set; }
        private Statistics Statistics;

        /// <summary>
        /// Default Constructor
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
            Statistics = new Statistics();
        }

        /// <summary>
        /// This method gets the arriving employees in the requested day
        /// </summary>
        /// <param name="orgID"> Organization ID </param>
        /// <returns>Arriving Enployees as <see cref="Calendar"/></returns>
        private Calendar getDate(string orgID)
        {
            Calendar calendar = new Calendar();
            try
            {
                string sql = string.Format("select *  from tlbCalendar WHERE date = '{0}' and OrgID={1}", Date, orgID);
                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    calendar.EmployeesArriving = dataReader["EmployeesArriving"].ToString().Trim();
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();
            }
            catch (Exception e)
            {
                throw new Exception("Fail to get date [" + Date + "] for office with ID [" + orgID + "]\n" + e.Message);
            }
            return calendar;
        }

        /// <summary>
        /// This method gets all the employees from the requested floor in this day
        /// </summary>
        /// <param name="floor">Floor to search</param>
        /// <param name="orgID"> Organization ID </param>
        /// <returns>Employees names </returns>
        /// <seealso cref="getDate(string)"/>
        /// <seealso cref="addNameToList(ref List{string}, string)"/>
        public List<string> GetEmployeeByFloor(int floor, string orgID)
        {
            string currentFloor = null, fullName = null;
            List<string> employees = new List<string>();

            try
            {
                Calendar calendar = getDate(orgID);
                if (!calendar.EmployeesArriving.Equals(""))
                {
                    SqlConnection connection = new SqlConnection(Params.connetionString);
                    connection.Open();
                    List<string> currEemployees = new List<string>(calendar.EmployeesArriving.Trim().Split(';'));
                    foreach (string employee in currEemployees)
                    {
                        if (employee.Equals("") || employee.Equals(Id))
                            continue;
                        string sql = string.Format("select *  from tlbEmployees WHERE id = '{0}' and OrgID={1}", employee, orgID);
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
                return employees;
            }
            catch (Exception e)
            {
                throw new Exception("Fail to get arriving employees by floor [" + floor + "] for org ID [" + orgID + "]\n" + e.Message);
            }
        }

        /// <summary>
        /// This method search for the employee Name in this day
        /// </summary>
        /// <param name="name">Employee name to get </param>
        /// <param name="orgID"> Organization ID </param>
        /// <returns>Employees names</returns>
        /// <seealso cref="addNameToList(ref List{string}, string)"/>
        public List<string> GetEmployeeByName(string name, string orgID)
        {
            string fullName = null;
            List<string> employees = new List<string>();
            try
            {
                Calendar calendar = getDate(orgID);
                if (!calendar.EmployeesArriving.Equals(""))
                {
                    List<string> currEemployees = new List<string>(calendar.EmployeesArriving.Trim().Split(';'));
                    SqlConnection connection = new SqlConnection(Params.connetionString);
                    connection.Open();
                    foreach (string employee in currEemployees)
                    {
                        if (employee.Equals("") || employee.Equals(Id))
                            continue;
                        string sql = string.Format("select *  from tlbEmployees WHERE id = '{0}' and OrgID={1}", employee, orgID);
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
                return employees;
            }
            catch (Exception e)
            {
                throw new Exception("Fail to get arriving employees by Name [" + name + "] for org ID [" + orgID + "]\n" + e.Message);
            }
        }

        /// <summary>
        /// This method gets all the employees from the requested department in this day
        /// </summary>
        /// <param name="department">Department to search </param>
        /// <param name="orgID"> Organization ID </param>
        /// <returns>Employees names </returns>
        /// <seealso cref="addNameToList(ref List{string}, string)"/>
        public List<string> GetEmployeeByDeparment(string department, string orgID)
        {
            try
            {
                Calendar calendar = getDate(orgID);
                string dept = null, fullName = null;
                List<string> employees = new List<string>();
                if (!calendar.EmployeesArriving.Equals(""))
                {
                    List<string> currEemployees = new List<string>(calendar.EmployeesArriving.Trim().Split(';'));
                    SqlConnection connection = new SqlConnection(Params.connetionString);
                    connection.Open();
                    foreach (string employee in currEemployees)
                    {
                        if (employee.Equals("") || employee.Equals(Id))
                            continue;
                        string sql = string.Format("select *  from tlbEmployees WHERE id = '{0}' and OrgID={1}", employee, orgID);
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
                return employees;
            }
            catch (Exception e)
            {
                throw new Exception("Fail get arriving employees by Department [" + department + "] for org ID [" + orgID + "]\n" + e.Message);
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