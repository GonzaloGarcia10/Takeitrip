import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local dev origin for HMR when accessing from other devices on the LAN
  allowedDevOrigins: ["192.168.18.67"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cf.bstatic.com",
      },
      {
        protocol: "https",
        hostname: "q-xx.bstatic.com",
      },
    ],
  },
};

export default nextConfig;
