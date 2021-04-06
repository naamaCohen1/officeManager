using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;


namespace officeManager
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //string connetionString;
            //SqlConnection cnn;
            //connetionString = @"Data Source=DESKTOP-U9FO5L4";
            //connetionString = @"Data Source=DESKTOP-U9FO5L4;Initial Catalog=Demodb;User ID=DESKTOP-U9FO5L4\Chen;Password=demol23";
            //cnn = new SqlConnection(connetionString);
            //cnn.Open();
            //cnn.Close();
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
