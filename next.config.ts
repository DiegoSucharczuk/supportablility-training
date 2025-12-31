import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No static export for Vercel - we need API routes to work
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
