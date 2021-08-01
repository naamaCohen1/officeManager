using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using officeManager.Controllers.Entities;
using System.Data.SqlClient;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("statistics")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        //private string connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";
        string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";

        private Statistics statistics = new Statistics();

        [HttpGet("{daysAgo}")]
        public ActionResult<List<User>> Get(string daysAgo)
        {
            try
            {
                int intDaysAgo = int.Parse(daysAgo);
                ArrivalStatistics arrivalStatistics = statistics.GetLastActivities(intDaysAgo);
                string json = JsonConvert.SerializeObject(arrivalStatistics);
                return new OkObjectResult(json);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        [HttpPost]
        public ActionResult<List<string>> Post([FromBody] string[] ids)
        {
            List<string> names = new List<string>();
            try
            {
                foreach (string id in ids)
                {
                    var user = getUser(id.Trim());
                    names.Add(user.FirstName + " " + user.LastName);
                }

                string json = JsonConvert.SerializeObject(names);
                return new OkObjectResult(json);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        private User getUser(string id)
        {
            string sql = string.Format("select * from tlbEmployees where ID={0}", id);
            var user = new User();
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    user.ID = dataReader["ID"].ToString().Trim();
                    user.FirstName = dataReader["FirstName"].ToString().Trim();
                    user.LastName = dataReader["LastName"].ToString().Trim();
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                return user;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}