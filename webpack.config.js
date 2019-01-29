const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/js/Game.js',
  output: {
    path: __dirname,
    publicPath: '/build',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
