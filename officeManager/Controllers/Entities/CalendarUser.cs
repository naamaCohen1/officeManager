using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using officeManager.Controllers.Entities;
using System.Data.SqlClient;

namespace officeManager.Controllers.Entities
{
    public class CalendarUser
    {
        private string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";
        public string Id { get; set; }
        public string Date { get; set; }

        public CalendarUser(string date,string id)
        {
            this.Id = id;
            this.Date = date;

        }

        public CalendarUser()
        {

        }

        public string GetEmployeeName(SqlConnection connection)
        {
            string sql = string.Format("select * from tlbEmployees where id = {0}", Id);
            string name = null;
            try
            {
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    name += dataReader["FirstName"].ToString();
                    name = name.Trim();
                    name +=" ";
                    name += dataReader["LastName"].ToString();
                }
                dataReader.Close();
                command.Dispose();
                if(name != null)
                    return name.Trim();
                return name;
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        public void UpdateArrivingID(SqlConnection connection,string names)
        {
            string sql = string.Format("UPDATE tlbCalendar SET EmployeesArriving = '{0}' where date = '{1}'", names,Date);
            try
            {
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                dataReader.Close();
                command.Dispose();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //public void UpdateWaitingList(SqlConnection connection, string names)
        //{
        //    string sql = string.Format("UPDATE tlbCalendar SET WaitingList = '{0}' where date = '{1}'", names, Date);
        //    try
        //    {
        //        SqlCommand command = new SqlCommand(sql, connection);
        //        SqlDataReader dataReader = command.ExecuteReader();
        //        dataReader.Close();
        //        command.Dispose();
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        public void UpdateCapacity(SqlConnection connection, int capacity)
        {
            string sql = string.Format("UPDATE tlbCalendar SET SittingCapacity = {0} where date = '{1}'", capacity.ToString(), Date);
            try
            {
                SqlCommand command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string returnCommingName(string arraivingID, SqlConnection connection)
        {
            string commingEmployees = null;
            try
            {
                if (arraivingID == null)
                    return commingEmployees;
                arraivingID = arraivingID.Trim();
                string[] employees = arraivingID.Split(';');
                foreach (string employeeID in employees)
                {
                    if (employeeID.Equals(""))
                        continue;
                    CalendarUser user = new CalendarUser();
                    user.Id = employeeID;
                    string name = user.GetEmployeeName(connection);
                    commingEmployees += name + ',';
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return commingEmployees;
        }
    }
}
