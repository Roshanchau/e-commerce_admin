/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dyq7iqdyc/image/upload/**',
      },
    ],
  },
};

export default nextConfig;
