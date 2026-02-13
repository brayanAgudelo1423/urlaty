import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  assetPrefix: "https://urlaty.online/", 
  trailingSlash: true,
  
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
