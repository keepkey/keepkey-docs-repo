const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

module.exports = withNextra({
  images: {
    domains: ['keepkey.info','www.keepkey.info','www.keepkey.com'],
  },
  // You might have other configurations here
});
