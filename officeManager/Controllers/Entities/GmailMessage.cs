using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager.Controllers.Entities
{
    public class GmailMessage
    {
        public string To { get; set; }
        public string[] ToArray { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        public GmailMessage()
        {
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public GmailMessage(string to, string subject, string body)
        {
            this.To = to;
            this.Subject = subject;
            this.Body = body;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public GmailMessage(string[] to, string subject, string body)
        {
            this.ToArray = to;
            this.Subject = subject;
            this.Body = body;
        }
    }
}
