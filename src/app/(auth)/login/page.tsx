"use client";

import { useState, FormEvent, Suspense } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/services/auth-api";
import { useRouter, useSearchParams } from "next/navigation";
import { getRedirectUrl, getSafeRedirectUrl } from "@/lib/redirect-utils";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = getRedirectUrl(searchParams);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // The service handles token storage automatically
      await login(email, password);

      // Redirect to intended page using safe redirect logic
      const targetUrl = getSafeRedirectUrl(redirectUrl, "/articles");
      router.push(targetUrl);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh items-center -m-6 justify-center">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-headline-lg">Sign in</h1>
          <p className="text-body-md text-neutral-500">
            Don’t have an account?{" "}
            <Link href="#" className="link">
              Sign up
            </Link>
          </p>
        </div>

        {redirectUrl && (
          <div className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              You&apos;ll be redirected to <strong>{redirectUrl}</strong> after
              login
            </span>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full h-12"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full h-12 pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-body-md">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm" />
              Remember password
            </label>
            <Link href="#" className="link text-neutral-500">
              Forgot password
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-block bg-black text-white hover:bg-gray-800 disabled:loading"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="divider">or</div>

        <div className="flex flex-col gap-4">
          <button className="btn btn-outline w-full h-12 flex items-center gap-2">
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
              width={20}
              height={20}
            />
            Sign in with Google
          </button>

          <button className="btn btn-outline w-full h-12 flex items-center gap-2">
            <Image
              src="https://www.svgrepo.com/show/503173/apple-logo.svg"
              alt="Apple"
              className="w-5 h-5"
              width={20}
              height={20}
            />
            Sign in with Apple ID
          </button>
        </div>
      </div>
    </div>
  );
}

function LoginPageFallback() {
  return (
    <div className="flex min-h-svh items-center -m-6 justify-center">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-headline-lg">Sign in</h1>
          <div className="loading loading-spinner loading-md mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageFallback />}>
      <LoginForm />
    </Suspense>
  );
}
