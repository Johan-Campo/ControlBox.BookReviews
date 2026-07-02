namespace BookReviewsApi.DTOs.Auth;

public record ForgotPasswordResponse(
    string Message,
    string? ResetToken
);
