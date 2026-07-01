import Link from "next/link";
import { getSessionUser } from "@/lib/session";
import { AuthStatus } from "@/components/auth-status";

export async function Nav() {
  const user = await getSessionUser();

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <Link href="/" className="text-lg font-bold">
        BookReviews
      </Link>
      <AuthStatus user={user} />
    </header>
  );
}
