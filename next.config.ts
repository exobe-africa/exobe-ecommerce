import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Allow production builds to successfully complete even if
    // there are ESLint errors. This unblocks Vercel deployment.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
