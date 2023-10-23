// const withPlugins = require('next-compose-plugins');
const dotenv = require('dotenv');

dotenv.config({ path: './.env.local' });

const configs = {
  // experimental: {
  //   appDir: true,
  // },
  images: {
    domains: [
      'i.imgur.com',
      'fastly.mintgate.app',
      'cdn.mintgate.app',
      'pngkey.com',
      'pikpng.com',
      'michaelwolf.co.uk',
      'www.pikpng.com',
      'abs.twimg.com',
      'twimg.com',
      'pbs.twimg.com',
      'mintgate.io',
      'www.pngkey.com',
      'mintgate.app',
    ],
  },
  productionBrowserSourceMaps: true,
  swcMinify: false, // does not work
};
let _config = configs;

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);
//if (process.env.NODE_ENV === 'production') {
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV !== 'production',
  dest: 'public',
  register: true,
  skipWaiting: true,
});
_config = withPWA(_config);
//}

if (process.env.ANALYZE || process.env.BUNDLE_ANALYZE) {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: 'true',
  });
  _config = withBundleAnalyzer(_config);
}

module.exports = _config;
