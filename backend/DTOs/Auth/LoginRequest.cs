using System.ComponentModel.DataAnnotations;

namespace BookReviewsApi.DTOs.Auth;

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password
);
