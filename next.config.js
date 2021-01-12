const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const { compose } = require('ramda');

const getApiBaseUrl = () => {
  try {
    // eslint-disable-next-line global-require
    const { API_BASE_URL } = require('./env.js');
    return API_BASE_URL;
  } catch (error) {
    return '';
  }
};

module.exports = compose(withFonts, withSass, withCSS)({
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
  env: {
    API_BASE_URL: getApiBaseUrl() || 'https://localhost:5000'
  },
  basePath: '',
  assetPrefix: '',
  images: {
    domains: ['images.unsplash.com'],
  },
});

