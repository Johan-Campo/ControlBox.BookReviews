import Link from "next/link";
import type { Book } from "@/lib/types/book";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-sm"
    >
      <span className="inline-block w-fit rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
        {book.category}
      </span>
      <h2 className="font-semibold">{book.title}</h2>
      <p className="text-sm text-gray-500">{book.author}</p>
      <p className="line-clamp-2 text-sm text-gray-600">{book.summary}</p>
      <div className="mt-auto flex items-center gap-1 text-sm text-gray-500">
        <span>★ {book.averageRating.toFixed(1)}</span>
        <span>({book.reviewCount})</span>
      </div>
    </Link>
  );
}
