using System;
using System.Data.SqlClient;

namespace officeManager.Controllers.Entities
{
    public class CalendarUser
    {
        public string Id { get; set; }
        public string Date { get; set; }

        /// <summary>
        /// Default Constructor
        /// </summary>
        public CalendarUser()
        {
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public CalendarUser(string date, string id)
        {
            this.Id = id;
            this.Date = date;
        }

        /// <summary>
        /// This method sends an email for the added user from the waiting list to the office
        /// </summary>
        /// <param name="connection"><see cref="SqlConnection"/></param>
        /// <param name="id">User ID to send the email to</param>
        /// <param name="calendar_date">Arrival date</param>
        /// <param name="orgID"> Organization ID </param>
        public void SendWaitingListEmail(SqlConnection connection, string id, string calendar_date, string orgID)
        {
            string sql = string.Format("SELECT * FROM tlbEmployees WHERE ID='{0}' and OrgID={1}", id, orgID);
            string email = null;

            SqlCommand command = new SqlCommand(sql, connection);
            SqlDataReader dataReader = command.ExecuteReader();
            while (dataReader.Read())
            {
                email = dataReader["Email"].ToString().Trim();
            }
            dataReader.Close();
            command.Dispose();
            if (email == null)
                throw new ArgumentNullException("User email can not be null");
            GmailMessage gmailMessage = new GmailMessage();
            DateTime date = Convert.ToDateTime(calendar_date);
            gmailMessage.To = email;
            gmailMessage.Subject = "You have been added to the office at " + date.ToShortDateString();
            gmailMessage.Body = "You are lucky!\n" +
                "Someone has just canceled his arriving at " + date.ToShortDateString() + ", We Added you instead.\n" +
                "Enjoy (:";
            new GmailController().SendMail(gmailMessage);
        }

        /// <summary>
        /// This method updates the waiting list
        /// </summary>
        /// <param name="connection"> <see cref="SqlConnection"/></param>
        /// <param name="names">Update waiting list value</param>
        /// <param name="orgID"> Organization ID </param>
        public void UpdateWaitingList(SqlConnection connection, string names, string orgID)
        {
            string sql = string.Format("UPDATE tlbCalendar SET WaitingList = '{0}' where date = '{1}' and OrgID={2}", names, Date, orgID);
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
        /// <param name="orgID"> Organization ID </param>
        public string GetEmployeeName(SqlConnection connection, string orgID)
        {
            string sql = string.Format("select * from tlbEmployees where id = {0} and OrgID={1}", Id, orgID);
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
        /// <param name="orgID"> Organization ID </param>
        public void UpdateArrivingID(SqlConnection connection, string names, string orgID)
        {
            string sql = string.Format("UPDATE tlbCalendar SET EmployeesArriving = '{0}' where date = '{1}' and OrgID={2}", names, Date, orgID);
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
        /// <param name="orgID"> Organization ID </param>
        public void UpdateCapacity(SqlConnection connection, int capacity, string orgID)
        {
            string sql = string.Format("UPDATE tlbCalendar SET SittingCapacity = {0} where date = '{1}' and OrgID={2}", capacity.ToString(), Date, orgID);
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
        /// <param name="orgID"> Organization ID </param>
        /// <returns>Requested employees names</returns>
        /// <seealso cref="GetEmployeeName(SqlConnection, string)"/>
        public string GetComingEmployeesNames(string arraivingID, SqlConnection connection, string orgID)
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
                    string name = user.GetEmployeeName(connection, orgID);
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