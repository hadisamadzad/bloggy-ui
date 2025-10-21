"use client";

import { useState, useEffect } from "react";
import { isAuthenticated, getLocalUserInfo } from "@/services/auth-api";
import { UserInfo, UserRole } from "@/types/auth";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);

      if (authenticated) {
        setUserInfo(getLocalUserInfo());
      } else {
        setUserInfo(null);
      }

      setIsLoading(false);
    };

    // Check initial status
    checkAuthStatus();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  // Check if user has admin privileges (Owner or Admin)
  const isAdmin = isLoggedIn && userInfo?.role && [UserRole.Owner, UserRole.Admin].includes(userInfo.role);

  return {
    isLoggedIn,
    userInfo,
    isLoading,
    isAuthenticated: isLoggedIn,
    isAdmin,
  };
}
