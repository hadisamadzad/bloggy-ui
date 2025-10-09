/**
 * API Configuration
 * Centralized configuration for all API endpoints
 */

// Environment-based configuration
const getBaseUrl = (service: string): string => {
  const baseUrls = {
    // Production URLs
    production: {
      identity: "https://bloggy.hadisamadzad.com/api/identity",
      blog: "https://bloggy.hadisamadzad.com/api/blog",
    },
    // Development URLs
    development: {
      identity: "http://localhost:6001/api/identity",
      blog: "http://localhost:6001/api/blog",
    }
  };

  // Determine environment
  const env = process.env.NODE_ENV || 'production';
  const environment = env as keyof typeof baseUrls;

  // Get service URL
  const serviceUrls = baseUrls[environment] || baseUrls.production;
  return serviceUrls[service as keyof typeof serviceUrls] || serviceUrls.blog;
};

// Export configured URLs
export const API_CONFIG = {
  IDENTITY_BASE_URL: getBaseUrl('identity'),
  BLOG_BASE_URL: getBaseUrl('blog'),

  // You can also override with environment variables
  IDENTITY_API_URL: process.env.NEXT_PUBLIC_IDENTITY_API_URL || getBaseUrl('identity'),
  BLOG_API_URL: process.env.NEXT_PUBLIC_BLOG_API_URL || getBaseUrl('blog'),
};

// Export individual URLs for convenience
export const { IDENTITY_BASE_URL, BLOG_BASE_URL, IDENTITY_API_URL, BLOG_API_URL } = API_CONFIG;

// Export a function to get any base URL
export const getApiBaseUrl = (service: 'identity' | 'blog'): string => {
  return service === 'identity' ? IDENTITY_API_URL : BLOG_API_URL;
};

// Debug helper
export const logApiConfig = () => {
  console.log('API Configuration:', {
    NODE_ENV: process.env.NODE_ENV,
    IDENTITY_URL: IDENTITY_API_URL,
    BLOG_URL: BLOG_API_URL,
  });
};