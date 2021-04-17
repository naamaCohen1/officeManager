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

        //https://localhost:44375/api/login

        public string username { get; set; }
        public string password { get; set; }
       // private static CodeGrantOauth _tokens = null;
        public LoginUser(string username, string password)
        {
            this.username = username;
            this.password = password;
        }
        public LoginUser()
        {

        }
        public bool CheckUserName()
        {

            string connetionString = null;
            SqlConnection connection;
            SqlCommand command;
            SqlDataReader dataReader;
            string sql = null;

            connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";
            connection = new SqlConnection(connetionString);
            connection.Open();
            sql = string.Format("select * from tlbEmployees where Name = {0}", username);
            command = new SqlCommand(sql, connection);
            dataReader = command.ExecuteReader();
            while (dataReader.Read())
            {
                string ID = dataReader["ID"].ToString();
                string Name = dataReader["Name"].ToString();
            }
            dataReader.Close();
            command.Dispose();
            //List<Employee> employees = new List<Employee>();
            //sql = "select * from tlbEmployees where ID=205666415";
            //command = new SqlCommand(sql, connection);
            //dataReader = command.ExecuteReader();
            //while (dataReader.Read())
            //{
            //    int ID = (int)dataReader["ID"];
            //    string Name = dataReader["Name"].ToString();
            //    int CarNumber = (int)dataReader["CarNumber"];
            //    int Floor = (int)dataReader["Floor"];
            //    int RoomNumber = (int)dataReader["RoomNumber"];
            //    string Role = dataReader["Role"].ToString();
            //    int PermissionLevel = (int)dataReader["PermissionLevel"];

            //    employees.Add(new Employee(ID, Name, CarNumber, Floor, RoomNumber, Role, PermissionLevel));
            //}
            //dataReader.Close();
            //command.Dispose();

            //connection.Close();

            return true;

        }
    }
}
