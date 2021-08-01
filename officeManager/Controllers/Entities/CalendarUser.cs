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

        /// <summary>
        /// Constructor
        /// </summary>
        public CalendarUser(string date, string id)
        {
            this.Id = id;
            this.Date = date;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public CalendarUser()
        {
        }

        /// <summary>
        /// This method update the waiting list
        /// </summary>
        /// <param name="connection"> <see cref="SqlConnection"/></param>
        /// <param name="names">Update waiting list value</param>
        public void UpdateWaitingList(SqlConnection connection, string names)
        {
            string sql = string.Format("UPDATE tlbCalendar SET WaitingList = '{0}' where date = '{1}'", names, Date);
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

        /// <summary>
        /// This method gets the employee name
        /// </summary>
        /// <param name="connection"> <see cref="SqlConnection"/></param>
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
                    name += " ";
                    name += dataReader["LastName"].ToString();
                }
                dataReader.Close();
                command.Dispose();
                if (name != null)
                    return name.Trim();
                return name;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// This method update the Arriving ID list
        /// </summary>
        /// <param name="connection"> <see cref="SqlConnection"/></param>
        /// <param name="names">Update Arriving ID list value</param>
        public void UpdateArrivingID(SqlConnection connection, string names)
        {
            string sql = string.Format("UPDATE tlbCalendar SET EmployeesArriving = '{0}' where date = '{1}'", names, Date);
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

        /// <summary>
        /// This method update the Capacity
        /// </summary>
        /// <param name="connection"> <see cref="SqlConnection"/></param>
        /// <param name="names">Update Capacity value</param>
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

        /// <summary>
        /// This method gets the names of the requested IDs
        /// </summary>
        /// <param name="arraivingID">IDs to gets thier names</param>
        /// <param name="connection"><see cref="SqlConnection"/></param>
        /// <returns>Requested employees names</returns>
        /// <seealso cref="GetEmployeeName(SqlConnection)"/>
        public string GetComingEmployeesNames(string arraivingID, SqlConnection connection)
        {
            string comingEmployees = null;
            try
            {
                if (arraivingID == null)
                    return comingEmployees;
                arraivingID = arraivingID.Trim();
                string[] employees = arraivingID.Split(';');
                foreach (string employeeID in employees)
                {
                    if (employeeID.Equals(""))
                        continue;
                    CalendarUser user = new CalendarUser();
                    user.Id = employeeID;
                    string name = user.GetEmployeeName(connection);
                    comingEmployees += name + ',';
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return comingEmployees;
        }
    }
}