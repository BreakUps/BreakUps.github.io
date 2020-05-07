const path = require('path');

const NODE_ENV = process.env.NODE_ENV, isProduction = NODE_ENV === "production";
const config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname) + '/js',
    filename: 'bundle.js'
  },
  optimization: {
    minimize: isProduction
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
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [require('@babel/plugin-proposal-class-properties')]
          },
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules"
      },
    ]
  }
};


module.exports = config;