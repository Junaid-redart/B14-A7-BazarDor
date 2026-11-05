
"use client";

import { useState, type FormEvent, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import LoginRedirectToast from "@/components/LoginRedirectToast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
      }
    } catch {
      toast.error("লগইন করতে সমস্যা হয়েছে");
    }
  };

  return (
    <main className="min-h-screen bg-[#f1f7f2]">
      <Toaster position="top-center" />

      <Suspense fallback={null}>
        <LoginRedirectToast />
      </Suspense>

      <Navbar />
      <PriceTicker />

      <div className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          সাইন ইন
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <form
          onSubmit={handleSignIn}
          className="mt-6 rounded-xl border border-gray-200 bg-white p-6"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-gray-700"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="input w-full bg-white text-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              placeholder="আপনার পাসওয়ার্ড"
              className="input w-full bg-white text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-none bg-green-700 text-white hover:bg-green-800"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>

          <div className="divider text-sm text-gray-500">
            অথবা
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="btn btn-outline btn-sm"
            >
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              className="btn btn-outline btn-sm"
            >
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-green-700">
              সাইন আপ করুন
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
