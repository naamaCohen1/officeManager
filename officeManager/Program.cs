using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace officeManager
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string connetionString = null;
            SqlConnection connection;
            SqlCommand command;
            SqlDataReader dataReader;
            string sql = null;

            //connetionString = @"Data Source=DESKTOP-U9FO5L4;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";
            connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";
            connection = new SqlConnection(connetionString);
            try
            {
                connection.Open();
                sql = "insert into tlbEmployees (ID,Name,CarNumber,Floor,RoomNumber,Role,PermissionLevel) " +
                    "values (205666415,'Chen Tevet',7753954,11,13,'Developer',0)";
                command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();

                List<Employee> employees = new List<Employee>();
                sql = "select * from tlbEmployees where ID=205666415";
                command = new SqlCommand(sql, connection);
                dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    int ID = (int)dataReader["ID"];
                    string Name = dataReader["Name"].ToString();
                    int CarNumber = (int)dataReader["CarNumber"];
                    int Floor = (int)dataReader["Floor"];
                    int RoomNumber = (int)dataReader["RoomNumber"];
                    string Role = dataReader["Role"].ToString();
                    int PermissionLevel = (int)dataReader["PermissionLevel"];

                    employees.Add(new Employee(ID, Name, CarNumber, Floor, RoomNumber, Role, PermissionLevel));
                }
                dataReader.Close();
                command.Dispose();

                sql = "DELETE FROM tlbEmployees WHERE ID = 205666415";
                command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();

                connection.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to open connection due to: " + ex.Message);
            }

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
