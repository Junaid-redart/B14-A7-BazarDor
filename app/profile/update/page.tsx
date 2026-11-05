import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-[#f1f7f2]">
      <Navbar />
      <PriceTicker />

      <div className="mx-auto max-w-xl px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900">
          তথ্য আপডেট করুন
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
        </p>

        <UpdateProfileForm currentName={session.user.name} />
      </div>
    </main>
  );
}
