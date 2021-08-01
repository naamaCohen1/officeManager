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
        private string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";

        private Statistics statistics = new Statistics();

        /// <summary>
        /// This method gets the Calendar activity according to the previous requested days
        /// </summary>
        /// <param name="daysAgo"> Amount of days to get the data about </param>
        /// <returns>Arrival data as <see cref="ArrivalStatistics"/></returns>
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

        /// <summary>
        /// This method gets the employees' names of the given employees' IDs
        /// </summary>
        /// <param name="ids"> IDs to get their names</param>
        /// <returns>List of requested employees names </returns>
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

        /// <summary>
        /// This method gets a requested user
        /// </summary>
        /// <param name="id"> User ID to get </param>
        /// <returns> Requested user as <see cref="User"/></returns>
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