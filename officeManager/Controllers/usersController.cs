using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.IO;
using System.Threading.Tasks;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private string connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";

        //GET https://localhost:44375/api/users
        [HttpGet]
        public ActionResult<List<User>> Get()
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
                    string ID = dataReader["ID"].ToString();
                    string Name = dataReader["Name"].ToString();
                    string CarNumber = dataReader["CarNumber"].ToString();
                    string Floor = dataReader["Floor"].ToString();
                    string RoomNumber = dataReader["RoomNumber"].ToString();
                    string Role = dataReader["Role"].ToString();
                    string PermissionLevel = dataReader["PermissionLevel"].ToString();

                    employees.Add(new User(ID, Name, CarNumber, Floor, RoomNumber, Role, PermissionLevel));
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (employees.Count == 0)
                    return new NotFoundObjectResult("No users were found");
                return new OkObjectResult(employees);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        //GET https://localhost:44375/api/users/{id}
        [HttpGet("{id}")]
        public ActionResult<User> Get(string id)
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
                    user.ID = dataReader["ID"].ToString();
                    user.Name = dataReader["Name"].ToString();
                    user.CarNumber = dataReader["CarNumber"].ToString();
                    user.Floor = dataReader["Floor"].ToString();
                    user.RoomNumber = dataReader["RoomNumber"].ToString();
                    user.Role = dataReader["Role"].ToString();
                    user.PermissionLevel = dataReader["PermissionLevel"].ToString();
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (user.Name == null)
                return new NotFoundObjectResult("User with ID [" + id + "] was not found");
                return new OkObjectResult(user);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        //POST https://localhost:44375/api/users
        [HttpPost]
        public ActionResult<User> Post([FromBody] User user)
        {
            string sql = string.Format("INSERT into tlbEmployees " +
                "(ID,Name,CarNumber,Floor,RoomNumber,Role,PermissionLevel) " +
                "values ('{0}','{1}','{2}','{3}','{4}','{5}','{6}')", user.ID, user.Name, user.CarNumber,
                user.Floor, user.RoomNumber, user.Role, user.PermissionLevel);
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();
                connection.Close();

                return Created(this.Request.Path.ToString(), user);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        //PUT https://localhost:44375/api/users/{id}
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] User updated_user, string id)
        {
            if (id != updated_user.ID)
                return new BadRequestResult();
            
            var user = Get(id);
            if (user.Result.ToString().Contains("NotFoundResult"))
                return new NotFoundObjectResult("User with ID ["+id+"] was not found");
            if (!user.Result.ToString().Contains("OkObjectResult"))
                return new BadRequestResult();
            
            string sql = string.Format("UPDATE tlbEmployees " +
                "SET ID = '{0}', Name = '{1}', CarNumber = '{2}', Floor = '{3}'," +
                "RoomNumber = '{4}', Role = '{5}', PermissionLevel = '{6}' WHERE ID = {0}",
                updated_user.ID, updated_user.Name, updated_user.CarNumber, updated_user.Floor, 
                updated_user.RoomNumber, updated_user.Role, updated_user.PermissionLevel);
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

        //DELETE https://localhost:44375/api/users/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var user = Get(id);
            if (user.Result.ToString().Contains("NotFoundResult"))
                return new NotFoundObjectResult("User with ID ["+id+"] was not found");
            if (!user.Result.ToString().Contains("OkObjectResult"))
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
