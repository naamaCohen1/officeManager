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

        private static Statistics statistics = new Statistics();
        private static ArrivalStatistics arrivalStatistics;
        private static ArrivalStatistics arrivalStatisticsPrec;

        [HttpGet]
        public async Task<ActionResult<ArrivalStatistics>> Get()
        {
            try
            {
                arrivalStatistics = statistics.GetWeeklyActivity();
                arrivalStatisticsPrec = statistics.GetPercentages(arrivalStatistics);
                string json = JsonConvert.SerializeObject(arrivalStatistics);
                return new OkObjectResult(json);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        [HttpGet("{mapBy}")]
        public async Task<ActionResult<List<double>>> Get(string mapBy)
        {
            List<double> precentage = new List<double>();
            Dictionary<string, double> dict = arrivalStatistics.GetPrecentage(mapBy,arrivalStatisticsPrec);
            foreach (var item in dict)
            {
                precentage.Add(item.Value);
            }
            string json = JsonConvert.SerializeObject(precentage);
            return new OkObjectResult(json);
        }
    }
}