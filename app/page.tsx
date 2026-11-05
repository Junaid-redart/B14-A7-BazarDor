
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";


const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.products)) return data.products;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.data?.products)) {
      return data.data.products;
    }

    return [];
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f1f7f2]">
      <Navbar />
      <PriceTicker />
      <Hero />

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
        <section>
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            🔺 আজ দাম বেড়েছে
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            🔻 আজ দাম কমেছে
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section id="সব-পণ্য" className="scroll-mt-6">
          <h2 className="text-xl font-bold text-gray-900">
            সব পণ্য
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            আজকের বাজারে নিত্যপ্রয়োজনীয় পণ্যের দাম
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
