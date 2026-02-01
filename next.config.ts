import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // No rewrites needed - Kong handles /api/* routing
  // Dev: https://dev.lumie0213.kro.kr → Kong → lumie-dev services
  // Prod: https://lumie0213.kro.kr → Kong → production services
};

export default nextConfig;
