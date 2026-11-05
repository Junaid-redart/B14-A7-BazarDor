
const prices = [
  { name: "স্বর্ণমাছি চাল", price: 148, unit: "কেজি", change: 2.1 },
  { name: "মিনিকেট চাল", price: 99, unit: "কেজি", change: -2.9 },
  { name: "পেঁয়াজ", price: 54, unit: "কেজি", change: 1.5 },
  { name: "আলু", price: 58, unit: "কেজি", change: -1.8 },
  { name: "ডিম", price: 158, unit: "ডজন", change: 3.2 },
];

export default function PriceTicker() {
  return (
    <div className="overflow-hidden border-b border-gray-200 bg-white py-3">
      <div className="ticker flex w-max gap-8">
        {[...prices, ...prices].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 whitespace-nowrap text-sm"
          >
            <span>🛒 {item.name}</span>

            <span className="text-gray-600">
              {item.price.toLocaleString("bn-BD")} টাকা/{item.unit}
            </span>

            <span
              className={
                item.change > 0 ? "text-red-600" : "text-green-600"
              }
            >
              {item.change > 0 ? "▲" : "▼"}{" "}
              {Math.abs(item.change).toLocaleString("bn-BD")}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
