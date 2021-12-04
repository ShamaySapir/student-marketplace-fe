/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  options: {
    sourcemaps: "development", // possible values can be production, development, or none
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
