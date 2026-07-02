import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookById } from "@/lib/api/books";
import { getReviews } from "@/lib/api/reviews";
import { getSessionUser } from "@/lib/session";
import { ReviewList } from "@/components/review-list";
import { ReviewForm } from "./review-form";

interface BookDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;
  const bookId = Number(id);

  const [book, reviews, user] = await Promise.all([
    getBookById(bookId),
    getReviews(bookId),
    getSessionUser(),
  ]);

  if (!book) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back to books
      </Link>

      <div className="mt-4 flex flex-col gap-2">
        <span className="inline-block w-fit rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {book.category}
        </span>
        <h1 className="text-2xl font-bold">{book.title}</h1>
        <p className="text-gray-500">
          {book.author} · {book.publishedYear}
        </p>
        <p className="text-gray-700">{book.summary}</p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>★ {book.averageRating.toFixed(1)}</span>
          <span>({book.reviewCount} reviews)</span>
        </div>
      </div>

      <section className="mt-8 flex flex-col gap-6">
        {user ? (
          <ReviewForm bookId={book.id} />
        ) : (
          <p className="text-sm text-gray-500">
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>{" "}
            to leave a review.
          </p>
        )}

        <ReviewList reviews={reviews} />
      </section>
    </main>
  );
}
