using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System.IO;
using System.Threading;

namespace officeManager.Controllers
{
    [Route("api/[controller]")]
    [Route("gmail")]
    [ApiController]

    public class GmailController : ControllerBase
    {
        //user: 'officemanagerhealth@gmail.com',
        //    pass: 'Qwerty12!'
        // API Client - 425121669393-9gno5mtu3csnnu9n3oc9skbq4oj8f70n.apps.googleusercontent.com
        // Client Secret - Yn_mg_jRWehQgfwVFpBpZEQE
        // RefreshToken - 1//04xzCRP0pE5qpCgYIARAAGAQSNwF-L9IrZxumQG_ti_91FWUMQJ46oi8Oq4qLskWXI8ZhoquvoEaAn3i9tHLEvkMr-EHSUGCaX6k

        static string[] Scopes = { GmailService.Scope.GmailReadonly };
        static string ApplicationName = "Web client - OfficeManager";
        UserCredential credential;
        GmailService service;


        private void refreshToken()
        {
            using (var stream =
                new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
            {
                // The file token.json stores the user's access and refresh tokens, and is created
                // automatically when the authorization flow completes for the first time.
                string credPath = "token.json";
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
                Console.WriteLine("Credential file saved to: " + credPath);
            }
        }

        [HttpGet]
        public ActionResult<string> Get()
        {
            try
            {
                refreshToken();
                // Create Gmail API service.
                service = new GmailService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = ApplicationName,
                });

                // Define parameters of request.
                UsersResource.LabelsResource.ListRequest request = service.Users.Labels.List("me");

                // List labels.
                IList<Label> labels = request.Execute().Labels;
                Console.WriteLine("Labels:");
                if (labels != null && labels.Count > 0)
                {
                    foreach (var labelItem in labels)
                    {
                        Console.WriteLine("{0}", labelItem.Name);
                    }
                }
                else
                {
                    Console.WriteLine("No labels found.");
                }
                Console.Read();
                return new OkObjectResult("Done");
            }
            catch (Exception e)
            {
                return new BadRequestResult();
            }
        }
    }
}