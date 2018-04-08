var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
var MODE = process.env.NODE_ENV;

var CONFIG = MODE == 'development' ? require('./webpack.dev.config') : require('./webpack.prd.config');

module.exports = {
  entry: CONFIG.entry,
  output: CONFIG.output,
  // debug: true,
  mode: CONFIG.mode,
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
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production', // Disable during development
      pngquant: {
        quality: '95-100'
      }
    })
  ],
  //由于压缩后的代码不易于定位错误，配置该项后发生错误时即可采用source-map的形式直接显示你出错代码的位置  
  devtool: CONFIG.devtool,
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