import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  output: "export",
  trailingSlash: true,
  images: {
    deviceSizes: [480, 800, 1200],
    imageSizes: [],
  },
};

export default nextConfig;
