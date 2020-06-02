const path = require('path');

const NODE_ENV = process.env.NODE_ENV, isProduction = NODE_ENV === "production";
const config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname) + '/js',
    filename: 'bundle.js'
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
        loader: "style-loader!css-loader?modules"
      },
      {
        test: /highlight\.js.*\.css$/,
        loader: "style-loader!postcss-loader"
      }
    ]
  }
};


module.exports = config;