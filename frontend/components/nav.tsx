import Link from "next/link";
import { getSessionUser } from "@/lib/session";
import { AuthStatus } from "@/components/auth-status";

export async function Nav() {
  const user = await getSessionUser();

  return (
    <header className="flex flex-wrap items-center justify-between gap-y-2 border-b border-gray-200 px-6 py-4">
      <Link
        href="/"
        className="rounded text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        BookReviews
      </Link>
      <AuthStatus user={user} />
    </header>
  );
}
