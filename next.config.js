/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: "",
  output: "standalone",
};

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA(nextConfig);
