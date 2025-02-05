using Microsoft.AspNetCore.Mvc;
using MyBackend.Data;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TestController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("accounts")]
    public IActionResult GetAccounts()
    {
        var accounts = _context.Accounts
            .Select(a => new { a.Id, a.Email })
            .ToList();
        return Ok(accounts);
    }

    [HttpPost("create-account")]
    public IActionResult CreateAccount([FromBody] CreateAccountDto request)
    {
        if (string.IsNullOrEmpty(request.Email))
        {
            return BadRequest("Email is required");
        }

        var account = new Account
        {
            Email = request.Email,
            Password = request.Password
        };

        _context.Accounts.Add(account);
        _context.SaveChanges();

        return Ok(new { 
            message = "Account created successfully",
            email = request.Email 
        });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto request)
    {
        var account = _context.Accounts
            .FirstOrDefault(a => a.Email == request.Email && a.Password == request.Password);

        if (account == null)
        {
            return Unauthorized("Invalid email or password");
        }

        return Ok(new { 
            message = "Login successful",
            email = account.Email 
        });
    }
}

public class CreateAccountDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
}

public class LoginDto
{
    public string Email { get; set; }
    public string Password { get; set; }
}
