using officeManager.constants;
using System;
using System.Data.SqlClient;

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
        /// Default Constructor
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

        public void GetOfficeById(string orgID)
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
                    this.OfficeCapacity = dataReader["OfficeCapacity"].ToString().Trim();
                    this.ID = dataReader["ID"].ToString().Trim();
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();
            }
            catch (Exception e)
            {
                throw new Exception("Fail to get office with ID [" + orgID + "]\n" + e.Message);
            }
        }

        private string getNumOfEmployees(string orgID)
        {
            try
            {
                string numOfEmployees = null;
                string sql = string.Format("select *  from tlbOffice WHERE id = '{0}'", orgID);
                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    numOfEmployees = dataReader["NumOfEmployees"].ToString().Trim();
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();
                return numOfEmployees;
            }
            catch (Exception e)
            {
                throw new Exception("Fail to get num of employees for Org ID [" + orgID + "]\n" + e.Message);
            }
        }

        public void IncreaseOrgEmployees(string orgID)
        {
            try
            {
                int numOfEmployees = int.Parse(getNumOfEmployees(orgID));
                updateOrgEmployees(orgID, ++numOfEmployees);
            }
            catch (Exception e)
            {
                throw new Exception("Fail to increase Num of employees for OrgID [" + orgID + "]\n" + e.Message);
            }
        }

        public void DecreaseOrgEmployees(string orgID)
        {
            try
            {
                int numOfEmployees = int.Parse(getNumOfEmployees(orgID));
                updateOrgEmployees(orgID, --numOfEmployees);
            }
            catch (Exception e)
            {
                throw new Exception("Fail to increase Num of employees for OrgID [" + orgID + "]\n" + e.Message);
            }
        }

        private void updateOrgEmployees(string orgID, int updatedNum)
        {
            try
            {
                string sql = string.Format("UPDATE tlbOffice SET NumOfEmployees = '{0}' WHERE id = '{1}'", updatedNum, orgID);
                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();
                connection.Close();
            }
            catch (Exception e)
            {
                throw new Exception("Fail to update Num of employees for OrgID [" + orgID + "]\n" + e.Message);
            }
        }
    }
}