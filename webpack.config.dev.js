const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.ts',
    style: './style.css',
  },
  devServer: {
    static: 'dist',
    port: 3000,
    hot: false,
    liveReload: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '*.html',
          to: '[name].[ext]',
          context: './',
        },
        {
          from: 'assets/**/*',
          to: 'assets',
          globOptions: {
            ignore: ['**/README'],
          },
        },
      ],
    }),
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@assets': path.resolve(__dirname, 'assets')
    }
  },
};
