using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager.Controllers.Entities
{
    public class ArrivalStatistics
    {
        public Dictionary<string, double> Employees { get; set; }
        public Dictionary<string, double> Departments { get; set; }
        public Dictionary<string, double> Floors { get; set; }
        public Dictionary<string, double> Roles { get; set; }
        public int TotalArrivals { get; set; }


        public ArrivalStatistics()
        {
            this.TotalArrivals = 0;
            this.Employees = new Dictionary<string, double>();
            this.Departments = new Dictionary<string, double>();
            this.Floors = new Dictionary<string, double>();
            this.Roles = new Dictionary<string, double>();
        }

        public Dictionary<string, double> GetPrecentage(string mapBy, ArrivalStatistics precentage)
        {
            switch (mapBy.ToLower()) {
                case "totalarrivals":
                    Dictionary<string, double> arraival = new Dictionary<string, double>();
                    arraival.Add("TotalArrivals", precentage.TotalArrivals);
                    return arraival;
                case "employees":
                    return precentage.Employees;
                case "departments":
                    return precentage.Departments;
                case "floors":
                    return precentage.Floors;
                case "roles":
                    return precentage.Roles;

                default:
                    throw new ArgumentException("Invalid mappaing value - " + mapBy);
            }
        }
    }
}