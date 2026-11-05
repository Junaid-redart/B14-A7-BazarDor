import CategoryProducts from "@/components/CategoryProducts";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import type { Product } from "@/types/product";

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to load products");
    }

    const data = await res.json();

    if (Array.isArray(data)) return data as Product[];
    if (Array.isArray(data.products)) return data.products as Product[];
    if (Array.isArray(data.data)) return data.data as Product[];
    if (Array.isArray(data.data?.products)) {
      return data.data.products as Product[];
    }

    return [];
  } catch (error) {
    console.error("Category products error:", error);
    return [];
  }
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const products = await getProducts();

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  const category = categoryProducts[0];

  return (
    <main className="min-h-screen bg-[#f1f7f2]">
      <Navbar />
      <PriceTicker />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {categoryProducts.length === 0 ? (
          <div className="py-20 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              কোনো পণ্য পাওয়া যায়নি
            </h1>

            <p className="mt-3 text-gray-500">
              এই ক্যাটাগরিতে কোনো পণ্য নেই।
            </p>

            <Link
              href="/"
              className="btn mt-6 bg-green-700 text-white"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-6">
              <span className="text-4xl">
                {category.categoryIcon}
              </span>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {category.categoryNameBn}
                </h1>

                <p className="text-sm text-gray-500">
                  {categoryProducts.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
                </p>
              </div>
            </div>


            <CategoryProducts products={categoryProducts} />

          </>
        )}
      </div>
    </main>
  );
}
