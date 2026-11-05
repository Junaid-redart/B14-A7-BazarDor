
"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LinkGitHubButton() {
  const handleLink = async () => {
    const { error } = await authClient.linkSocial({
      provider: "github",
      callbackURL: "/profile",
    });

    if (error) {
      toast.error(error.message || "GitHub Account Link হয়নি");
    }
  };

  return (
    <button
      onClick={handleLink}
      className="btn mt-4 border-none bg-green-700 text-white"
    >
      GitHub Account Link করুন
    </button>
  );
}
