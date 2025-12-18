import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Disable 'export' for local development to enable API routes
  // Re-enable for GitHub Pages deployment (but API won't work there)
  // output: 'export',
  basePath: isProd ? '/supportablility-training' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
