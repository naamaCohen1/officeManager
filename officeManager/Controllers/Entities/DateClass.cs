using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager.Controllers.Entities
{
    public class DateClass
    {
        public string date { get; set; }
    
        public DateClass(string date)
        {
            this.date = date;
            
        }
        public DateClass()
        {

        }
      
    }
}
