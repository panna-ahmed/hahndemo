using Hahn.ApplicatonProcess.December2020.Domain.Models;
using FluentValidation;
using RestSharp;
using System.Threading;

namespace Hahn.ApplicatonProcess.December2020.Data.Validators
{
    public class PersonalInfoModelValidator : AbstractValidator<PersonalInfo>
    {
        public PersonalInfoModelValidator(IRestClient restClient)
        {
            RuleFor(p => p.Name).Length(5);
            RuleFor(p => p.FamilyName).MinimumLength(5);
            RuleFor(p => p.Address).MinimumLength(10);
            RuleFor(p => p.Age).InclusiveBetween(20, 60);
            RuleFor(p => p.EmailAddress).EmailAddress();

            var cancellationTokenSource = new CancellationTokenSource();

            RuleFor(m => m.CountryOfOrigin).MustAsync(async (country, cancellation) =>
            (await restClient.ExecuteAsync(new RestRequest($"https://restcountries.eu/rest/v2/name/{country}?fullText=true"), cancellationTokenSource.Token))
            .IsSuccessful)
             .WithMessage("Country name is not valid.");
        }
    }
}
