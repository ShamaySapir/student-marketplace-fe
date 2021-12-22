/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  options: {
    sourcemaps: "development", // possible values can be production, development, or none
  },
  env: {
    RPC_URL_1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
    RPC_URL_4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
    FORTMATIC_API_KEY: "pk_test_A6260FCBAA2EBDFB",
    MAGIC_API_KEY: "pk_test_398B82F5F0E88874",
    PORTIS_DAPP_ID: "e9be171c-2b7f-4ff0-8db9-327707511ee2",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
