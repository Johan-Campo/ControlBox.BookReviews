using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookReviewsApi.Migrations
{
    /// <inheritdoc />
    public partial class TranslateSeedDataToSpanish : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Tecnología", "Una guía para escribir código legible y mantenible a través de ejemplos y principios prácticos." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Tecnología", "Consejos atemporales que abarcan desde el desarrollo profesional hasta la gestión de proyectos." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Historia", "Una breve historia de la humanidad que explora cómo el Homo sapiens llegó a dominar el planeta." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Ciencia ficción", "Una épica historia de política, religión y ecología en el planeta desértico Arrakis." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Fantasía", "La leyenda de Kvothe, un joven huérfano que se convierte en un legendario mago, contada en sus propias palabras." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "No ficción", "Explora los dos sistemas que impulsan la forma en que pensamos y tomamos decisiones." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Misterio", "Un oscuro thriller psicológico sobre un matrimonio que se vuelve siniestro en un aniversario de bodas." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Ciencia", "La icónica exploración de Hawking sobre el universo, desde el Big Bang hasta los agujeros negros." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Biografía", "La biografía exclusiva del cofundador de Apple, basada en más de cuarenta entrevistas." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Ciencia ficción", "Instantes antes de que la Tierra sea demolida para abrir una autopista hiperespacial, Arthur Dent es arrastrado al espacio." });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Technology", "A guide to writing readable, maintainable code through practical examples and principles." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Technology", "Timeless advice covering topics from career development to project management." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "History", "A brief history of humankind, exploring how Homo sapiens came to dominate the planet." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Science Fiction", "An epic tale of politics, religion, and ecology on the desert planet Arrakis." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Fantasy", "The legend of Kvothe, a young orphan who grows into a legendary wizard, told in his own words." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Non-Fiction", "Explores the two systems that drive the way we think and make decisions." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Mystery", "A dark psychological thriller about a marriage that turns sinister on a wedding anniversary." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Science", "Hawking's landmark exploration of the universe, from the Big Bang to black holes." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Biography", "The exclusive biography of Apple's co-founder, based on more than forty interviews." });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "Category", "Summary" },
                values: new object[] { "Science Fiction", "Moments before Earth is demolished for a hyperspace bypass, Arthur Dent is swept into space." });
        }
    }
}
