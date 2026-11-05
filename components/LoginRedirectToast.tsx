"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginRedirectToast() {
  const searchParams = useSearchParams();

  const message = searchParams.get("message");

  useEffect(() => {
    if (message === "login-required") {
      toast.error("বিস্তারিত দাম দেখতে আগে সাইন ইন করুন");
    }
  }, [message]);

  return null;
}
