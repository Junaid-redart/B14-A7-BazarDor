
import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
};

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const unitName =
    product.unit === "kg" ? "কেজি" :
    product.unit === "liter" ? "লিটার" :
    product.unit === "dozen" ? "ডজন" :
    product.unit === "piece" ? "পিস" : product.unit;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#f1f7f2] p-3 text-2xl">
          {product.image}
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            {product.nameBn}
          </h3>
          <p className="text-sm text-gray-500">
            প্রতি {unitName}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <h2 className="text-xl font-bold text-gray-900">
            {product.today.toLocaleString("bn-BD")} টাকা
          </h2>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-xs ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {product.change.pct.toLocaleString("bn-BD")}%
        </span>
      </div>
    </Link>
  );
}
