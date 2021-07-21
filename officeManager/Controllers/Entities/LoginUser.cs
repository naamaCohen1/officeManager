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
    public  class LoginUser
    {

        //https://localhost:5001/api/login
        private string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";
        public string Username { get; set; }
        public string Password { get; set; }
       // private static CodeGrantOauth _tokens = null;
        public LoginUser(string username, string password)
        {
            this.Username = username;
            this.Password = password;
        }
        public LoginUser()
        {

        }
        public List<bool> CheckUserName()
        {
            List<bool> isFound = new List<bool>() {false, false };
            string sql = string.Format("select *  from tlbEmployees where ID ={0}",Password);
            SqlConnection connection = new SqlConnection(connetionString);
            SqlCommand command = new SqlCommand(sql, connection);
            SqlDataReader dataReader; 
            try
            {
                connection.Open();
                dataReader = command.ExecuteReader();
                if (dataReader.Read())
                {
                    isFound[0] = true;
                    string ID = dataReader["ID"].ToString();
                    string FirstName = dataReader["FirstName"].ToString().Trim();
                    string LastName = dataReader["LastName"].ToString().Trim();

                    string Name = FirstName + " " + LastName;
                    if (string.Compare(Name, Username) == 0)
                        isFound[1] = true;
                }

                dataReader.Close();
                command.Dispose();
                connection.Close();
                return isFound;

            }

            catch (Exception)
            {
                command.Dispose();
                connection.Close();
            }
            return isFound;
        }

        public bool AddUser()
        {
            return true;
        }
    }
}
