using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Newtonsoft.Json;
using Microsoft.Web.WebPages.OAuth;
using officeManager.Controllers;
using officeManager.Controllers.Entities;

namespace officeManager
{
    public class User
    {
        private string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";
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
        public string OrgID { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        public User()
        {
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public User(string ID, string FirstName, string LastName, string Email, string CarNumber,
            string Floor, string RoomNumber, string Role, string PermissionLevel, string Department, string OrgID)
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
            this.OrgID = OrgID;
        }

        /// <summary>
        /// This method sends an email for the added user
        /// </summary>
        public void SendWelcomeEmail(SqlConnection connection)
        {
            string sql = string.Format("SELECT * FROM tlbOffice WHERE ID='{0}'", this.OrgID);
            string org_name = null;

            SqlCommand command = new SqlCommand(sql, connection);
            SqlDataReader dataReader = command.ExecuteReader();
            while (dataReader.Read())
            {
                org_name = dataReader["Name"].ToString().Trim();
            }
            dataReader.Close();
            command.Dispose();
            if (org_name == null)
                throw new ArgumentNullException("User email can not be null");

            GmailMessage gmailMessage = new GmailMessage();
            gmailMessage.To = this.Email;
            gmailMessage.Subject = "Welcome to " + org_name + "!";
            gmailMessage.Body = "Welcome!\n" +
                "You had just added to \"" + org_name + "\" organization.\n" +
                "in order to login to the organisation using the below link , use these details:\n" +
                "Username: " + this.Email + "\n" +
                "Password: " + this.ID + "\n" +
                "Link: https://localhost:44375/admin/login \n\n" +
                "If you have any problems, please contact your administrator.";
            new GmailController().SendMail(gmailMessage);
        }

        public void insertUserToDataBase()
        {
            try
            {
                string sql = null;
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                if(CarNumber==null)
                    sql = string.Format("insert into tlbEmployees values({0},'{1}','{2}','{3}',{4},{5},{6},'{7}','{8}',{9},{10})", ID, FirstName, LastName, Email, "NULL", Floor, RoomNumber, Role, PermissionLevel, Department, OrgID);
                  else
                    sql = string.Format("insert into tlbEmployees values({0},'{1}','{2}','{3}',{4},{5},{6},'{7}','{8}',{9},{10})", ID, FirstName, LastName, Email, CarNumber, Floor, RoomNumber, Role, PermissionLevel, Department, OrgID);
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                dataReader.Close();
                command.Dispose();
                connection.Close();
            }

            catch (Exception e)
            {
                throw new Exception("failed to insert user");
            }
            
        }

        public bool checkIfUserExistInDateBase()
        {
            try
            {
                bool isExist = false;
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                string sql = string.Format("SELECT * FROM tlbEmployees WHERE ID='{0}'", this.ID);
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                string name = null;
                while (dataReader.Read())
                {
                    name = dataReader["FirstName"].ToString().Trim();
                }
                if (name != null)
                {
                    isExist = true;

                }
                dataReader.Close();
                command.Dispose();
                connection.Close();
                return isExist;
            }

            catch (Exception e)
            {
                throw new Exception("failed to read from DB");
            }
        }
    }
}