const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: ['react-dom', 'react', 'react-router']
  },
  output: {
    path: path.resolve(__dirname, './js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
}