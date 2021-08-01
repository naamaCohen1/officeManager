using Microsoft.AspNetCore.Mvc;
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

        [HttpPost("{id}")]
        public ActionResult<List<string>> Post(string id)
        {
            try
            {
                using (SmtpClient client = new SmtpClient("smtp.gmail.com", 587))
                {
                    client.EnableSsl = true;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential("officemanagerhealth@gmail.com", "Qwerty12!");
                    MailMessage mailMessage = new MailMessage();
                    mailMessage.To.Add("officemanagerhealth@gmail.com");
                    mailMessage.From = new MailAddress("officemanagerhealth@gmail.com");
                    mailMessage.Subject = "Health Availability Certification - " + id;
                    mailMessage.Body = "Health Availability Certification for " + id + " in " + DateTime.Today.ToShortDateString() + " was submitted sucssesfully";
                    client.Send(mailMessage);
                }
                return new OkResult();
            }
            catch (Exception e)
            {
                return new BadRequestResult();
            }
        }
    }
}