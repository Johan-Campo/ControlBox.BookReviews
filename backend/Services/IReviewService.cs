using BookReviewsApi.DTOs.Reviews;

namespace BookReviewsApi.Services;

public interface IReviewService
{
    Task<IEnumerable<ReviewDto>> GetByBookAsync(int bookId);
    Task<ReviewDto> CreateAsync(int bookId, int userId, CreateReviewRequest request);
    Task<ReviewDto> UpdateAsync(int bookId, int reviewId, int userId, UpdateReviewRequest request);
    Task DeleteAsync(int bookId, int reviewId, int userId);
}
