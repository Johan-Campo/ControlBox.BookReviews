using BookReviewsApi.Data;
using BookReviewsApi.DTOs.Users;
using Microsoft.EntityFrameworkCore;

namespace BookReviewsApi.Services;

public class UserService(AppDbContext db) : IUserService
{
    public async Task<UserProfileDto> GetProfileAsync(int userId)
    {
        var user = await db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException($"No se encontró el usuario {userId}.");

        return new UserProfileDto(user.Username, user.Email, user.ProfilePhotoUrl);
    }

    public async Task<UserProfileDto> UpdateProfileAsync(int userId, UpdateProfileRequest request)
    {
        var user = await db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException($"No se encontró el usuario {userId}.");

        user.ProfilePhotoUrl = request.ProfilePhotoUrl;
        await db.SaveChangesAsync();

        return new UserProfileDto(user.Username, user.Email, user.ProfilePhotoUrl);
    }
}
