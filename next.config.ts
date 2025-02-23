import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.ctfassets.net",
        protocol: "https",
        pathname: "/**",
        search: "",
        port: "",
      },
    ],
  },
  experimental: {
    ppr: "incremental",
    authInterrupts: true,
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default nextConfig;
