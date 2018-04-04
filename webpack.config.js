const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './app.js'
  ],
  output: { //出口
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].bundle.js'
    filename: 'bundle.js',
    publicPath: '/'
  },
  // debug: true,
  mode: 'development',
  module: {
    rules: [{
        test: /\.(js|jsx)$/, //处理文件的正则，匹配js|jsx,
        exclude: /node_modules/, //屏蔽文件
        loaders: ['babel-loader']
        // loader: 'babel-loader' // 加载器
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf)$/i,
        use: [
          // 'url-loader?limit=80000',
          'img-loader',
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './index.html'
    // }),
    new webpack.HotModuleReplacementPlugin(),
    // 默认会把所有入口节点的公共代码提取出来,生成一个common.js  
    //new webpack.optimize.CommonsChunkPlugin('common'),  
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ],
  //由于压缩后的代码不易于定位错误，配置该项后发生错误时即可采用source-map的形式直接显示你出错代码的位置  
  devtool: 'source-map',
  //其它解决方案配置  
  resolve: {
    // 配置简写，配置过后，书写该文件路径的时候可以省略文件后缀。如require("common")  
    extensions: ['.js', '.jsx'],
    alias: {
      js: path.resolve(__dirname, 'src/js'),
      css: path.resolve(__dirname, 'src/css'),
      component: path.resolve(__dirname, 'src/component'),
    }
  }
  // ,
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // }
}