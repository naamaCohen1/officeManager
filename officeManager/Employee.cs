using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager
{
    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int CarNumber { get; set; }
        public int Floor { get; set; }
        public int RoomNumber { get; set; }
        public string Role { get; set; }
        public int PermissionLevel { get; set; }

        public Employee() { }

        public Employee(int ID, string Name, int CarNumber, int Floor, int RoomNumber, string Role, int PermissionLevel)
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
