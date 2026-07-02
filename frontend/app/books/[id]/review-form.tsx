"use client";

import { useActionState } from "react";
import { createReview, type ReviewFormState } from "./actions";

interface ReviewFormProps {
  bookId: number;
}

const initialState: ReviewFormState = { error: null };

export function ReviewForm({ bookId }: ReviewFormProps) {
  const action = createReview.bind(null, bookId);
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold">Leave a review</h3>

      <div className="flex flex-col gap-1">
        <label htmlFor="rating" className="text-sm font-medium">
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          defaultValue="5"
          className="w-24 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="comment" className="text-sm font-medium">
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          required
          minLength={10}
          maxLength={2000}
          rows={3}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}
