/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      // Local Strapi development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Production Strapi (update with your production domain)
      {
        protocol: 'https',
        hostname: '*.railway.app',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.render.com',
        pathname: '/uploads/**',
      },
      // Cloudinary (if using as Strapi upload provider)
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // Add your production Strapi domain here
      // {
      //   protocol: 'https',
      //   hostname: 'your-strapi-domain.com',
      //   pathname: '/uploads/**',
      // },
    ],
  },
}

export default nextConfig
