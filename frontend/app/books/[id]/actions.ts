"use server";

import { revalidatePath } from "next/cache";
import { extractErrorMessage } from "@/lib/api-error";
import { getApiUrl } from "@/lib/api-url";
import { getSessionToken } from "@/lib/session";

export interface ReviewFormState {
  error: string | null;
}

export async function createReview(
  bookId: number,
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const token = await getSessionToken();
  if (!token) return { error: "Debes iniciar sesión para dejar una reseña." };

  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment"));

  const response = await fetch(`${getApiUrl()}/api/books/${bookId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rating, comment }),
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: extractErrorMessage(error, "No se pudo enviar la reseña.") };
  }

  revalidatePath(`/books/${bookId}`);
  return { error: null };
}
