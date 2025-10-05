import { ApiLoginResult } from "@/types/auth";

const baseUrl: string = "https://bloggy-api.hadisamadzad.com/identity";

// Auth API functions
export async function login(email: string, password: string): Promise<ApiLoginResult> {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error(`Login failed: ${res.status} ${res.statusText}`);
  }

  const data: ApiLoginResult = await res.json();

  // Store tokens automatically after successful login
  setTokens(data.accessToken, data.refreshToken, {
    email: data.email,
    fullName: data.fullName
  });

  // Notify components of auth state change
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-change'));
  }

  return data;
}

export async function logout(): Promise<void> {
  // Clear tokens from localStorage
  clearTokens();

  // Notify components of auth state change
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-change'));
  }

  // Optionally call logout endpoint if your API has one
  // await fetch(`${baseUrl}/auth/logout`, { ... });
}// Token storage keys
const ACCESS_TOKEN_KEY = 'bloggy_access_token';
const REFRESH_TOKEN_KEY = 'bloggy_refresh_token';
const USER_INFO_KEY = 'bloggy_user_info';

// Token management functions
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getUserInfo(): { email: string; fullName: string } | null {
  if (typeof window === 'undefined') return null;
  const userInfo = localStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
}

export function setTokens(
  accessToken: string,
  refreshToken: string,
  userInfo: { email: string; fullName: string }): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
