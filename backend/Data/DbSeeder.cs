using BookReviewsApi.Models;

namespace BookReviewsApi.Data;

public static class DbSeeder
{
    public static Book[] GetBooks() =>
    [
        new() { Id = 1, Title = "Clean Code", Author = "Robert C. Martin", Category = "Technology", Summary = "A guide to writing readable, maintainable code through practical examples and principles.", PublishedYear = 2008 },
        new() { Id = 2, Title = "The Pragmatic Programmer", Author = "Andrew Hunt & David Thomas", Category = "Technology", Summary = "Timeless advice covering topics from career development to project management.", PublishedYear = 1999 },
        new() { Id = 3, Title = "Sapiens", Author = "Yuval Noah Harari", Category = "History", Summary = "A brief history of humankind, exploring how Homo sapiens came to dominate the planet.", PublishedYear = 2011 },
        new() { Id = 4, Title = "Dune", Author = "Frank Herbert", Category = "Science Fiction", Summary = "An epic tale of politics, religion, and ecology on the desert planet Arrakis.", PublishedYear = 1965 },
        new() { Id = 5, Title = "The Name of the Wind", Author = "Patrick Rothfuss", Category = "Fantasy", Summary = "The legend of Kvothe, a young orphan who grows into a legendary wizard, told in his own words.", PublishedYear = 2007 },
        new() { Id = 6, Title = "Thinking, Fast and Slow", Author = "Daniel Kahneman", Category = "Non-Fiction", Summary = "Explores the two systems that drive the way we think and make decisions.", PublishedYear = 2011 },
        new() { Id = 7, Title = "Gone Girl", Author = "Gillian Flynn", Category = "Mystery", Summary = "A dark psychological thriller about a marriage that turns sinister on a wedding anniversary.", PublishedYear = 2012 },
        new() { Id = 8, Title = "A Brief History of Time", Author = "Stephen Hawking", Category = "Science", Summary = "Hawking's landmark exploration of the universe, from the Big Bang to black holes.", PublishedYear = 1988 },
        new() { Id = 9, Title = "Steve Jobs", Author = "Walter Isaacson", Category = "Biography", Summary = "The exclusive biography of Apple's co-founder, based on more than forty interviews.", PublishedYear = 2011 },
        new() { Id = 10, Title = "The Hitchhiker's Guide to the Galaxy", Author = "Douglas Adams", Category = "Science Fiction", Summary = "Moments before Earth is demolished for a hyperspace bypass, Arthur Dent is swept into space.", PublishedYear = 1979 },
    ];
}
