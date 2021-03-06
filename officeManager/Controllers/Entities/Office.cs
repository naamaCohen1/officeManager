using officeManager.constants;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager.Controllers.Entities
{
    public class Office
    {
        public string Name { get; set; }
        public string NumOfEmployees { get; set; }
        public string ParkingAmount { get; set; }
        public string FloorsAmount { get; set; }
        public string RoomsAmount { get; set; }
        public string MeetingRoomsAmount { get; set; }
        public string OfficeCapacity { get; set; }
        public string OpenSpace { get; set; }
        public string HotSpot { get; set; }
        public string HotSpotPlaces { get; set; }
        public string ID { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        public Office()
        {
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public Office(string Name, string NumOfEmployees, string ParkingAmount, string FloorsAmount,
            string RoomsAmount, string MeetingRoomsAmount, string OfficeCapacity,
            string OpenSpace, string HotSpot, string HotSpotPlaces, string Id)
        {
            this.Name = Name;
            this.NumOfEmployees = NumOfEmployees;
            this.ParkingAmount = ParkingAmount;
            this.FloorsAmount = FloorsAmount;
            this.RoomsAmount = RoomsAmount;
            this.MeetingRoomsAmount = MeetingRoomsAmount;
            this.OfficeCapacity = OfficeCapacity;
            this.OpenSpace = OpenSpace;
            this.HotSpot = HotSpot;
            this.HotSpotPlaces = HotSpotPlaces;
            this.ID = Id;
        }
        public void getOfficeFromUser(string orgID)
        {
            try
            {
                string sql = string.Format("select *  from tlbOffice WHERE id = '{0}' ", orgID);
                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    this.ParkingAmount = dataReader["ParkingAmount"].ToString().Trim();
                    this.OfficeCapacity= dataReader["OfficeCapacity"].ToString().Trim();
                    this.ID = dataReader["ID"].ToString().Trim();
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();
            }
            catch (Exception e)
            {
                throw new Exception("Fail to enter DB " + e.Message);
            }
            
        }

    }
}
