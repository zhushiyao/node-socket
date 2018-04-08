var path = require('path');
module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './app.js'
  ],
  output: { //出口
    path: path.resolve(__dirname, '/'), //dev
    filename: 'bundle.js',
    publicPath: '/' //dev
  },
  mode: 'development',
  devtool: 'source-map'
}