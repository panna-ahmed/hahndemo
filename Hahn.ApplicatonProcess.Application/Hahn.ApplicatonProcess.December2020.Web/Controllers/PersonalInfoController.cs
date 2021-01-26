using Hahn.ApplicatonProcess.December2020.Domain.Context;
using Hahn.ApplicatonProcess.December2020.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using Serilog;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace Hahn.ApplicatonProcess.December2020.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalInfoController : ControllerBase
    {
        private readonly ApiContext context;
        private readonly ILogger logger;

        public PersonalInfoController(ApiContext context, ILogger<PersonalInfo> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        [HttpPost]
        [Route("save-personal")]
        public IActionResult SavePersonalInfo([FromBody] PersonalInfo personalInfo)
        {
            try
            {
                context.PersonalInfos.Add(personalInfo);
                context.SaveChanges();
                logger.LogInformation($"POST : save-personal invoked on {DateTime.Now}");

                object _obj = new { response = personalInfo, status = StatusCodes.Status201Created };
                return new ObjectResult(_obj) { StatusCode = StatusCodes.Status201Created };
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown :  {ex.Message}; DateTime {DateTime.Now}");
                throw;
            }

        }

        [HttpGet]
        [Route("get-details")]
        public IActionResult GetPersonalInfo()
        {
            var result = context.PersonalInfos.ToList();
            if (result != null && result.Count > 0)
            {
                return Ok(new { response = result, status = StatusCodes.Status200OK });
            }
            else
            {
                return NotFound(new { response = "No records", status = StatusCodes.Status204NoContent });
            }

        }

        [HttpGet]
        [Route("get-details/{id}")]
        public IActionResult GetIndividualDetails(int id)
        {
            var person = context.PersonalInfos.Where(p => p.Id == id).FirstOrDefault();
            if (person != null)
            {
                return Ok(new { response = person, status = StatusCodes.Status200OK });
            }
            else
            {
                return NotFound(new { response = $"Id {id} not exists", status = StatusCodes.Status204NoContent });
            }
        }


        [HttpPut]
        [Route("update-person")]
        public IActionResult UpdatePerson([FromBody] PersonalInfo person)
        {
            var entity = context.PersonalInfos.Find(person.Id);
            if (entity != null)
            {
                entity.Name = person.Name;
                entity.FamilyName = person.FamilyName;
                entity.CountryOfOrigin = person.CountryOfOrigin;
                entity.Address = person.Address;
                entity.EmailAddress = person.EmailAddress;
                entity.Age = person.Age;
                entity.IsHired = person.IsHired;

                context.Update(entity);
                context.SaveChanges();
                logger.LogInformation($"PUT : update-person invoked on {DateTime.Now}");
                return Ok(new { response = $"Id {entity.Id} is updated", status = StatusCodes.Status200OK });
            }
            else
            {
                return NotFound(new { response = $"Id {person.Id} not exists", status = StatusCodes.Status204NoContent });
            }

        }


        [HttpDelete]
        [Route("delete-person/{id}")]
        public IActionResult DeletePerson(int id)
        {
            var person = context.PersonalInfos.Find(id);
            if (person != null)
            {
                context.PersonalInfos.Remove(person);
                context.SaveChanges();
                logger.LogInformation($"DELETE : delete-person invoked on {DateTime.Now}");
                return Ok(new { response = $"{id} is deleted", status = StatusCodes.Status200OK });
            }
            return NotFound(new { response = $"Id {id} is not found", status = StatusCodes.Status204NoContent });

        }
    }
}
