"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SessionUser } from "@/lib/types/auth";

interface AuthStatusProps {
  user: SessionUser | null;
}

export function AuthStatus({ user }: AuthStatusProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4 text-sm">
        <Link href="/login" className="hover:underline">
          Sign in
        </Link>
        <Link
          href="/register"
          className="rounded-md bg-blue-600 px-3 py-1.5 font-medium text-white hover:bg-blue-700"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="text-gray-600">
        Hi, <span className="font-medium text-gray-900">{user.username}</span>
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-md border border-gray-300 px-3 py-1.5 font-medium hover:bg-gray-50"
      >
        Log out
      </button>
    </div>
  );
}
