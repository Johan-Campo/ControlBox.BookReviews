using BookReviewsApi.DTOs.Reviews;
using BookReviewsApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BookReviewsApi.Controllers;

[ApiController]
[Route("api/books/{bookId:int}/reviews")]
public class ReviewsController(IReviewService reviewService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetByBook(int bookId)
    {
        var reviews = await reviewService.GetByBookAsync(bookId);
        return Ok(reviews);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(int bookId, CreateReviewRequest request)
    {
        try
        {
            var userId = GetCurrentUserId();
            var review = await reviewService.CreateAsync(bookId, userId, request);
            return CreatedAtAction(nameof(GetByBook), new { bookId }, review);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new ProblemDetails { Title = ex.Message });
        }
    }

    [Authorize]
    [HttpPut("{reviewId:int}")]
    public async Task<IActionResult> Update(int bookId, int reviewId, UpdateReviewRequest request)
    {
        try
        {
            var userId = GetCurrentUserId();
            var review = await reviewService.UpdateAsync(bookId, reviewId, userId, request);
            return Ok(review);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new ProblemDetails { Title = ex.Message });
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    [Authorize]
    [HttpDelete("{reviewId:int}")]
    public async Task<IActionResult> Delete(int bookId, int reviewId)
    {
        try
        {
            var userId = GetCurrentUserId();
            await reviewService.DeleteAsync(bookId, reviewId, userId);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new ProblemDetails { Title = ex.Message });
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    private int GetCurrentUserId()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new InvalidOperationException("User ID claim missing.");
        return int.Parse(claim);
    }
}
