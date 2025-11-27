/** @type {import('next').NextConfig} */  
const nextConfig = {
    // output: "export",   // REQUIRED for static export

  images: {
    remotePatterns: [
      {
        hostname: "swaecommain.swa.co",
      },
      { hostname: "swaecomordermain.swa.co" },
      { hostname: "swaordernewtest.zinfog.in" },
      { hostname: "swadiamonds.com" },
    ],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons"],
  },
};

export default nextConfig;
