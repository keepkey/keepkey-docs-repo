const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

module.exports = withNextra({
  images: {
    domains: ['miro.medium.com','www.keepkey.com'],
  },
  // You might have other configurations here
});
