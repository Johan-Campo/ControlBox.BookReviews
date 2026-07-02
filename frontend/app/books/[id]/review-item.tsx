"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { deleteReview, updateReview, type ReviewFormState } from "./actions";
import type { Review } from "@/lib/types/review";

interface ReviewItemProps {
  review: Review;
  bookId: number;
  isOwner: boolean;
}

const initialState: ReviewFormState = { error: null };

export function ReviewItem({ review, bookId, isOwner }: ReviewItemProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const boundUpdateReview = updateReview.bind(null, bookId, review.id);
  const [state, formAction, isPending] = useActionState(boundUpdateReview, initialState);

  const wasPending = useRef(false);
  useEffect(() => {
    if (wasPending.current && !isPending && state.error === null) {
      setIsEditing(false);
      router.refresh();
    }
    wasPending.current = isPending;
  }, [isPending, state.error, router]);

  async function handleDelete() {
    if (!confirm("¿Eliminar esta reseña? Esta acción no se puede deshacer.")) return;

    setIsDeleting(true);
    const result = await deleteReview(bookId, review.id);
    setIsDeleting(false);

    if (result.error) {
      setDeleteError(result.error);
      return;
    }

    router.refresh();
  }

  if (isEditing) {
    return (
      <li className="rounded-lg border border-gray-200 p-4">
        <form action={formAction} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor={`rating-${review.id}`} className="text-sm font-medium">
              Calificación
            </label>
            <select
              id={`rating-${review.id}`}
              name="rating"
              defaultValue={review.rating}
              className="w-24 rounded-md border border-gray-300 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={`comment-${review.id}`} className="text-sm font-medium">
              Comentario
            </label>
            <textarea
              id={`comment-${review.id}`}
              name="comment"
              defaultValue={review.comment}
              required
              minLength={10}
              maxLength={2000}
              rows={3}
              className="rounded-md border border-gray-300 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
          {state.error && (
            <p role="alert" className="text-sm text-red-600">
              {state.error}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {isPending ? "Guardando…" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">{review.username}</span>
        <span className="text-sm text-gray-500">★ {review.rating}</span>
      </div>
      <p className="mt-1 text-sm text-gray-700">{review.comment}</p>
      <p className="mt-2 text-xs text-gray-500">
        {new Date(review.createdAt).toLocaleDateString("es")}
        {review.updatedAt && " (editado)"}
      </p>
      {deleteError && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {deleteError}
        </p>
      )}
      {isOwner && (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            {isDeleting ? "Eliminando…" : "Eliminar"}
          </button>
        </div>
      )}
    </li>
  );
}
