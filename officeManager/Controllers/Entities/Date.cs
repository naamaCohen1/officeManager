using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace officeManager.Controllers.Entities
{
    public class Date
    {
        public string date { get; set; }
    
        public Date(string date)
        {
            this.date = date;
            
        }
    }
}
