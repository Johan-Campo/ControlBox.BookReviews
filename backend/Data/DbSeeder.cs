using BookReviewsApi.Models;

namespace BookReviewsApi.Data;

public static class DbSeeder
{
    public static Book[] GetBooks() =>
    [
        new() { Id = 1, Title = "Clean Code", Author = "Robert C. Martin", Category = "Tecnología", Summary = "Una guía para escribir código legible y mantenible a través de ejemplos y principios prácticos.", PublishedYear = 2008 },
        new() { Id = 2, Title = "The Pragmatic Programmer", Author = "Andrew Hunt & David Thomas", Category = "Tecnología", Summary = "Consejos atemporales que abarcan desde el desarrollo profesional hasta la gestión de proyectos.", PublishedYear = 1999 },
        new() { Id = 3, Title = "Sapiens", Author = "Yuval Noah Harari", Category = "Historia", Summary = "Una breve historia de la humanidad que explora cómo el Homo sapiens llegó a dominar el planeta.", PublishedYear = 2011 },
        new() { Id = 4, Title = "Dune", Author = "Frank Herbert", Category = "Ciencia ficción", Summary = "Una épica historia de política, religión y ecología en el planeta desértico Arrakis.", PublishedYear = 1965 },
        new() { Id = 5, Title = "The Name of the Wind", Author = "Patrick Rothfuss", Category = "Fantasía", Summary = "La leyenda de Kvothe, un joven huérfano que se convierte en un legendario mago, contada en sus propias palabras.", PublishedYear = 2007 },
        new() { Id = 6, Title = "Thinking, Fast and Slow", Author = "Daniel Kahneman", Category = "No ficción", Summary = "Explora los dos sistemas que impulsan la forma en que pensamos y tomamos decisiones.", PublishedYear = 2011 },
        new() { Id = 7, Title = "Gone Girl", Author = "Gillian Flynn", Category = "Misterio", Summary = "Un oscuro thriller psicológico sobre un matrimonio que se vuelve siniestro en un aniversario de bodas.", PublishedYear = 2012 },
        new() { Id = 8, Title = "A Brief History of Time", Author = "Stephen Hawking", Category = "Ciencia", Summary = "La icónica exploración de Hawking sobre el universo, desde el Big Bang hasta los agujeros negros.", PublishedYear = 1988 },
        new() { Id = 9, Title = "Steve Jobs", Author = "Walter Isaacson", Category = "Biografía", Summary = "La biografía exclusiva del cofundador de Apple, basada en más de cuarenta entrevistas.", PublishedYear = 2011 },
        new() { Id = 10, Title = "The Hitchhiker's Guide to the Galaxy", Author = "Douglas Adams", Category = "Ciencia ficción", Summary = "Instantes antes de que la Tierra sea demolida para abrir una autopista hiperespacial, Arthur Dent es arrastrado al espacio.", PublishedYear = 1979 },
    ];
}
