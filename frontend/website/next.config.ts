import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-e796496b65134e82b311969a354b7898.r2.dev",
      },
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/our-portfolio", destination: "/gallery", permanent: true },
      { source: "/portfolio", destination: "/gallery", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/get-a-quote", destination: "/contact", permanent: false },
      { source: "/blog", destination: "/gallery", permanent: false },
    ];
  },
};

export default nextConfig;
