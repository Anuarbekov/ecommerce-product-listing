import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["via.assets.so"], // Allow loading images from this domain
  },
};

export default nextConfig;
