import type { Review } from "@/lib/types/review";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-sm text-gray-500">No reviews yet. Be the first to leave one.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <li key={review.id} className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{review.username}</span>
            <span className="text-sm text-gray-500">★ {review.rating}</span>
          </div>
          <p className="mt-1 text-sm text-gray-700">{review.comment}</p>
          <p className="mt-2 text-xs text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
            {review.updatedAt && " (edited)"}
          </p>
        </li>
      ))}
    </ul>
  );
}
