"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordReset, type ForgotPasswordFormState } from "./actions";

const initialState: ForgotPasswordFormState = { message: null, resetToken: null, error: null };

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, initialState);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            required
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
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {isPending ? "Enviando…" : "Enviar enlace de restablecimiento"}
        </button>
      </form>

      {state.message && (
        <div role="status" className="rounded-md border border-gray-200 p-4 text-sm">
          <p className="text-gray-700">{state.message}</p>
          {state.resetToken && (
            <>
              <p className="mt-2 text-xs text-gray-500">
                No hay un servicio de email configurado en este proyecto (modo desarrollo), así
                que el enlace se muestra aquí directamente:
              </p>
              <Link
                href={`/reset-password?token=${state.resetToken}`}
                className="mt-1 block break-all text-blue-600 hover:underline"
              >
                Restablecer mi contraseña
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
