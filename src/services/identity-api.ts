import { ApiLoginResult } from "@/types/auth";

const baseUrl: string = "https://bloggy.hadisamadzad.com/api/identity";

// Auth API functions
export async function login(email: string, password: string): Promise<ApiLoginResult> {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include', // Important: Include cookies in request
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    // Clear any existing tokens on login failure for security
    // This ensures we don't keep potentially stale/invalid tokens
    clearTokens();

    // Notify components of auth state change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('auth-change'));
    }

    throw new Error(`Login failed: ${res.status} ${res.statusText}`);
  }

  const data: ApiLoginResult = await res.json();

  // Store only access token and user info in localStorage
  // Refresh token will be in httpOnly cookie set by server
  setTokens(data.accessToken, {
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
  // Clear local tokens immediately for better UX
  clearTokens();

  // Notify components of auth state change immediately
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-change'));
  }

  // Then try to call server logout to invalidate httpOnly cookie
  // This is fire-and-forget to avoid blocking the logout UX
  try {
    await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      credentials: 'include', // Include httpOnly cookie for server to invalidate
    });
  } catch (error) {
    console.warn('Server logout failed, but local logout succeeded:', error);
    // Note: httpOnly refresh token will remain valid until natural expiration
  }
}

// Add token refresh functionality using httpOnly cookie
export async function refreshAccessToken(): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include', // This sends the httpOnly cookie automatically
    });

    if (!res.ok) {
      // Refresh failed, clear tokens
      clearTokens();
      return false;
    }

    // Refresh endpoint returns only { accessToken: string }
    const data: { accessToken: string } = await res.json();

    // We only update the access token, keep existing user info
    const existingUserInfo = getLocalUserInfo();
    if (existingUserInfo) {
      setTokens(data.accessToken, existingUserInfo);
    } else {
      // If no user info exists, clear everything
      clearTokens();
      return false;
    }

    return true;
  } catch {
    clearTokens();
    return false;
  }
}

// Add authenticated fetch wrapper
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getLocalAccessToken();

  if (!token) {
    throw new Error('Authentication required');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Include cookies for refresh token
  });

  // If token is expired/invalid, try refresh once
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const newToken = getLocalAccessToken();
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${newToken}`,
        },
        credentials: 'include',
      });
    } else {
      // Refresh failed, redirect to login
      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Authentication failed');
    }
  }

  return response;
}

// Token storage keys
const ACCESS_TOKEN_KEY = 'bloggy_access_token';
const USER_INFO_KEY = 'bloggy_user_info';

// Token management functions
export function getLocalAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getLocalUserInfo(): { email: string; fullName: string } | null {
  if (typeof window === 'undefined') return null;
  const userInfo = localStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
}

export function setTokens(
  accessToken: string,
  userInfo: { email: string; fullName: string }): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  // Remove manual expiry - let 401 responses handle token expiration
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
  // Remove expiry cleanup since we're not storing it anymore
}

export function isAuthenticated(): boolean {
  // Simply check if we have an access token
  // Let API calls handle token expiry with 401 responses
  return !!getLocalAccessToken();
}

// Utility function to decode JWT token (optional, for debugging)
export function getTokenExpiry(token?: string): Date | null {
  try {
    const accessToken = token || getLocalAccessToken();
    if (!accessToken) return null;

    // JWT tokens have 3 parts separated by dots
    const parts = accessToken.split('.');
    if (parts.length !== 3) return null;

    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));

    // JWT exp is in seconds, convert to milliseconds
    return payload.exp ? new Date(payload.exp * 1000) : null;
  } catch {
    return null;
  }
}

// Check if refresh token is available (by attempting refresh)
export async function hasValidRefreshToken(): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/auth/refresh`, {
      method: "POST",
      credentials: 'include',
    });
    return res.ok;
  } catch {
    return false;
  }
}