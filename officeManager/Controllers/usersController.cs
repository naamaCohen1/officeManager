using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Newtonsoft.Json;
using officeManager.constants;
using officeManager.Controllers.Entities;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        /// <summary>
        /// Performs GET request to http://officemanager.us-east-1.elasticbeanstalk.com/api/users/
        /// Gets all employees 
        /// </summary>
        /// <returns> Returns all employees </returns>
        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            List<User> employees = new List<User>();
            string sql = string.Format("select * from tlbEmployees");
            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
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
        /// Performs GET request to http://officemanager.us-east-1.elasticbeanstalk.com/api/users/{orgID}
        /// Gets all employees of specific orgID
        /// </summary>
        /// <param name="orgID"> Organization ID </param>
        /// <returns> Returns all office's employees </returns>
        [HttpGet("{orgID}")]
        public async Task<ActionResult<List<User>>> Get(string orgID)
        {
            List<User> employees = new List<User>();
            string sql = string.Format("select * from tlbEmployees where OrgID={0}", orgID);
            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
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
        /// Performs GET request to http://officemanager.us-east-1.elasticbeanstalk.com/api/users/{orgID}/{id}
        /// Gets specific employee
        /// </summary>
        /// <param name="orgID"> Organization ID </param>
        /// <param name="id"> Employee's ID </param>
        /// <returns> Returns requested employee </returns>
        [HttpGet("{orgID}/{id}")]
        public async Task<ActionResult<User>> Get(string orgID, string id)
        {
            string sql = string.Format("select * from tlbEmployees where ID={0} and OrgID={1}", id, orgID);
            var user = new User();
            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
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
        /// Performs POST request to http://officemanager.us-east-1.elasticbeanstalk.com/api/users/.
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
                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();
                new Office().IncreaseOrgEmployees(user.OrgID);
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
        /// Performs PUT request to http://officemanager.us-east-1.elasticbeanstalk.com/api/users/{orgID}/{id}
        /// </summary>
        /// <param name="updated_user"> Updated employee as <see cref="User"/> </param>
        /// <param name="orgID"> Organization ID </param>
        /// <param name="id"> Employee's ID to be update </param>
        /// <returns> <see cref="IActionResult"/> </returns>
        /// <seealso cref="Get(string, string)"/>
        [HttpPut("{orgID}/{id}")]
        public async Task<IActionResult> Put([FromBody] User updated_user, string id, string orgID)
        {
            if (id != updated_user.ID)
                return new BadRequestResult();

            var user = Get(orgID, id);
            if (user.Result.Result.ToString().Contains("NotFoundResult"))
                return new NotFoundObjectResult("User with ID [" + id + "] was not found");
            if (!user.Result.Result.ToString().Contains("OkObjectResult"))
                return new BadRequestResult();

            if (updated_user.PermissionLevel.ToUpper().Contains("ADMINISTRATOR"))
                updated_user.PermissionLevel = "0";
            else if (updated_user.PermissionLevel.ToUpper().Contains("STANDARD"))
                updated_user.PermissionLevel = "1";

            string sql = string.Format("UPDATE tlbEmployees " +
                "SET ID = '{0}', FirstName = '{1}', LastName = '{2}', Email = '{3}', CarNumber = '{4}', Floor = '{5}'," +
                "RoomNumber = '{6}', Role = '{7}', PermissionLevel = '{8}', Department = '{9}' WHERE ID = {0} and OrgID={10}",
                updated_user.ID, updated_user.FirstName, updated_user.LastName, updated_user.Email, updated_user.CarNumber, updated_user.Floor,
                updated_user.RoomNumber, updated_user.Role, updated_user.PermissionLevel, updated_user.Department, orgID);
            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
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
        /// Performs DELETE request to http://officemanager.us-east-1.elasticbeanstalk.com/api/users/{orgID}/{id}
        /// </summary>
        /// <param name="orgID"> Organization ID </param>
        /// <param name="id"> Employee's ID to delete </param>
        /// <returns> <see cref="IActionResult"/> </returns>
        /// <seealso cref="Get(string, string)"/>
        [HttpDelete("{orgID}/{id}")]
        public async Task<IActionResult> Delete(string orgID, string id)
        {
            string sql = null;
            SqlCommand command = null;
            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();

                if (orgID.Equals("null"))
                {
                    sql = string.Format("select * from tlbEmployees");
                    command = new SqlCommand(sql, connection);
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        string ID = dataReader["ID"].ToString().Trim();
                        if (ID.Equals(id))
                        {
                            orgID = dataReader["OrgID"].ToString().Trim();
                            break;
                        }
                    }
                    dataReader.Close();
                    command.Dispose();
                }
                var user = Get(orgID, id);
                if (user.Result.Result.ToString().Contains("NotFoundResult"))
                    return new NotFoundObjectResult("User with ID [" + id + "] was not found");
                if (!user.Result.Result.ToString().Contains("OkObjectResult"))
                    return new BadRequestResult();

                sql = string.Format("DELETE FROM tlbEmployees WHERE ID={0} and OrgID={1}", id, orgID);
                command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();
                connection.Close();

                new Office().DecreaseOrgEmployees(orgID);
                return NoContent();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}