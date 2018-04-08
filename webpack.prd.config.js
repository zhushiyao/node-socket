var path = require('path');

module.exports = {
  entry: [
    './app.js'
  ],
  output: { //出口
    path: path.resolve(__dirname, 'asset'), //line
    filename: 'bundle.js',
    publicPath: 'asset/' //line
  },
  mode: 'production',
  devtool: ''
}