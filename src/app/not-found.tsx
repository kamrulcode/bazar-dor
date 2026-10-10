import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-extrabold text-emerald-600">404</p>

      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>

      <p className="mt-2 max-w-md text-gray-500">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have been moved or deleted.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
      >
        Back to Bazar Dor
      </Link>
    </main>
  );
}
