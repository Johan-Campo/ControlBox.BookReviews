import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión — BookReviews",
};

export default function LoginPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Iniciar sesión</h1>
      <LoginForm />
      <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="rounded text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Regístrate
          </Link>
        </p>
        <Link
          href="/forgot-password"
          className="rounded text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </main>
  );
}
