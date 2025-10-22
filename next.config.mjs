/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 This is the key line for static export (replaces `next export`)
  //output: 'export',

  images: {
    remotePatterns: [
      { hostname: "swaecommain.swa.co" },
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
