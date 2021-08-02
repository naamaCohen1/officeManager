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
    public class LoginUser
    {

        //https://localhost:44375/api/login
        //private string connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";
        private string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";

        public string Username { get; set; }
        public string Password { get; set; }

        public LoginUser(string username, string password)
        {
            this.Username = username;
            this.Password = password;
        }

        public LoginUser()
        {
        }

        public List<bool> CheckUsername()
        {
            List<bool> isFound = new List<bool>() { false, false };
            string sql = string.Format("select *  from tlbEmployees where ID ={0}", Password);
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
                    string Email = dataReader["Email"].ToString().Trim();

                    if (string.Compare(Email.ToLower(), Username.ToLower()) == 0)
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

        public string GetUserPermission()
        {
            string permission = null;
            string sql = string.Format("select *  from tlbEmployees where ID ={0}", Password);
            SqlConnection connection = new SqlConnection(connetionString);
            SqlCommand command = new SqlCommand(sql, connection);
            SqlDataReader dataReader;
            try
            {
                connection.Open();
                dataReader = command.ExecuteReader();
                if (dataReader.Read())
                {
                    permission = dataReader["PermissionLevel"].ToString();
                }

                dataReader.Close();
                command.Dispose();
                connection.Close();
            }
            catch (Exception)
            {
                command.Dispose();
                connection.Close();
            }
            return permission;
        }

        public bool AddUser()
        {
            return true;
        }
    }
}
