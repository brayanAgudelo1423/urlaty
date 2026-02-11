import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
 
  assetPrefix: "/urlaty", 
  trailingSlash: true,
  
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
