const amplifyAdapter = require('@aws-amplify/adapter-nextjs');

console.log('Amplify Adapter exports:', Object.keys(amplifyAdapter));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
