/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@heroui/link', '@heroui/button', 'react', 'react-dom'],
  },
}

module.exports = nextConfig
