const path = require('path');
const rootPath = path.resolve(__dirname, '../src')
module.exports = {
  stories: ['../src/components/**/*.stories.(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        vueDocgenOptions: { alias: { '@': path.resolve(__dirname, '../src') }}
      }
    },
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-notes',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    '@storybook/addon-options',
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y',
    '@storybook/addon-contexts'
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      '@': rootPath,
      '~': rootPath,
      assets: rootPath + '/assets'
    })
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            // resources: path.resolve(__dirname,'../src/assets/css/style.scss')
            resources: `${rootPath}/assets/css/style.scss`
          },
        },      
      ],
      include: rootPath
    });
    return config;
  },
}
