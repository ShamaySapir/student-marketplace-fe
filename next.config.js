/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  options: {
    sourcemaps: "development", // possible values can be production, development, or none
  },
  env: {
    NEXT_PUBLIC_MARKETPLACE_API: process.env.MARKETPLACE_API,
    NEXT_PUBLIC_MARKETPLACE_API_STRAPI: process.env.MARKETPLACE_API_STRAPI,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
