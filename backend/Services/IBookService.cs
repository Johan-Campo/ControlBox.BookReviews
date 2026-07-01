using BookReviewsApi.DTOs.Books;

namespace BookReviewsApi.Services;

public interface IBookService
{
    Task<IEnumerable<BookDto>> GetAllAsync(string? search, string? category);
    Task<BookDto?> GetByIdAsync(int id);
    Task<IEnumerable<string>> GetCategoriesAsync();
}
