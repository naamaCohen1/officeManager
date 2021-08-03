using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //private string connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";
        private string connetionString = @"Data Source=NAAMA-DELL;Initial Catalog=OfficeManagerDB;Integrated Security=SSPI";

        /// <summary>
        /// Performs GET request to https://localhost:44375/api/users
        /// Gets all employees
        /// </summary>
        /// <returns> Returns all office's employees </returns>
        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            List<User> employees = new List<User>();
            string sql = "select * from tlbEmployees";
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    string ID = dataReader["ID"].ToString().Trim();
                    string FirstName = dataReader["FirstName"].ToString().Trim();
                    string LastName = dataReader["LastName"].ToString().Trim();
                    string CarNumber = dataReader["CarNumber"].ToString().Trim();
                    string Floor = dataReader["Floor"].ToString().Trim();
                    string RoomNumber = dataReader["RoomNumber"].ToString().Trim();
                    string Role = dataReader["Role"].ToString().Trim();
                    string PermissionLevel = dataReader["PermissionLevel"].ToString().Trim();
                    string Department = dataReader["Department"].ToString().Trim();
                    string Email = dataReader["Email"].ToString().Trim();
                    string OrgID = dataReader["OrgID"].ToString().Trim();

                    employees.Add(new User(
                        ID, FirstName, LastName, Email, CarNumber, Floor, RoomNumber, Role, PermissionLevel, Department, OrgID));
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (employees.Count == 0)
                    return new NotFoundObjectResult("No users were found");
                string json = JsonConvert.SerializeObject(employees);
                return new OkObjectResult(json);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        /// <summary>
        /// Performs GET request to https://localhost:44375/api/users/{id}
        /// Gets specific employee
        /// </summary>
        /// <param name="id"> Employee's ID </param>
        /// <returns> Returns requested employee </returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(string id)
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
                    user.CarNumber = dataReader["CarNumber"].ToString().Trim();
                    user.Floor = dataReader["Floor"].ToString().Trim();
                    user.RoomNumber = dataReader["RoomNumber"].ToString().Trim();
                    user.Role = dataReader["Role"].ToString().Trim();
                    user.PermissionLevel = dataReader["PermissionLevel"].ToString().Trim();
                    user.Department = dataReader["Department"].ToString().Trim();
                    user.Email = dataReader["Email"].ToString().Trim();
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (user.FirstName == null)
                    return new NotFoundObjectResult("User with ID [" + id + "] was not found");
                string json = JsonConvert.SerializeObject(user);
                return new OkObjectResult(json);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        /// <summary>
        /// Performs POST request to https://localhost:44375/api/users.
        /// Adding new employee to DB
        /// </summary>
        /// <param name="user"> Employee to Add as <see cref="User"/> </param>
        /// <returns> Added employee as <see cref="User"/> </returns>
        [HttpPost]
        public async Task<ActionResult<User>> Post([FromBody] User user)
        {
            string sql = string.Format("INSERT into tlbEmployees " +
                "(ID,FirstName,LastName,Email,CarNumber,Floor,RoomNumber,Role,PermissionLevel,Department,OrgID) " +
                "values ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}', '{10}')", user.ID, user.FirstName,
                user.LastName, user.Email, user.CarNumber, user.Floor, user.RoomNumber, user.Role,
                user.PermissionLevel, user.Department, user.OrgID);
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();

                user.SendWelcomeEmail(connection);
                connection.Close();

                string json = JsonConvert.SerializeObject(user);
                return Created(this.Request.Path.ToString(), json);
            }
            catch (Exception e)
            {
                return new BadRequestResult();
            }
        }

        /// <summary>
        /// Performs PUT request to https://localhost:44375/api/users/{id}
        /// </summary>
        /// <param name="updated_user"> Updated employee as <see cref="User"/> </param>
        /// <param name="id"> Employee's ID to be update </param>
        /// <returns> <see cref="IActionResult"/> </returns>
        /// <seealso cref="Get(string)"/>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] User updated_user, string id)
        {
            if (id != updated_user.ID)
                return new BadRequestResult();

            var user = Get(id);
            if (user.Result.Result.ToString().Contains("NotFoundResult"))
                return new NotFoundObjectResult("User with ID [" + id + "] was not found");
            if (!user.Result.Result.ToString().Contains("OkObjectResult"))
                return new BadRequestResult();

            string sql = string.Format("UPDATE tlbEmployees " +
                "SET ID = '{0}', FirstName = '{1}', LastName = '{2}', Email = '{3}', CarNumber = '{4}', Floor = '{5}'," +
                "RoomNumber = '{6}', Role = '{7}', PermissionLevel = '{8}', Department = '{9}' WHERE ID = {0}",
                updated_user.ID, updated_user.FirstName, updated_user.LastName, updated_user.Email, updated_user.CarNumber, updated_user.Floor,
                updated_user.RoomNumber, updated_user.Role, updated_user.PermissionLevel, updated_user.Department);
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();
                connection.Close();

                return NoContent();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        /// <summary>
        /// Performs DELETE request to https://localhost:44375/api/users/{id}
        /// </summary>
        /// <param name="id"> Employee's ID to delete </param>
        /// <returns> <see cref="IActionResult"/> </returns>
        /// <seealso cref="Get(string)"/>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = Get(id);
            if (user.Result.Result.ToString().Contains("NotFoundResult"))
                return new NotFoundObjectResult("User with ID [" + id + "] was not found");
            if (!user.Result.Result.ToString().Contains("OkObjectResult"))
                return new BadRequestResult();

            string sql = string.Format("DELETE FROM tlbEmployees WHERE ID={0}", id);
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();
                connection.Close();

                return NoContent();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}