using BookReviewsApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookReviewsApi.Controllers;

[ApiController]
[Route("api/books")]
public class BooksController(IBookService bookService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] string? category)
    {
        var books = await bookService.GetAllAsync(search, category);
        return Ok(books);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var book = await bookService.GetByIdAsync(id);
        return book is null ? NotFound() : Ok(book);
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await bookService.GetCategoriesAsync();
        return Ok(categories);
    }
}
