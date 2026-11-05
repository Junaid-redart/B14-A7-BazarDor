import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f7f2] px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-green-700">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="mt-3 text-gray-500">
          আপনি যে পেজটি খুঁজছেন সেটি এখানে নেই।
        </p>

        <Link
          href="/"
          className="btn mt-6 border-none bg-green-700 text-white hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
