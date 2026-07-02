namespace BookReviewsApi.DTOs.Users;

public record UserProfileDto(
    string Username,
    string Email,
    string? ProfilePhotoUrl
);
