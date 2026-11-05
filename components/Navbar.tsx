
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🫙" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dudh", icon: "🥛" },
  { name: "মসলা", slug: "moshla", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <Toaster position="top-center" />

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            width={40}
            height={40}
            className="rounded-lg"
          />

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500">
              নিত্যপ্রয়োজনীয় পণ্যের দাম
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
          ) : user ? (
            <details className="dropdown dropdown-end">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-50">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="Profile"
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <span className="hidden text-sm font-medium text-gray-800 sm:inline">
                  {user.name}
                </span>
                <span className="text-xs text-gray-500">⌄</span>
              </summary>

              <div className="dropdown-content z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                <p className="font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="mb-3 break-all text-xs text-gray-500">
                  {user.email}
                </p>

                <div className="border-t border-gray-100 pt-2">
                  <Link
                    href="/profile"
                    className="block rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    আমার প্রোফাইল
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full cursor-pointer rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    সাইন আউট
                  </button>
                </div>
              </div>
            </details>
          ) : (
            <>
              <Link
                href="/signin"
                className="btn btn-ghost btn-sm"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="btn btn-sm border-none bg-green-700 text-white hover:bg-green-800"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-4 py-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm ${
                pathname === `/category/${category.slug}`
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-green-50"
              }`}
            >
              {category.icon} {category.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
