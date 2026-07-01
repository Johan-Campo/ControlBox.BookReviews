namespace BookReviewsApi.Models;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string? CoverUrl { get; set; }
    public int PublishedYear { get; set; }

    public ICollection<Review> Reviews { get; set; } = [];
}
