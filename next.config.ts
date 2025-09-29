import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  env: {
    BASE_API: process.env.BASE_API
  },
  trailingSlash: false,
  /* config options here */
};

export default nextConfig;
