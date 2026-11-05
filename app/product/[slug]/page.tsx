import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import type { Product, ProductDetails } from "@/types/product";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";


const API_URL = "https://api.api-store.workers.dev/api/bazardor";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getProduct(slug: string) {
  try {
    // First find the product ID using its slug
    const res = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();

    const products: Product[] = Array.isArray(data)
      ? data
      : data.data?.products || data.products || data.data || [];

    const product = products.find((item) => item.slug === slug);

    if (!product) return null;

    // Get complete product details using its ID
    const detailsRes = await fetch(
      `${API_URL}/products/${product.id}`,
      { cache: "no-store" }
    );

    if (!detailsRes.ok) return null;

    const details = await detailsRes.json();

    const result = details.data?.product || details.data || details;

    return result as ProductDetails;
  } catch (error) {
    console.error("Product details error:", error);
    return null;
  }
}


export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

 
if (!session) {
  redirect("/signin?message=login-required");
}

  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets || [];

  const minPrice = markets.length
    ? Math.min(...markets.map((item) => item.min))
    : product.today;

  const maxPrice = markets.length
    ? Math.max(...markets.map((item) => item.max))
    : product.today;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, item) => total + (item.min + item.max) / 2,
        0
      ) / markets.length
    : product.today;

  const formatPrice = (price: number) =>
    price.toLocaleString("bn-BD", {
      maximumFractionDigits: 2,
    });

  const unitName =
    product.unit === "kg" ? "কেজি" :
    product.unit === "liter" ? "লিটার" :
    product.unit === "dozen" ? "ডজন" :
    product.unit === "piece" ? "পিস" : product.unit;

  return (
    <main className="min-h-screen bg-[#f1f7f2]">
      <Navbar />
      <PriceTicker />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          {" > "}
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          {" > "}
          {product.nameBn}
        </div>

        {/* Product Summary */}
        <section className="mb-6 flex flex-col justify-between gap-5 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[#f1f7f2] p-4 text-4xl">
              {product.image}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {unitName} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                গতকালের তুলনায় আজকের বাজারদর
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#f1f7f2] p-4 text-center">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <h2 className="text-3xl font-bold text-green-700">
              {formatPrice(product.today)}
            </h2>

            <p className="text-sm text-gray-500">
              টাকা / {unitName}
            </p>

            <p
              className={`mt-2 text-sm font-medium ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
              {formatPrice(product.change.pct)}%
            </p>
          </div>
        </section>

        {/* Price Statistics */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>
              <h3 className="mt-2 text-2xl font-bold text-green-700">
                {formatPrice(minPrice)} টাকা
              </h3>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">
                সর্বোচ্চ দাম
              </p>
              <h3 className="mt-2 text-2xl font-bold text-red-600">
                {formatPrice(maxPrice)} টাকা
              </h3>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>
              <h3 className="mt-2 text-2xl font-bold text-green-700">
                {formatPrice(averagePrice)} টাকা
              </h3>
            </div>
          </div>

          {/* Market Price Table */}
          <h2 className="mb-4 mt-8 text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-gray-700">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th>সর্বনিম্ন</th>
                  <th>সর্বোচ্চ</th>
                  <th>গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((item, index) => (
                  <tr key={index} className="text-gray-700">
                    <td>{item.market}</td>
                    <td>{item.division}</td>
                    <td>{formatPrice(item.min)} টাকা</td>
                    <td>{formatPrice(item.max)} টাকা</td>
                    <td>
                      {formatPrice((item.min + item.max) / 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {markets.length === 0 && (
              <p className="py-6 text-center text-gray-500">
                বাজারের তথ্য পাওয়া যায়নি।
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
