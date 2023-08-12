/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images : {
    domains: ['localhost', 'image.tmdb.org'],
  }
};

module.exports = nextConfig;
