"use server";

import { revalidatePath } from "next/cache";
import { extractErrorMessage } from "@/lib/api-error";
import { getApiUrl } from "@/lib/api-url";
import { getSessionToken } from "@/lib/session";

export interface ProfileFormState {
  error: string | null;
}

export async function updateProfilePhoto(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const token = await getSessionToken();
  if (!token) return { error: "Debes iniciar sesión para editar tu perfil." };

  const rawUrl = String(formData.get("profilePhotoUrl") ?? "").trim();
  const profilePhotoUrl = rawUrl.length > 0 ? rawUrl : null;

  const response = await fetch(`${getApiUrl()}/api/users/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ profilePhotoUrl }),
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: extractErrorMessage(error, "No se pudo actualizar el perfil.") };
  }

  revalidatePath("/profile");
  return { error: null };
}
