"use client";

import { useState, useEffect } from "react";
import { isAuthenticated, getLocalUserInfo } from "@/services/auth-api";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    email: string;
    fullName: string;
    userId?: string;
  } | null>(null);
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

  return {
    isLoggedIn,
    userInfo,
    isLoading,
    isAuthenticated: isLoggedIn,
  };
}
