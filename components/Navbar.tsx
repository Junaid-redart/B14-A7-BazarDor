"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            width={40}
            height={40}
            className="rounded-lg"
          />

          <div>
            <h1 className="font-bold text-xl text-gray-900">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500">
              নিত্যপ্রয়োজনীয় পণ্যের দাম
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/signin" className="btn btn-ghost btn-sm">
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn btn-success btn-sm text-white"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <nav className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex gap-3 overflow-x-auto py-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap ${pathname === `/category/${category.slug}`
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
