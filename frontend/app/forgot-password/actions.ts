"use server";

import { extractErrorMessage } from "@/lib/api-error";
import { getApiUrl } from "@/lib/api-url";
import type { ForgotPasswordResponse } from "@/lib/types/auth";

export interface ForgotPasswordFormState {
  message: string | null;
  resetToken: string | null;
  error: string | null;
}

export async function requestPasswordReset(
  _prevState: ForgotPasswordFormState,
  formData: FormData
): Promise<ForgotPasswordFormState> {
  const email = String(formData.get("email") ?? "");

  const response = await fetch(`${getApiUrl()}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      message: null,
      resetToken: null,
      error: extractErrorMessage(error, "No se pudo procesar la solicitud."),
    };
  }

  const data: ForgotPasswordResponse = await response.json();
  return { message: data.message, resetToken: data.resetToken, error: null };
}
