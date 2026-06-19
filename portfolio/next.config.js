/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placehold.co"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 1080],
  },
};

module.exports = nextConfig;