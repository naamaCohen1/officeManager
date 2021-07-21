using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using officeManager.Controllers.Entities;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("statistics")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private string connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";

        private Statistics statistics = new Statistics();

        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            try
            {
                ArrivalStatistics arrivalStatistics = statistics.GetWeeklyActivity();
                string json = JsonConvert.SerializeObject(arrivalStatistics);
                return new OkObjectResult(json);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

    }
}