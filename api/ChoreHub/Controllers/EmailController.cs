using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using ChoreHub.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

using SendGrid;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ChoreHub.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class EmailController : Controller
    {
        IConfiguration configuration;

        public EmailController(IConfiguration configuration, IUserRepository users)
        {
            this.configuration = configuration;
            Users = users;
        }

        public IUserRepository Users
        {
            get; set;
        }


        // POST api/email
        [HttpPost]
        public IActionResult Send([FromBody]Email email)
        {
            var message = new SendGrid.SendGridMessage();
            message.From = new MailAddress("info@chorehub.com", "ChoreHub");
            message.Subject = "Iemand op ChoreHub heeft je een berichtje gestuurd";
            message.AddTo(email.Recipient);
            message.Html = email.Content;
            var client = new Web(configuration["SendGrid:Key"]);
            client.DeliverAsync(message).Wait();

            return Ok();
        }
    }
}
