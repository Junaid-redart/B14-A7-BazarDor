
"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Failed to load products");
        }

        const data = await res.json();

        const productList = Array.isArray(data)
          ? data
          : data.data?.products || data.products || data.data || [];

        if (Array.isArray(productList)) {
          setProducts(productList);
        }
      } catch (error) {
        console.error("Ticker error:", error);
      }
    }

    loadProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="border-b border-gray-200 bg-white py-3 text-center text-sm text-gray-500">
        বাজারদর লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="overflow-hidden border-b border-gray-200 bg-white py-3">
      <div className="ticker flex w-max gap-8">
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm"
          >
            <span>
              {product.image} {product.nameBn}
            </span>

            <span className="text-gray-600">
              {product.today.toLocaleString("bn-BD")} টাকা
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                  ? "text-green-600"
                  : "text-gray-500"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
              {product.change.pct.toLocaleString("bn-BD")}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
