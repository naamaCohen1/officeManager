﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager.Controllers.Entities
{
    public class ArrivalStatistics
    {
        public int TotalArrivals { get; set; }
        public Dictionary<string, int> Employees { get; set; }
        public Dictionary<string, int> Departments { get; set; }
        public Dictionary<string, int> Floors { get; set; }
        public Dictionary<string, int> Roles { get; set; }

        public ArrivalStatistics()
        {
            this.TotalArrivals = 0;
            this.Employees = new Dictionary<string, int>();
            this.Departments = new Dictionary<string, int>();
            this.Floors = new Dictionary<string, int>();
            this.Roles = new Dictionary<string, int>();
        }

        //public ArrivalStatistics GetPercentages(ArrivalStatistics arrivalStatistics)
        //{
        //    ArrivalStatistics precentage = new ArrivalStatistics();
        //    precentage.Employees = calcPrecentage(arrivalStatistics.Employees);
        //    precentage.Departments = calcPrecentage(arrivalStatistics.Departments);
        //    precentage.Floors = calcPrecentage(arrivalStatistics.Floors);
        //    precentage.Roles = calcPrecentage(arrivalStatistics.Roles);

        //    return precentage;
        //}

        //private Dictionary<string, int> calcPrecentage(Dictionary<string, int> pairs)
        //{
        //    Dictionary<string, int> dictionary = new Dictionary<string, int>();
        //    foreach (var item in pairs)
        //    {
        //        dictionary.Add(item.Key, (item.Value / TotalArrivals));
        //    }

        //    return dictionary;
        //}
    }
}