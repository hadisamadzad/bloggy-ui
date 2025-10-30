"use client";

import { logout } from "@/services/auth-api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function AdminBar() {
  const { isLoggedIn, userInfo } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("auth-change"));

    // Redirect to home page
    router.push("/articles");
  };

  // Don't render anything if user is not logged in
  if (!isLoggedIn || !userInfo) {
    return null;
  }

  return (
    <div className="bg-gray-200 border-b border-gray-200 h-[30px] px-4 flex items-center justify-between text-sm">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-green-700 rounded-full"></div>
        <span>
          Logged in as <strong>{userInfo.fullName}</strong> ({userInfo.email})
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/articles"
          className=" hover:underline transition-colors cursor-pointer"
        >
          Home
        </Link>
        {" | "}
        <Link
          href="/articles/new"
          className=" hover:underline transition-colors cursor-pointer"
        >
          {" "}
          New Article
        </Link>
        {" | "}
        <Link
          href="/articles/manage"
          className=" hover:underline transition-colors cursor-pointer"
        >
          Manage Articles
        </Link>
        {" | "}
        <Link
          href="/tags"
          className=" hover:underline transition-colors cursor-pointer"
        >
          Manage Tags
        </Link>
        {" | "}
        <Link
          href="/settings"
          className=" hover:underline transition-colors cursor-pointer"
        >
          Settings
        </Link>
        {" | "}
        <button
          onClick={handleLogout}
          className="text-red-700 hover:underline transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
