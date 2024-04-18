/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "upload.wikimedia.org",
      "commons.wikimedia.org",
      "www.verizon.com",
    ],
  },
};

module.exports = nextConfig;
