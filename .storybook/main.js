const path = require('path');
const rootPath = path.resolve(__dirname, '../src')

console.log(path.resolve(__dirname,'../src/assets/css/style.scss'))
console.log(rootPath)

module.exports = {
  stories: ['../src/components/**/*.stories.(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        // naming could get better, someone help me :(
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
    console.log('@/assets/css/style.scss')
    console.log(`@/assets/css/style.scss`)
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: path.resolve(__dirname,'../src/assets/css/style.scss')
            // resources: ['@/assets/css/style.scss']
          },
        },      
      ],
      include: rootPath
    });

    // Return the altered config
    return config;
  },
}
