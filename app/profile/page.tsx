
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import { auth } from "@/lib/auth";
import LinkGoogleButton from "@/components/LinkGoogleButton";
import LinkGitHubButton from "@/components/LinkGitHubButton";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/signin");
    }

    const user = session.user;

    return (
        <main className="min-h-screen bg-[#f1f7f2]">
            <Navbar />
            <PriceTicker />

            <div className="mx-auto max-w-3xl px-4 py-12">
                <h1 className="text-2xl font-bold text-gray-900">
                    আমার প্রোফাইল
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>

                <div className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {user.name}
                        </h2>

                        <p className="break-all text-sm text-gray-500">
                            {user.email}
                        </p>
                    </div>

                    <Link
                        href="/profile/update"
                        className="btn btn-outline btn-sm border-green-700 text-green-700"
                    >
                        তথ্য আপডেট করুন
                    </Link>
                </div>
                <LinkGoogleButton />
                <LinkGitHubButton />
            </div>
        </main>
    );
}
