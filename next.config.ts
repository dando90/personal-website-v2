import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    deviceSizes: [480, 800, 1200],
    imageSizes: [],
  },
};

export default nextConfig;
