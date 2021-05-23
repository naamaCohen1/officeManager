using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager.Controllers.Entities
{
    public class CalendarUser
    {
        public string id { get; set; }
        public string date { get; set; }
        public CalendarUser(string date,string id)
        {
            this.id = id;
            this.date = date;

        }
        public CalendarUser()
        {

        }
    }
}
