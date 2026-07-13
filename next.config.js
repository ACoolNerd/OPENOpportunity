/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // Firebase Storage
      'firebasestorage.googleapis.com',
      // Allow external card images
      'images.pokemontcg.io',
    ],
  },
};

module.exports = nextConfig;
