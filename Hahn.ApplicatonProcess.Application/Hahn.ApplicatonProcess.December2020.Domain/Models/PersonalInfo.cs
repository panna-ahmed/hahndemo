using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hahn.ApplicatonProcess.December2020.Domain.Models
{
    /// <summary>Personal Details</summary>
    public class PersonalInfo
    {
        /// <summary>Identity Column.</summary>
        /// <value>Identity Column.</value>
        /// <example>12</example>
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        /// <summary>Full Name.</summary>
        /// <value>Full Name.</value>
        /// <example>Mark Anthony</example>
        public string Name { get; set; }

        /// <summary>Family Name.</summary>
        /// <value>Family Name.</value>
        /// <example>Fernandaz</example>
        public string FamilyName { get; set; }
        /// <summary>Country of origin.</summary>
        /// <value>Country of origin.</value>
        /// <example>England</example>
        public string CountryOfOrigin { get; set; }
        /// <summary>Address.</summary>
        /// <value>Address.</value>
        /// <example>Colombo</example>
        public string Address { get; set; }

        /// <summary>Email Address.</summary>
        /// <value>Email Address.</value>
        /// <example>markanthony@yahoo.com</example>
        public string EmailAddress { get; set; }

        /// <summary>Age.</summary>
        /// <value>Age.</value>
        /// <example>35</example>
        public int Age { get; set; }

        /// <summary>Is Hired.</summary>
        /// <value>Is Hired.</value>
        /// <example>True</example>
        public bool IsHired { get; set; }

    }
}
