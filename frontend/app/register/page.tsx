import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Register — BookReviews",
};

export default function RegisterPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <RegisterForm />
      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="rounded text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Sign in
        </Link>
      </p>
    </main>
  );
}
