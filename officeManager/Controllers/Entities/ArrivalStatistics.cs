using System;
using System.Collections.Generic;

namespace officeManager.Controllers.Entities
{
    public class ArrivalStatistics
    {
        public int TotalArrivals { get; set; }
        public Dictionary<string, int> Employees { get; set; }
        public Dictionary<string, int> Departments { get; set; }
        public Dictionary<string, int> Floors { get; set; }
        public Dictionary<string, int> Roles { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        public ArrivalStatistics()
        {
            this.TotalArrivals = 0;
            this.Employees = new Dictionary<string, int>();
            this.Departments = new Dictionary<string, int>();
            this.Floors = new Dictionary<string, int>();
            this.Roles = new Dictionary<string, int>();
        }
    }
}