using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Newtonsoft.Json;
using Microsoft.Web.WebPages.OAuth;
using officeManager.Controllers;
namespace officeManager
{
    public class User
    {

        //https://localhost:5001/api/users/{id}

        public string ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string CarNumber { get; set; }
        public string Floor { get; set; }
        public string RoomNumber { get; set; }
        public string Role { get; set; }
        public string PermissionLevel { get; set; }
        public string Department { get; set; }

        public User()
        {

        }

        public User(string ID, string FirstName, string LastName, string Email, string CarNumber,
            string Floor, string RoomNumber, string Role, string PermissionLevel, string Department)
        {
            this.ID = ID;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
            this.CarNumber = CarNumber;
            this.Floor = Floor;
            this.RoomNumber = RoomNumber;
            this.Role = Role;
            this.PermissionLevel = PermissionLevel;
            this.Department = Department;
        }
    }
}