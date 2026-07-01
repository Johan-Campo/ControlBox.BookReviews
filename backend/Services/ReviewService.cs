using BookReviewsApi.Data;
using BookReviewsApi.DTOs.Reviews;
using BookReviewsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BookReviewsApi.Services;

public class ReviewService(AppDbContext db) : IReviewService
{
    public async Task<IEnumerable<ReviewDto>> GetByBookAsync(int bookId)
    {
        return await db.Reviews
            .Include(r => r.User)
            .Where(r => r.BookId == bookId)
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new ReviewDto(r.Id, r.Rating, r.Comment, r.CreatedAt, r.UpdatedAt, r.User.Username, r.UserId))
            .ToListAsync();
    }

    public async Task<ReviewDto> CreateAsync(int bookId, int userId, CreateReviewRequest request)
    {
        bool bookExists = await db.Books.AnyAsync(b => b.Id == bookId);
        if (!bookExists)
            throw new KeyNotFoundException($"Book {bookId} not found.");

        var review = new Review
        {
            BookId = bookId,
            UserId = userId,
            Rating = request.Rating,
            Comment = request.Comment,
        };

        db.Reviews.Add(review);
        await db.SaveChangesAsync();

        var username = await db.Users
            .Where(u => u.Id == userId)
            .Select(u => u.Username)
            .FirstAsync();

        return new ReviewDto(review.Id, review.Rating, review.Comment, review.CreatedAt, null, username, userId);
    }

    public async Task<ReviewDto> UpdateAsync(int reviewId, int userId, UpdateReviewRequest request)
    {
        var review = await db.Reviews
            .Include(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == reviewId)
            ?? throw new KeyNotFoundException($"Review {reviewId} not found.");

        if (review.UserId != userId)
            throw new UnauthorizedAccessException("You can only edit your own reviews.");

        review.Rating = request.Rating;
        review.Comment = request.Comment;
        review.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();

        return new ReviewDto(review.Id, review.Rating, review.Comment, review.CreatedAt, review.UpdatedAt, review.User.Username, review.UserId);
    }

    public async Task DeleteAsync(int reviewId, int userId)
    {
        var review = await db.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId)
            ?? throw new KeyNotFoundException($"Review {reviewId} not found.");

        if (review.UserId != userId)
            throw new UnauthorizedAccessException("You can only delete your own reviews.");

        db.Reviews.Remove(review);
        await db.SaveChangesAsync();
    }
}
