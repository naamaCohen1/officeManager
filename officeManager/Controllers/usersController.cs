using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;


namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("users")]
    [ApiController]
    public class usersController : ControllerBase
    {
        private string connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";

        //GET https://localhost:44375/api/users
        [HttpGet]
        public ActionResult<List<Employee>> Get()
        {
            List<Employee> employees = new List<Employee>();
            string sql = "select * from tlbEmployees";
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    int ID = (int)dataReader["ID"];
                    string Name = dataReader["Name"].ToString();
                    int CarNumber = (int)dataReader["CarNumber"];
                    int Floor = (int)dataReader["Floor"];
                    int RoomNumber = (int)dataReader["RoomNumber"];
                    string Role = dataReader["Role"].ToString();
                    int PermissionLevel = (int)dataReader["PermissionLevel"];

                    employees.Add(new Employee(ID, Name, CarNumber, Floor, RoomNumber, Role, PermissionLevel));
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (employees.Count == 0)
                    return NotFound();
                return Ok(employees);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        //GET https://localhost:44375/api/users/{id}
        [HttpGet("{id}")]
        public ActionResult<Employee> Get(string id)
        {
            string sql = string.Format("select * from tlbEmployees where ID={0}", id);
            var employee = new Employee();
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    employee.ID = (int)dataReader["ID"];
                    employee.Name = dataReader["Name"].ToString();
                    employee.CarNumber = (int)dataReader["CarNumber"];
                    employee.Floor = (int)dataReader["Floor"];
                    employee.RoomNumber = (int)dataReader["RoomNumber"];
                    employee.Role = dataReader["Role"].ToString();
                    employee.PermissionLevel = (int)dataReader["PermissionLevel"];
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (employee.Name == null)
                    return NotFound();
                return Ok(employee);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        //POST https://localhost:44375/api/users
        [HttpPost]
        public ActionResult<Employee> Post([FromBody] User user)
        {
            string sql = string.Format("insert into tlbEmployees " +
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
                return BadRequest();
            }
        }

        //PUT https://localhost:44375/api/users/{id}
        [HttpPut("{id}")]
        public ActionResult<Employee> Put([FromBody] User user, string id)
        {
            if (id != user.ID)
                return BadRequest();
            
            var employee = Get(id);
           
            if (employee.Result.ToString().Contains("NotFoundResult"))
                return NotFound();
            if (!employee.Result.ToString().Contains("OkObjectResult"))
                return BadRequest();
            
            string sql = string.Format("UPDATE tlbEmployees " +
                "SET ID = '{0}', Name = '{1}', CarNumber = '{2}', Floor = '{3}'," +
                "RoomNumber = '{4}', Role = '{5}', PermissionLevel = '{6}' WHERE ID = {0}",
                user.ID, user.Name, user.CarNumber, user.Floor, user.RoomNumber, user.Role, user.PermissionLevel);
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
                return BadRequest();
            }
        }

        //DELETE https://localhost:44375/api/users/{id}
        [HttpDelete("{id}")]
        public ActionResult<Employee> Delete(string id)
        {
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
                return BadRequest();
            }
        }
    }
}
