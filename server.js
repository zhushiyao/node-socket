var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
var requestApi = require('./src/node/api');
var store = require('./src/node/store');

app.use(express.static(path.join(__dirname, '/')));
console.log(process.env.MODE)
if(process.env.NODE_ENV == 'development'){
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


//socket.io 监听
io.on('connection', function (socket) {
  console.log('socket.io listen: connetion  ');

  //自定义事件 
  socket.on('clentMessage', function (msg) {
    console.log('clentMessage:', msg);
  })
  //用户连接后，发送最新的数据
  
  socket.emit('change', {
    people: store.peopleSum,
    round: store.orderCount
  })
  // setInterval(function(){
  //   socket.emit('change', {
  //     people: new Date().getTime(),
  //     round: new Date().getTime()
  //   })
  // }, 3000);
  
});
requestApi(io);

//设置监听
server.listen(8500, function () {
  console.log('listen:8500');
});

