using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Data.SqlClient;

namespace officeManager
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string connetionString = @"Data Source=DESKTOP-U9FO5L4;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";
            SqlConnection connection = new SqlConnection(connetionString);
            connection.Open();
            string sql = "select * from tlbEmployees"; 
            SqlCommand command = new SqlCommand(sql, connection);
            SqlDataReader dataReader = command.ExecuteReader();
            while (dataReader.Read())
            {
                Console.WriteLine (dataReader.GetValue(0) + " - " + dataReader.GetValue(1) + " - " + dataReader.GetValue(2));
            }
            dataReader.Close();
            command.Dispose();
            connection.Close();
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
