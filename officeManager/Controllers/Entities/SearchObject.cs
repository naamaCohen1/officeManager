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

        public SearchObject()
        {
            updateCalendar();
        }
        private void updateCalendar()
        {
            statistics = new Statistics();           
        }
        public SearchObject(string Id, string Date,string Category, string Input)
        {
            this.Category = Category;
            this.Input = Input;
            this.Date = Date;
            this.Id = Id;
            updateCalendar();
        }
        private string calcDateAsNeeded()
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
        public List<string> GetImployeeByFloor(int floor)
        {
            
            List<Calendar> calendars = statistics.getCalendar();

            string newDate = calcDateAsNeeded();
            DateTime date_test = DateTime.ParseExact(newDate, "MM.dd.yyyy", CultureInfo.InvariantCulture);
            
            DateTime week_ahead = date_test.AddDays(7);
            string currentFloor = null;
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
                                    currentFloor = dataReader["Floor"].ToString().Trim();
                                    fullName = dataReader["FirstName"].ToString().Trim();
                                    fullName += " " + dataReader["LastName"].ToString().Trim();
                                }
                                dataReader.Close();
                                command.Dispose();
                                int intFloor = int.Parse(currentFloor);

                                if (intFloor == floor)
                                {
                                    addOnlyIfTheNameIsNew(ref employees, fullName);
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

        public List<string> GetImployeeByName(string name)
        {

            List<Calendar> calendars = statistics.getCalendar();
            string newDate = calcDateAsNeeded();
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

                                if (employee.Equals("")|| employee.Equals(Id))
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
                                    addOnlyIfTheNameIsNew(ref employees, fullName);
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

        public List<string> GetImployeeByDeparment(string department)
        {

            List<Calendar> calendars = statistics.getCalendar();
            string newDate = calcDateAsNeeded();
            DateTime date_test = DateTime.ParseExact(newDate, "MM.dd.yyyy", CultureInfo.InvariantCulture);


            DateTime week_ahead = date_test.AddDays(7);
            string fullName = null;
            string dept = null;
            List<string> employees = new List<string>();
            try
            {
                foreach (Calendar calendar in calendars)
                {
                    DateTime curr = Convert.ToDateTime(calendar.Date);
                    if (DateTime.Compare(curr, week_ahead) <= 0 && DateTime.Compare(curr, date_test) >= 0)
                    {
                        if (!calendar.EmployeesArriving.Equals("") )
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
                                    addOnlyIfTheNameIsNew(ref employees, fullName);
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
        private void addOnlyIfTheNameIsNew(ref List<string> employees,string newName)
        {
            foreach(string name in employees)
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
