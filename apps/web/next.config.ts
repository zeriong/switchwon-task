import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://exchange-example.switchflow.biz/:path*',
      },
    ];
  },
};

export default nextConfig;
