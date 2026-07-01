namespace BookReviewsApi.DTOs.Reviews;

public record ReviewDto(
    int Id,
    int Rating,
    string Comment,
    DateTime CreatedAt,
    DateTime? UpdatedAt,
    string Username,
    int UserId
);
