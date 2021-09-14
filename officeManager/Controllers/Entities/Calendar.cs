using officeManager.constants;
using System;
using System.Data.SqlClient;

namespace officeManager.Controllers.Entities
{
    public class Calendar
    {
        public string Date { get; set; }
        public string EmployeesArriving { get; set; }
        public string SittingCapacity { get; set; }
        public string ParkingCapacity { get; set; }
        public string WaitingList { get; set; }
        public string OrgID { get; set; }

        /// <summary>
        /// Default Constructor
        /// </summary>
        public Calendar()
        {
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public Calendar(string date, string employeesArriving, string sittingCapacity, string parkingCapacity, string orgID)
        {
            this.Date = date;
            this.EmployeesArriving = employeesArriving;
            this.SittingCapacity = sittingCapacity;
            this.ParkingCapacity = parkingCapacity;
            this.WaitingList = String.Empty;
            this.OrgID = orgID;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public Calendar(string date, string employeesArriving, string sittingCapacity,
            string parkingCapacity, string WaitingList, string orgID)
        {
            this.Date = date;
            this.EmployeesArriving = employeesArriving;
            this.SittingCapacity = sittingCapacity;
            this.ParkingCapacity = parkingCapacity;
            this.WaitingList = WaitingList;
            this.OrgID = orgID;
        }

        /// <summary>
        /// This method insert a new date to the calendar.
        /// </summary>
        public void InsertDate()
        {
            try
            {
                string sql = string.Format("insert into tlbCalendar values('{0}','{1}',{2},{3},'{4}',{5})",
                    Date, EmployeesArriving, SittingCapacity, ParkingCapacity, WaitingList, OrgID);
                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                dataReader.Close();
                command.Dispose();
                connection.Close();
            }
            catch (Exception e)
            {
                throw new Exception("Fail to insert date [" + Date + "] to Calendar under office ID [" + OrgID + "]\n" + e.Message);
            }
        }
    }
}