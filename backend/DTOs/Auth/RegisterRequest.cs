using System.ComponentModel.DataAnnotations;

namespace BookReviewsApi.DTOs.Auth;

public record RegisterRequest(
    [Required, MinLength(3), MaxLength(50)] string Username,
    [Required, EmailAddress, MaxLength(200)] string Email,
    [Required, MinLength(6)] string Password
);
