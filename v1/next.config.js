/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
}

module.exports = {
  // webpack: (config) => {
  //   config.experiments = config.experiments || {};
  //   config.experiments.topLevelAwait = true;
  //   return config;
  // },
  nextConfig,
  images: {
    domains: ["images.unsplash.com","cdn-icons-png.flaticon.com","cdn2.iconfinder.com"]
 }
}
