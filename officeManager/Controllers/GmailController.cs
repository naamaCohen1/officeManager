using Microsoft.AspNetCore.Mvc;
using officeManager.Controllers.Entities;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("gmail")]
    [ApiController]
    public class GmailController : ControllerBase
    {
        // user: 'officemanagerhealth@gmail.com',
        // pass: 'Qwerty12!'
        // API Client - 425121669393-9gno5mtu3csnnu9n3oc9skbq4oj8f70n.apps.googleusercontent.com
        // Client Secret - Yn_mg_jRWehQgfwVFpBpZEQE
        // RefreshToken - 1//04xzCRP0pE5qpCgYIARAAGAQSNwF-L9IrZxumQG_ti_91FWUMQJ46oi8Oq4qLskWXI8ZhoquvoEaAn3i9tHLEvkMr-EHSUGCaX6k


        /// <summary>
        /// This methos sends an email using Gmail to officemanagerhealth@gmail.com
        /// </summary>
        /// <param name="id"> User ID which fill the Health Availability Certification</param>
        /// <returns><<see cref="IActionResult"/>/returns>
        [HttpPost("{id}")]
        public ActionResult<List<string>> Post(string id)
        {
            try
            {
                using (SmtpClient client = new SmtpClient("email-smtp.us-east-2.amazonaws.com", 587))
                {
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential("AKIAZT3MGQTQDXZRZUGE", "BCZcHCiXN+309pU0JUxtOf4attqyhteoVh3RcpSFIlJV");
                    MailMessage mailMessage = new MailMessage();
                    mailMessage.To.Add("officemanagerhealth@gmail.com");
                    mailMessage.From = new MailAddress("officemanagerhealth@gmail.com");
                    mailMessage.Subject = "Health Availability Certification - " + id;
                    mailMessage.Body = "Health Availability Certification for " + id + " in " + DateTime.Today.ToShortDateString() + " was submitted sucssesfully";
                    client.Send(mailMessage);
                }
                return new OkResult();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        /// <summary>
        /// This methos sends an email using Gmail to the requested users
        /// </summary>
        /// <param name="emailMessage"> Email parameters as <see cref="GmailMessage"/></param>
        /// <returns><see cref="ActionResult"/></returns>
        [HttpPost]
        public ActionResult<string> Post([FromBody] GmailMessage emailMessage)
        {
            try
            {
                if (emailMessage.ToArray == null)
                    SendMail(emailMessage);
                else
                {
                    foreach (string to in emailMessage.ToArray)
                    {
                        emailMessage.To = to;
                        SendMail(emailMessage);
                    }
                }
                return new OkResult();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        /// <summary>
        /// This method sends a gmail message with the requested details.
        /// </summary>
        /// <param name="emailMessage"> Email message parameters as <see cref="GmailMessage"/></param>
        /// <returns><see cref="ActionResult"/></returns>
        public ActionResult<List<string>> SendMail(GmailMessage emailMessage)
        {
            try
            {
                using (SmtpClient client = new SmtpClient("email-smtp.us-east-2.amazonaws.com", 587))
                {
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential("AKIAZT3MGQTQDXZRZUGE", "BCZcHCiXN+309pU0JUxtOf4attqyhteoVh3RcpSFIlJV");
                    MailMessage mailMessage = new MailMessage();
                    mailMessage.To.Add(emailMessage.To);
                    mailMessage.From = new MailAddress("officemanagerhealth@gmail.com");
                    mailMessage.Subject = emailMessage.Subject;
                    mailMessage.Body = emailMessage.Body;
                    client.Send(mailMessage);
                }
                return new OkResult();
            }
            catch (Exception)
            {
                return new BadRequestObjectResult("fail to send Email");
            }
        }
    }
}