import "server-only";
import { cookies } from "next/headers";
import type { SessionUser } from "@/lib/types/auth";

const SESSION_COOKIE = "session";

const JWT_CLAIM = {
  ID: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
  USERNAME: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
  EMAIL: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
} as const;

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // matches backend JWT expiry (7 days)
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const token = await getSessionToken();
  if (!token) return null;
  return decodeJwtPayload(token);
}

function decodeJwtPayload(token: string): SessionUser | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  let payload: unknown;
  try {
    payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8"));
  } catch {
    return null;
  }

  if (!isJwtClaims(payload)) return null;

  return {
    id: payload[JWT_CLAIM.ID],
    username: payload[JWT_CLAIM.USERNAME],
    email: payload[JWT_CLAIM.EMAIL],
  };
}

function isJwtClaims(
  value: unknown
): value is Record<(typeof JWT_CLAIM)[keyof typeof JWT_CLAIM], string> {
  if (typeof value !== "object" || value === null) return false;
  return (
    JWT_CLAIM.ID in value &&
    JWT_CLAIM.USERNAME in value &&
    JWT_CLAIM.EMAIL in value
  );
}
