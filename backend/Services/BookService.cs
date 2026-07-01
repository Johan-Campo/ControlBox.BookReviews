using BookReviewsApi.Data;
using BookReviewsApi.DTOs.Books;
using Microsoft.EntityFrameworkCore;

namespace BookReviewsApi.Services;

public class BookService(AppDbContext db) : IBookService
{
    public async Task<IEnumerable<BookDto>> GetAllAsync(string? search, string? category)
    {
        var query = db.Books.Include(b => b.Reviews).AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.ToLower();
            query = query.Where(b =>
                b.Title.ToLower().Contains(term) ||
                b.Author.ToLower().Contains(term) ||
                b.Category.ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(category))
            query = query.Where(b => b.Category == category);

        var books = await query.ToListAsync();

        return books.Select(b => new BookDto(
            b.Id,
            b.Title,
            b.Author,
            b.Category,
            b.Summary,
            b.CoverUrl,
            b.PublishedYear,
            b.Reviews.Count > 0 ? b.Reviews.Average(r => r.Rating) : 0,
            b.Reviews.Count
        ));
    }

    public async Task<BookDto?> GetByIdAsync(int id)
    {
        var book = await db.Books
            .Include(b => b.Reviews)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (book is null) return null;

        return new BookDto(
            book.Id,
            book.Title,
            book.Author,
            book.Category,
            book.Summary,
            book.CoverUrl,
            book.PublishedYear,
            book.Reviews.Count > 0 ? book.Reviews.Average(r => r.Rating) : 0,
            book.Reviews.Count
        );
    }

    public async Task<IEnumerable<string>> GetCategoriesAsync()
    {
        return await db.Books
            .Select(b => b.Category)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync();
    }
}
