"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({
  currentName,
}: {
  currentName: string;
}) {
  const router = useRouter();

  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newName = name.trim();

    if (!newName) {
      toast.error("নাম লিখুন");
      return;
    }

    if (newName === currentName) {
      toast.error("নাম পরিবর্তন করা হয়নি");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: newName,
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট হয়নি");
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="mt-6 rounded-xl border border-gray-200 bg-white p-6"
    >
      <label
        htmlFor="name"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        নাম
      </label>

      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input w-full bg-white text-gray-900"
        placeholder="আপনার নাম লিখুন"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="btn mt-5 w-full border-none bg-green-700 text-white hover:bg-green-800"
      >
        {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
      </button>

      <Link
        href="/profile"
        className="mt-4 block text-center text-sm text-gray-500 hover:text-green-700"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>
    </form>
  );
}
