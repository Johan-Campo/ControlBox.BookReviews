using System.ComponentModel.DataAnnotations;

namespace BookReviewsApi.DTOs.Reviews;

public record CreateReviewRequest(
    [Required, Range(1, 5)] int Rating,
    [Required, MinLength(10), MaxLength(2000)] string Comment
);
