import type { NextConfig } from "next";
import withPlaicehodler from "@plaiceholder/next";

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
};

export default withPlaicehodler(nextConfig);
