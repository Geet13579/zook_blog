/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['thehit.rototransindia.com', 'img.youtube.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  distDir: "build",
  
};

module.exports = nextConfig;
