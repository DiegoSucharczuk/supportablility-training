import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/supportablility-training',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
