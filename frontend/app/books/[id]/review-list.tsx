import type { Review } from "@/lib/types/review";
import { ReviewItem } from "./review-item";

interface ReviewListProps {
  reviews: Review[];
  bookId: number;
  currentUserId: string | null;
}

export function ReviewList({ reviews, bookId, currentUserId }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-sm text-gray-500">Todavía no hay reseñas. Sé el primero en dejar una.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          bookId={bookId}
          isOwner={currentUserId !== null && review.userId.toString() === currentUserId}
        />
      ))}
    </ul>
  );
}
