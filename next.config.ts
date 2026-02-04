import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/urlaty",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
