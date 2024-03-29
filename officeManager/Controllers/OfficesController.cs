﻿using Microsoft.AspNetCore.Mvc;
using officeManager.Controllers.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Newtonsoft.Json;
using officeManager.constants;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("offices")]
    [ApiController]
    public class OfficesController : ControllerBase
    {
        /// <summary>
        /// Performs GET request to http://officemanager.us-east-1.elasticbeanstalk.com/api/offices
        /// Gets all offices in DB
        /// </summary>
        /// <returns> List of offices as <see cref="Office"/></returns>
        [HttpGet]
        public async Task<ActionResult<List<Office>>> Get()
        {
            List<Office> offices = new List<Office>();
            string sql = "select * from tlbOffice";
            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    string name = dataReader["Name"].ToString();
                    string numOfEmployees = dataReader["NumOfEmployees"].ToString();
                    string parkingAmount = dataReader["ParkingAmount"].ToString();
                    string floorsAmount = dataReader["FloorsAmount"].ToString();
                    string roomsAmount = dataReader["RoomsAmount"].ToString();
                    string meetingRoomsAmount = dataReader["MeetingRoomsAmount"].ToString();
                    string officeCapacity = dataReader["OfficeCapacity"].ToString();
                    string openSpace = dataReader["OpenSpace"].ToString();
                    string hotSpot = dataReader["HotSpot"].ToString();
                    string hotSpotPlaces = dataReader["HotSpotPlaces"].ToString();
                    string id = dataReader["ID"].ToString();

                    offices.Add(new Office(name, numOfEmployees, parkingAmount, floorsAmount,
                        roomsAmount, meetingRoomsAmount, officeCapacity, openSpace, hotSpot, hotSpotPlaces, id));
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (offices.Count == 0)
                    return NotFound();
                string json = JsonConvert.SerializeObject(offices);
                return new OkObjectResult(json);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        /// <summary>
        /// Performs GET request to http://officemanager.us-east-1.elasticbeanstalk.com/api/offices/{id}
        /// Gets a specific organizations
        /// </summary>
        /// <param name="id"> Organization ID to get </param>
        /// <returns>Requested organization as <see cref="Office"/></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Office>> Get(string id)
        {
            Office office = new Office();
            string sql = string.Format("select * from tlbOffice WHERE CONVERT(VARCHAR, ID) = '{0}'", id);
            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
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
                    office.ID = dataReader["ID"].ToString();
                }
                dataReader.Close();
                command.Dispose();
                connection.Close();

                if (office.ID == null)
                    return NotFound();
                string json = JsonConvert.SerializeObject(office);
                return new OkObjectResult(json);
            }
            catch (Exception e)
            {
                return new BadRequestResult();
            }
        }

        /// <summary>
        /// Performs POST request to http://officemanager.us-east-1.elasticbeanstalk.com/api/offices
        /// Add new organization to DB
        /// </summary>
        /// <param name="office">Organization to add as <see cref="Office"/></param>
        /// <returns>Created organization</returns>
        [HttpPost]
        public async Task<ActionResult<Office>> Post([FromBody] Office office)
        {
            string sql = string.Format("INSERT into tlbOffice (Name,NumOfEmployees,ParkingAmount," +
                "FloorsAmount,RoomsAmount,MeetingRoomsAmount,OfficeCapacity,OpenSpace,HotSpot,HotSpotPlaces,ID) " +
                "values ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}')",
                office.Name, office.NumOfEmployees, office.ParkingAmount, office.FloorsAmount, office.RoomsAmount,
                office.MeetingRoomsAmount, office.OfficeCapacity, office.OpenSpace,
                office.HotSpot, office.HotSpotPlaces, office.ID);
            try
            {
                SqlConnection connection = new SqlConnection(Params.connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();
                connection.Close();

                string json = JsonConvert.SerializeObject(office);
                return Created(this.Request.Path.ToString(), json);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        /// <summary>
        /// Performs PUT request to http://officemanager.us-east-1.elasticbeanstalk.com/api/offices/{id}
        /// Update an exist organization
        /// </summary>
        /// <param name="updated_office"> Updated organization as <see cref="Office"/></param>
        /// <param name="id">Organization ID to update</param>
        /// <returns><see cref="IActionResult"/></returns>
        /// <seealso cref="Get(string)"/>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Office updated_office, string id)
        {
            var office = Get(id);
            if (office.Result.Result.ToString().Contains("NotFoundResult"))
                return NotFound();
            if (!office.Result.Result.ToString().Contains("OkObjectResult"))
                return new BadRequestResult();

            string sql = string.Format("UPDATE tlbOffice " +
                "SET NumOfEmployees = '{0}', ParkingAmount = '{1}', FloorsAmount = '{2}', RoomsAmount = '{3}'," +
                "MeetingRoomsAmount = '{4}', OfficeCapacity = '{5}', OpenSpace = '{6}', HotSpot = '{7}'," +
                "HotSpotPlaces = '{8}', Name = '{9}', ID = '{10}' WHERE CONVERT(VARCHAR, ID) = '{11}'",
            updated_office.NumOfEmployees, updated_office.ParkingAmount, updated_office.FloorsAmount, updated_office.RoomsAmount,
                updated_office.MeetingRoomsAmount, updated_office.OfficeCapacity, updated_office.OpenSpace,
                updated_office.HotSpot, updated_office.HotSpotPlaces, updated_office.Name, updated_office.ID, id);
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
        /// Performs DELETE request to http://officemanager.us-east-1.elasticbeanstalk.com/api/offices/{id}
        /// remove an exist organization
        /// </summary>
        /// <param name="id">Organization ID to remove</param>
        /// <returns><see cref="IActionResult"/></returns>
        /// <seealso cref="Get(string)"/>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var office = Get(id);
            if (office.Result.Result.ToString().Contains("NotFoundResult"))
                return NotFound();
            if (!office.Result.Result.ToString().Contains("OkObjectResult"))
                return new BadRequestResult();

            id = id.Replace(" ", "-");
            string sql = string.Format("DELETE FROM tlbOffice WHERE CONVERT(VARCHAR, ID) = '{0}'", id);
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
    }
}