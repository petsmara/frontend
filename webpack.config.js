'use strict'

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: ['./app.js'],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          }
        ]
      },
      {
        test: /\.stories\.jsx?$/,
        loader: require.resolve('@storybook/source-loader'),
        include: [path.resolve(__dirname, '../src/components')],
        enforce: 'pre'
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}
