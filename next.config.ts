import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',  // Allows any path under i.pravatar.cc
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',  // Allows any path under picsum.photos
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',  // Allows any path under picsum.photos
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/**',  // Allows any path under picsum.photos
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',  // Allows any path under picsum.photos
      },
    ]
  },
};

export default nextConfig;
