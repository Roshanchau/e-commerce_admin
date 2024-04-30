/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assets.example.com',
            port: '3000',
            pathname: '/account123/**',
          },
        ],
      },
};

export default nextConfig;
