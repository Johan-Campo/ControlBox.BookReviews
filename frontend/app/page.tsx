import { BookCard } from "@/components/book-card";
import { getBooks, getCategories } from "@/lib/api/books";

interface HomePageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { search, category } = await searchParams;

  const [books, categories] = await Promise.all([
    getBooks({ search, category }),
    getCategories(),
  ]);

  return (
    <main className="flex-1 px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold">Books</h1>

      <form action="/" method="GET" className="mb-8 flex flex-wrap gap-3">
        <input
          type="search"
          name="search"
          placeholder="Search by title, author or category"
          defaultValue={search}
          className="min-w-[240px] flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="category"
          defaultValue={category ?? ""}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {books.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
