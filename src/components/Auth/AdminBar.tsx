"use client";

import { useState, useEffect } from "react";
import {
  isAuthenticated,
  getLocalUserInfo,
  logout,
} from "@/services/identity-api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    email: string;
    fullName: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);

      if (authenticated) {
        setUserInfo(getLocalUserInfo());
      } else {
        setUserInfo(null);
      }
    };

    // Check initial status
    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events when login/logout happens in same tab
    window.addEventListener("auth-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setUserInfo(null);

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
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
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
          New Article
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
