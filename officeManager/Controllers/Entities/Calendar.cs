using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager.Controllers.Entities
{
    public class Calendar
    {
        public string Date { get; set; }
        public string EmployeesArriving { get; set; }
        public string SittingCapacity { get; set; }
        public string ParkingCapacity { get; set; }
        public string WaitingList { get; set; }
        public string orgID { get; set; }

        /// <summary>
        /// Constructor
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
            this.orgID = orgID;
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
            this.orgID = orgID;
        }
    }
}