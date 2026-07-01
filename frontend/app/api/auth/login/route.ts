import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { setSessionCookie } from "@/lib/session";
import type { AuthResponse, LoginRequest } from "@/lib/types/auth";

export async function POST(request: NextRequest) {
  const body: LoginRequest = await request.json();

  const apiResponse = await fetch(`${getApiUrl()}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!apiResponse.ok) {
    const error = await apiResponse.json();
    return NextResponse.json(error, { status: apiResponse.status });
  }

  const data: AuthResponse = await apiResponse.json();
  await setSessionCookie(data.token);

  return NextResponse.json({ username: data.username, email: data.email });
}
