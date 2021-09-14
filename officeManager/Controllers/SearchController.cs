using Microsoft.AspNetCore.Mvc;
using officeManager.Controllers.Entities;
using System;
using System.Collections.Generic;
namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        /// <summary>
        /// Performs POST request to http://officemanager.us-east-1.elasticbeanstalk.com/api/search/{orgID}/{Id}
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
            List<string> employees = null;

            try
            {
                Console.WriteLine(searchObject.Date);
                if (searchObject.Category.Equals("Floor"))
                {
                    int floor = int.Parse(searchObject.Input);
                    employees = searchObject.GetEmployeeByFloor(floor, orgID);
                    return new OkObjectResult(employees);
                }
                else if (searchObject.Category.Equals("Department"))
                {
                    employees = searchObject.GetEmployeeByDeparment(searchObject.Input, orgID);
                    return new OkObjectResult(employees);
                }
                else if (searchObject.Category.Equals("EmployeeName"))
                {
                    employees = searchObject.GetEmployeeByName(searchObject.Input, orgID);
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