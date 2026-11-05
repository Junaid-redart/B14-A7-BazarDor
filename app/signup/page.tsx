"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড দুটি মিলছে না");
            return;
        }

        if (password.length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
            });


            if (error) {
                console.error("Signup Error:", error);
                toast.error(error.message || "অ্যাকাউন্ট তৈরি হয়নি");
                return;
            }


            toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
            router.push("/signin");
        } catch {
            toast.error("সমস্যা হয়েছে, আবার চেষ্টা করুন");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f1f7f2]">
            <Toaster position="top-center" />
            <Navbar />
            <PriceTicker />

            <div className="mx-auto max-w-md px-4 py-12">
                <h1 className="text-center text-2xl font-bold text-gray-900">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>

                <p className="mt-2 text-center text-sm text-gray-500">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>

                <form
                    onSubmit={handleSignUp}
                    className="mt-6 rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 block text-sm text-gray-700">
                            নাম
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="input w-full bg-white text-gray-900"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="mb-2 block text-sm text-gray-700">
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

                    <div className="mb-4">
                        <label htmlFor="password" className="mb-2 block text-sm text-gray-700">
                            পাসওয়ার্ড
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="input w-full bg-white text-gray-900"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="mb-2 block text-sm text-gray-700">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="আবার লিখুন"
                            className="input w-full bg-white text-gray-900"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn w-full border-none bg-green-700 text-white hover:bg-green-800"
                    >
                        {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
                    </button>

                    <div className="divider text-sm text-gray-500">
                        অথবা
                    </div>

                    <div className="grid grid-cols-2 gap-3">

                        <button
                            type="button"
                            onClick={async () => {
                                const { error } = await authClient.signIn.social({
                                    provider: "google",
                                    callbackURL: "/",
                                });

                                if (error) {
                                    toast.error(error.message || "Google Login ব্যর্থ হয়েছে");
                                }
                            }}
                            className="btn btn-outline btn-sm"
                        >
                            Google দিয়ে চালিয়ে যান
                        </button>


                        <button
                            type="button"
                            onClick={async () => {
                                const { error } = await authClient.signIn.social({
                                    provider: "github",
                                    callbackURL: "/",
                                });

                                if (error) {
                                    toast.error(error.message || "GitHub Login ব্যর্থ হয়েছে");
                                }
                            }}
                            className="btn btn-outline btn-sm"
                        >
                            GitHub দিয়ে চালিয়ে যান
                        </button>

                    </div>

                    <p className="mt-5 text-center text-sm text-gray-600">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link href="/signin" className="text-green-700">
                            সাইন ইন করুন
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}
