const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV, isProduction = NODE_ENV === "production";
const config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './js'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/js',
  },
  optimization: {
    minimize: isProduction,
    usedExports: true
  },
  mode: NODE_ENV,
  watch: !isProduction,
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', ['@babel/preset-env', { modules: false }]],
            plugins: [require('@babel/plugin-proposal-class-properties')]
          },
        }
      },
      {
        test: /\.css$/,
        exclude: /highlight\.js/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader', options: { modules: true } }
        ]
      },
      {
        test: /highlight\.js.*\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '../index.html',
      inject: 'head',
      scriptLoading: 'defer',
    })
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname)
    },
    port: 8080
  }
};


module.exports = config;