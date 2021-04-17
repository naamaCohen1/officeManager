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
        private string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";
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
        public List<bool> CheckUserName()
        {
            List<bool> isFound = new List<bool>();
            isFound.Add( false);
            isFound.Add(false);
            string sql = string.Format("select *  from tlbEmployees where ID ={0}",password);
            SqlConnection connection = new SqlConnection(connetionString);
            SqlCommand command = new SqlCommand(sql, connection);
            SqlDataReader dataReader; 
            try
            {
                //connection = new SqlConnection(connetionString);
                connection.Open();
                //command = new SqlCommand(sql, connection);
                dataReader = command.ExecuteReader();
                if (dataReader.Read())
                {
                    isFound[0] = true;
                    string ID = dataReader["ID"].ToString();
                    string Name = dataReader["Name"].ToString();
                    Name = Name.Replace(" ",string.Empty);
                    int res = string.Compare(Name, username);
                    if (res == 0)
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
