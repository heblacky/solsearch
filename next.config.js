/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@heroui/link', '@heroui/button', 'react', 'react-dom'],
  },
}

module.exports = nextConfig
