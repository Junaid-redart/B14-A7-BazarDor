"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products];

  if (sortBy === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sortBy === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
        <h2 className="font-semibold text-gray-900">
          পণ্যের তালিকা
        </h2>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600">
            সাজান
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-sm bg-white text-gray-800"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500">
        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
