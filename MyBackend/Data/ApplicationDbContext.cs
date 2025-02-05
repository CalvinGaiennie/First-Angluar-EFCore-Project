using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MyBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public DbSet<Account> Accounts { get; set; }
    }

    // Example of a model class
    public class Account
    {
        [Key]
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
