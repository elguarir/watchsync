/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images : {
    domains: ['localhost', 'image.tmdb.org', "www.themoviedb.org"],
  }
};

module.exports = nextConfig;
