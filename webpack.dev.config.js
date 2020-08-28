const commonWebpackConfig = require('./webpack.common.config.js')
const path = require('path');
const { merge } = require('webpack-merge');

module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: false,
    contentBase: [
      path.join(__dirname, "src/")
    ]
  },
  plugins: [
  ]
});