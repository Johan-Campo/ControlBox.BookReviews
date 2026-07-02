import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <p className="text-gray-500">El contenido que buscas no existe o fue eliminado.</p>
      <Link
        href="/"
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
