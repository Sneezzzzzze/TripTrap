const { withAmplifyAdapter } = require('@aws-amplify/adapter-nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

// Export with the Amplify adapter wrapper
module.exports = withAmplifyAdapter(nextConfig);
