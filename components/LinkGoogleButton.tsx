
"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LinkGoogleButton() {
  const handleLink = async () => {
    const { error } = await authClient.linkSocial({
      provider: "google",
      callbackURL: "/profile",
    });

    if (error) {
      toast.error(error.message || "Google Account Link হয়নি");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLink}
      className="btn mt-4 border-none bg-green-700 text-white"
    >
      Google Account Link করুন
    </button>
  );
}
