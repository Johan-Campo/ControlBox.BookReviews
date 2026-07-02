using BookReviewsApi.DTOs.Users;

namespace BookReviewsApi.Services;

public interface IUserService
{
    Task<UserProfileDto> GetProfileAsync(int userId);
    Task<UserProfileDto> UpdateProfileAsync(int userId, UpdateProfileRequest request);
}
