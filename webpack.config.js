const webpack = require('webpack')
const { join, resolve } = require('path')
const { readFileSync } = require('fs')
const DirectoryNamedPlugin = require('directory-named-webpack-plugin')

module.exports = {
  entry: join(__dirname, 'index.js'),
  resolve: {
    plugins: [new DirectoryNamedPlugin(true)],
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: 'prettier-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/plugin-proposal-class-properties",
            ]
          }
        }
      },
    ]
  }
}
