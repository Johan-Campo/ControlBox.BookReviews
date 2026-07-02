import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Recuperar contraseña — BookReviews",
};

export default function ForgotPasswordPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Recuperar contraseña</h1>
      <ForgotPasswordForm />
      <p className="text-sm text-gray-500">
        <Link
          href="/login"
          className="rounded text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Volver a iniciar sesión
        </Link>
      </p>
    </main>
  );
}
