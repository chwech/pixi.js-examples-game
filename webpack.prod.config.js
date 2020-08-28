const commonWebpackConfig = require('./webpack.common.config.js')
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(commonWebpackConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets/images/',
          to:'assets/images/',
          flatten: false
        }
      ],
      options: {
      }
    })
  ]
});