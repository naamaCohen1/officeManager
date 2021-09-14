using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;
using LumenWorks.Framework.IO.Csv;
using System.Data;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("upload")]
    [ApiController]
    public class uploadController : ControllerBase
    {
        /// <summary>
        /// This methos reads the given file and creates new employees
        /// </summary>
        /// <param name="file"> File to read</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<string> Post(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return new NoContentResult();

                var path = Path.Combine(
                            Directory.GetCurrentDirectory(),
                            file.FileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                var csvTable = new DataTable();
                using (var csvReader = new CsvReader(new StreamReader(System.IO.File.OpenRead(path)), true))
                {
                    csvTable.Load(csvReader);
                }
                List<User> employees = new List<User>();
                for (int i = 0; i < csvTable.Rows.Count; i++)
                {
                    User employee = new User
                    {
                        ID = csvTable.Rows[i][0].ToString().Trim('\t'),
                        FirstName = csvTable.Rows[i][1].ToString().Trim('\t'),
                        LastName = csvTable.Rows[i][2].ToString().Trim('\t'),
                        Email = csvTable.Rows[i][3].ToString().Trim('\t'),
                        CarNumber = csvTable.Rows[i][4].ToString().Trim('\t'),
                        Floor = csvTable.Rows[i][5].ToString().Trim('\t'),
                        RoomNumber = csvTable.Rows[i][6].ToString().Trim('\t'),
                        Role = csvTable.Rows[i][7].ToString().Trim('\t'),
                        PermissionLevel = csvTable.Rows[i][8].ToString().Trim('\t'),
                        Department = csvTable.Rows[i][9].ToString().Trim('\t'),
                        OrgID = csvTable.Rows[i][10].ToString().Trim('\t')
                    };
                    if (string.IsNullOrEmpty(employee.CarNumber))
                        employee.CarNumber = null;
                    if (employee.CheckIfUserExistInDateBase() == false)
                        employee.InsertUserToDataBase();
                }

                return new OkResult();
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }
    }
}