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
        string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";
        public string id { get; set; }
        public string date { get; set; }
        public CalendarUser(string date,string id)
        {
            this.id = id;
            this.date = date;

        }
        public CalendarUser()
        {

        }
        public string GetEmployeeName(SqlConnection connection)
        {
            string sql = string.Format("select * from tlbEmployees where id = {0}", id);
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
                return name.Trim();
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        public void UpdateArrivingName(SqlConnection connection,string names)
        {
            string sql = string.Format("UPDATE tlbCalendar SET EmployeesArriving = '{0}' where date = '{1}'", names,date);
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

        public void UpdateCapacity(SqlConnection connection, int capacity)
        {
            string sql = string.Format("UPDATE tlbCalendar SET SittingCapacity = {0} where date = '{1}'", capacity.ToString(), date);
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
    }
}
