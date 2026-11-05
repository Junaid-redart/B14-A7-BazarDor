import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8">
      <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-gray-200 bg-white p-8 md:flex-row md:p-10">
        <div className="text-center md:text-left">
          <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            প্রতিদিনের বাজারদর
          </p>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-xl text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম
            এক জায়গায় দেখুন। বাজারের সর্বনিম্ন, সর্বোচ্চ এবং
            গড় দামের তথ্য জানুন সহজেই।
          </p>

          <a
            href="#সব-পণ্য"
            className="btn mt-6 border-none bg-green-700 text-white hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <Image
          src="/bazar-hero.png"
          alt="বাজারের সবজির ঝুড়ি"
          width={230}
          height={230}
          className="h-auto w-40 shrink-0 object-contain md:w-56"
          priority
        />
      </div>
    </section>
  );
}
