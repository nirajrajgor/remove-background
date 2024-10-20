/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/remove-background',
  basePath: '/remove-background',
};

export default nextConfig;
