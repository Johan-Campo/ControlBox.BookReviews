namespace BookReviewsApi.DTOs.Books;

public record BookDto(
    int Id,
    string Title,
    string Author,
    string Category,
    string Summary,
    string? CoverUrl,
    int PublishedYear,
    double AverageRating,
    int ReviewCount
);
