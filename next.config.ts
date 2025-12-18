import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  // NOTE: API routes won't work with static export
  output: 'export',
  basePath: isProd ? '/supportablility-training' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
