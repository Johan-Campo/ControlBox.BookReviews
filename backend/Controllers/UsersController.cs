using BookReviewsApi.DTOs.Users;
using BookReviewsApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BookReviewsApi.Controllers;

[ApiController]
[Route("api/users")]
[Authorize]
public class UsersController(IUserService userService) : ControllerBase
{
    [HttpGet("me")]
    public async Task<IActionResult> GetMe()
    {
        var profile = await userService.GetProfileAsync(GetCurrentUserId());
        return Ok(profile);
    }

    [HttpPut("me")]
    public async Task<IActionResult> UpdateMe(UpdateProfileRequest request)
    {
        var profile = await userService.UpdateProfileAsync(GetCurrentUserId(), request);
        return Ok(profile);
    }

    private int GetCurrentUserId()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new InvalidOperationException("User ID claim missing.");
        return int.Parse(claim);
    }
}
