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

        //https://localhost:44375/api/users/{id}

        public string ID { get; set; }
        public string Name { get; set; }
        public string CarNumber { get; set; }
        public string Floor { get; set; }
        public string RoomNumber { get; set; }
        public string Role { get; set; }
        public string PermissionLevel { get; set; }

        public User()
        {

        }

        public User(string ID, string Name, string CarNumber, string Floor, string RoomNumber, string Role, string PermissionLevel)
        {
            this.ID = ID;
            this.Name = Name;
            this.CarNumber = CarNumber;
            this.Floor = Floor;
            this.RoomNumber = RoomNumber;
            this.Role = Role;
            this.PermissionLevel = PermissionLevel;
        }
    }
}
