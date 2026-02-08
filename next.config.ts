import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/urlaty",
  assetPrefix: "/urlaty", 
  trailingSlash: true,
  
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
