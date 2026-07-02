import "server-only";
import { getApiUrl } from "@/lib/api-url";
import type { UserProfile } from "@/lib/types/user";

export async function getMyProfile(token: string): Promise<UserProfile | null> {
  const response = await fetch(`${getApiUrl()}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Failed to load profile.");

  return response.json();
}
