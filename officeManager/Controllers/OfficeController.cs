using Microsoft.AspNetCore.Mvc;
using officeManager.Controllers.Entities;
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
    [Route("office")]
    [ApiController]
    public class OfficeController : ControllerBase
    {
        private string connetionString = @"Data Source=DESKTOP-U9FO5L4,1433;Initial Catalog=OfficeManagerDB;User ID=naama;Password=naama";

        //GET https://localhost:5001/api/office
        [HttpGet]
        public ActionResult<List<Office>> Get()
        {
            List<Office> offices = new List<Office>();
            string sql = "select * from tlbOffice";
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    string Name = dataReader["Name"].ToString();
                    string NumOfEmployees = dataReader["NumOfEmployees"].ToString();
                    string ParkingAmount = dataReader["ParkingAmount"].ToString();
                    string FloorsAmount = dataReader["FloorsAmount"].ToString();
                    string RoomsAmount = dataReader["RoomsAmount"].ToString();
                    string MeetingRoomsAmount = dataReader["MeetingRoomsAmount"].ToString();
                    string OfficeCapacity = dataReader["OfficeCapacity"].ToString();
                    string OpenSpace = dataReader["OpenSpace"].ToString();
                    string HotSpot = dataReader["HotSpot"].ToString();
                    string HotSpotPlaces = dataReader["HotSpotPlaces"].ToString();

                    offices.Add(new Office(Name, NumOfEmployees, ParkingAmount, FloorsAmount, 
                        RoomsAmount, MeetingRoomsAmount, OfficeCapacity, OpenSpace, HotSpot, HotSpotPlaces));
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (offices.Count == 0)
                    return NotFound();
                return new OkObjectResult(offices);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        //GET https://localhost:5001/api/office/{name}
        [HttpGet("{name}")]
        public ActionResult<Office> Get(string name)
        {
            name = name.Replace(" ", "-");
            Office office = new Office();
            string sql = string.Format("select * from tlbOffice WHERE CONVERT(VARCHAR, Name) = '{0}'", name);
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    office.Name = dataReader["Name"].ToString();
                    office.NumOfEmployees = dataReader["NumOfEmployees"].ToString();
                    office.ParkingAmount = dataReader["ParkingAmount"].ToString();
                    office.FloorsAmount = dataReader["FloorsAmount"].ToString();
                    office.RoomsAmount = dataReader["RoomsAmount"].ToString();
                    office.MeetingRoomsAmount = dataReader["MeetingRoomsAmount"].ToString();
                    office.OfficeCapacity = dataReader["OfficeCapacity"].ToString();
                    office.OpenSpace = dataReader["OpenSpace"].ToString();
                    office.HotSpot = dataReader["HotSpot"].ToString();
                    office.HotSpotPlaces = dataReader["HotSpotPlaces"].ToString();
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (office.Name == null)
                    return NotFound();
                return new OkObjectResult(office);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }


        //POST https://localhost:5001/api/office
        [HttpPost]
        public ActionResult<Office> Post([FromBody] Office office)
        {
            string sql = string.Format("INSERT into tlbOffice (Name,NumOfEmployees,ParkingAmount," +
                "FloorsAmount,RoomsAmount,MeetingRoomsAmount,OfficeCapacity,OpenSpace,HotSpot,HotSpotPlaces) " +
                "values ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}')",
                office.Name, office.NumOfEmployees, office.ParkingAmount, office.FloorsAmount, office.RoomsAmount,
                office.MeetingRoomsAmount, office.OfficeCapacity, office.OpenSpace,
                office.HotSpot, office.HotSpotPlaces);
            try
            {
                SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();
                connection.Close();

                return Created(this.Request.Path.ToString(), office);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        //PUT https://localhost:5001/api/office/{name}
        [HttpPut("{name}")]
        public IActionResult Put([FromBody] Office updated_office, string name)
        {
            var office = Get(name);
            if (office.Result.ToString().Contains("NotFoundResult"))
                return NotFound();
            if (!office.Result.ToString().Contains("OkObjectResult"))
                return new BadRequestResult();

            string sql = string.Format("UPDATE tlbOffice " +
                "SET NumOfEmployees = '{0}', ParkingAmount = '{1}', FloorsAmount = '{2}', RoomsAmount = '{3}'," +
                "MeetingRoomsAmount = '{4}', OfficeCapacity = '{5}', OpenSpace = '{6}', HotSpot = '{7}'," +
                "HotSpotPlaces = '{8}', Name = '{9}' WHERE CONVERT(VARCHAR, Name) = '{10}'",
            updated_office.NumOfEmployees, updated_office.ParkingAmount, updated_office.FloorsAmount, updated_office.RoomsAmount,
                updated_office.MeetingRoomsAmount, updated_office.OfficeCapacity, updated_office.OpenSpace,
                updated_office.HotSpot, updated_office.HotSpotPlaces, updated_office.Name, name);
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
            catch (Exception e)
            {
                return new BadRequestResult();
            }
        }

        //DELETE https://localhost:5001/api/office/{name}
        [HttpDelete("{name}")]
        public IActionResult Delete(string name)
        {
            var office = Get(name);
            if (office.Result.ToString().Contains("NotFoundResult"))
                return NotFound();
            if (!office.Result.ToString().Contains("OkObjectResult"))
                return new BadRequestResult();

            name = name.Replace(" ", "-");
            string sql = string.Format("DELETE FROM tlbOffice WHERE CONVERT(VARCHAR, Name) = '{0}'", name);
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
