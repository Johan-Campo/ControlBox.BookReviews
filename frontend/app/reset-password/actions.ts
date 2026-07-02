"use server";

import { extractErrorMessage } from "@/lib/api-error";
import { getApiUrl } from "@/lib/api-url";

export interface ResetPasswordFormState {
  error: string | null;
  success: boolean;
}

export async function resetPassword(
  _prevState: ResetPasswordFormState,
  formData: FormData
): Promise<ResetPasswordFormState> {
  const token = String(formData.get("token") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");

  const response = await fetch(`${getApiUrl()}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: extractErrorMessage(error, "No se pudo restablecer la contraseña."), success: false };
  }

  return { error: null, success: true };
}
