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
      
    string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";
        //https://localhost:5001/api/search/{Id}
        //  {
        //     "date": "7.21.2021",
        //     "category": "EmployeeName",
        //     "input":"ma"
        //}

        [HttpPost("{Id}")]
        public ActionResult<string> Post(SearchObject searchObject)
        {
            try
            {
                searchObject.Date = searchObject.Date.Replace('.', '/');
                searchObject.Date = string.Format("0{0}", searchObject.Date);
                Console.WriteLine(searchObject.Date);
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
                    List<string> employees = searchObject.GetImployeeByName(searchObject.Input);
                    return new OkObjectResult(employees);
                }
                else
                {
                    return new OkResult();
                }

            }

            catch (Exception e)
            {
                //throw new Exception("Fail to search on these values " + e.Message);
                return new BadRequestResult();
            }
           
        }
    }
}
