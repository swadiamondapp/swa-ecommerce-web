/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "swaecommain.swa.co",
      },
      { hostname: "swaecomordermain.swa.co" },
      { hostname: "swaordernewtest.zinfog.in" },
    ],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons"],
  },
};

export default nextConfig;
