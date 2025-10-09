"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/services/identity-api";

interface AuthGuardProps {
  children: React.ReactNode;
  fallbackPath?: string;
  loadingComponent?: React.ReactNode;
}

export default function AuthGuard({
  children,
  fallbackPath = "/login",
  loadingComponent,
}: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();

      if (!authenticated) {
        // Include current path as redirect parameter
        const redirectUrl = encodeURIComponent(pathname);
        router.push(`${fallbackPath}?redirect=${redirectUrl}`);
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    // Check auth status on mount
    checkAuth();

    // Listen for auth changes (login/logout)
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [router, fallbackPath, pathname]);

  if (isLoading) {
    return (
      loadingComponent || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="text-gray-600">Checking authentication...</p>
          </div>
        </div>
      )
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect, so don't render anything
  }

  return <>{children}</>;
}
