using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using officeManager.Controllers.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        /// <summary>
        /// Performs POST request to https://localhost:44375/api/search/{orgID}/{Id}
        /// Gets employees names according to the requested filter
        /// </summary>
        /// <param name="orgID"> Organization ID </param>
        /// <param name="id"> Logged in user ID </param>
        /// <param name="searchObject"> Filter to search the users according to as <see cref="SearchObject"/>
        /// For example:
        /// <code>
        /// {
        ///     "date": "7.21.2021",
        ///     "category": "EmployeeName",
        ///     "input":"ma"
        /// }
        /// </code>
        /// </param>
        /// <returns>Requested users as string</returns>
        /// <seealso cref="SearchObject.GetEmployeeByFloor(int, string)"/>
        /// <seealso cref="SearchObject.GetEmployeeByDeparment(string, string)"/>
        /// <seealso cref="SearchObject.GetEmployeeByName(string, string)"/>
        [HttpPost("{orgID}/{Id}")]
        public ActionResult<string> Post(string orgID, string id, SearchObject searchObject)
        {
            searchObject.Id = id.Replace("\"", "");
            try
            {
                Console.WriteLine(searchObject.Date);
                if (searchObject.Category.Equals("Floor"))
                {
                    int floor = int.Parse(searchObject.Input);
                    List<string> employees = searchObject.GetEmployeeByFloor(floor,orgID);
                    return new OkObjectResult(employees);
                }
                else if (searchObject.Category.Equals("Department"))
                {
                    List<string> employees = searchObject.GetEmployeeByDeparment(searchObject.Input,orgID);
                    return new OkObjectResult(employees);
                }
                else if (searchObject.Category.Equals("EmployeeName"))
                {
                    List<string> employees = searchObject.GetEmployeeByName(searchObject.Input,orgID);
                    return new OkObjectResult(employees);
                }
                else
                {
                    return new OkResult();
                }
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult("Fail to search on these values " + e.Message);
            }
        }
    }
}