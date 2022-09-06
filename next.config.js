/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      { source: "/", destination: "/root" },
      { source: "/admin", destination: "/admin/root" },
    ];
  },
  experimental: {
    nftTracing: true,
  },
};

module.exports = nextConfig;
