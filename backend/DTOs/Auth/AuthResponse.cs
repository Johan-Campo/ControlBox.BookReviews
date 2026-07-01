namespace BookReviewsApi.DTOs.Auth;

public record AuthResponse(
    string Token,
    string Username,
    string Email
);
