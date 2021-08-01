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
        private string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";

        /// <summary>
        /// Performs POST request to https://localhost:44375/api/search/{Id}
        /// Gets employees names according to the requested filter
        /// </summary>
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
        /// <seealso cref="SearchObject.GetImployeeByFloor(int)"/>
        /// <seealso cref="SearchObject.GetImployeeByDeparment(string)"/>
        /// <seealso cref="SearchObject.GetEmployeeByName(string)"/>
        [HttpPost("{Id}")]
        public ActionResult<string> Post(string id, SearchObject searchObject)
        {
            searchObject.Id = id.Replace("\"", "");
            try
            {
                if (searchObject.Category.Equals("Floor"))
                {
                    int floor = int.Parse(searchObject.Input);
                    List<string> employees = searchObject.GetImployeeByFloor(floor);
                    return new OkObjectResult(employees);
                }
                else if (searchObject.Category.Equals("Department"))
                {
                    List<string> employees = searchObject.GetImployeeByDeparment(searchObject.Input);
                    return new OkObjectResult(employees);
                }
                else if (searchObject.Category.Equals("EmployeeName"))
                {
                    List<string> employees = searchObject.GetEmployeeByName(searchObject.Input);
                    return new OkObjectResult(employees);
                }
                else
                {
                    return new OkResult();
                }
            }
            catch (Exception e)
            {
                //throw new Exception();
                return new BadRequestObjectResult("Fail to search on these values " + e.Message);
            }
        }
    }
}