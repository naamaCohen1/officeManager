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
        public string waitingList { get; set; }

        public Calendar(string date, string employeesArriving, string sittingCapacity, string parkingCapacity)
        {
            this.Date = date;
            this.EmployeesArriving = employeesArriving;
            this.SittingCapacity = sittingCapacity;
            this.ParkingCapacity = parkingCapacity;
            this.waitingList = String.Empty;
        }
    }
}
