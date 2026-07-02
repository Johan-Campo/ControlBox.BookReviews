namespace BookReviewsApi.DTOs.Auth;

// ResetToken is only populated because this project has no email service configured (dev-mode
// demonstration of the full reset flow). A production build would email the link instead of
// returning the token to the client.
public record ForgotPasswordResponse(
    string Message,
    string? ResetToken
);
