"use client";

import { useActionState } from "react";
import { updateProfilePhoto, type ProfileFormState } from "./actions";

interface ProfilePhotoFormProps {
  currentPhotoUrl: string | null;
}

const initialState: ProfileFormState = { error: null };

export function ProfilePhotoForm({ currentPhotoUrl }: ProfilePhotoFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfilePhoto, initialState);

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="profilePhotoUrl" className="text-sm font-medium">
          URL de la foto de perfil
        </label>
        <input
          id="profilePhotoUrl"
          name="profilePhotoUrl"
          type="url"
          placeholder="https://ejemplo.com/mi-foto.jpg"
          defaultValue={currentPhotoUrl ?? ""}
          className="rounded-md border border-gray-300 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        {isPending ? "Guardando…" : "Guardar foto"}
      </button>
    </form>
  );
}
