import "server-only";
import { getApiUrl } from "@/lib/api-url";
import type { Review } from "@/lib/types/review";

export async function getReviews(bookId: number): Promise<Review[]> {
  const response = await fetch(`${getApiUrl()}/api/books/${bookId}/reviews`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to load reviews.");

  return response.json();
}
