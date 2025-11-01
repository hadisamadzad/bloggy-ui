/**
 * Utility functions for handling authentication redirects
 */

/**
 * Creates a login URL with redirect parameter
 * @param redirectPath - The path to redirect to after login
 * @returns Login URL with redirect parameter
 */
export function createLoginUrl(redirectPath: string): string {
  const encodedRedirect = encodeURIComponent(redirectPath);
  return `/login?redirect=${encodedRedirect}`;
}

/**
 * Gets the redirect URL from search parameters
 * @param searchParams - URLSearchParams object
 * @returns Decoded redirect URL or null if not present
 */
export function getRedirectUrl(searchParams: URLSearchParams): string | null {
  const redirect = searchParams.get('redirect');
  return redirect ? decodeURIComponent(redirect) : null;
}

/**
 * Validates if a redirect URL is safe (internal to the app)
 * @param url - The URL to validate
 * @returns True if URL is safe for redirect
 */
export function isSafeRedirectUrl(url: string): boolean {
  // Only allow relative URLs or URLs that start with the current origin
  if (url.startsWith('/')) {
    return true;
  }

  if (typeof window !== 'undefined') {
    try {
      const redirectUrl = new URL(url);
      const currentOrigin = window.location.origin;
      return redirectUrl.origin === currentOrigin;
    } catch {
      return false;
    }
  }

  return false;
}

/**
 * Gets a safe redirect URL, defaulting to fallback if unsafe
 * @param url - The URL to validate
 * @param fallback - Fallback URL if the original is unsafe
 * @returns Safe redirect URL
 */
export function getSafeRedirectUrl(url: string | null, fallback: string = '/'): string {
  if (!url) return fallback;
  return isSafeRedirectUrl(url) ? url : fallback;
}