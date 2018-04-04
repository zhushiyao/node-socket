var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
var requestApi = require('./src/node/api');





app.use(express.static(path.join(__dirname, '/')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

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
  socket.emit('change', {
    message: 'change init',
    name: 'ser'
  })

  setInterval(function(){
    socket.emit('change', {
      people: new Date().getTime(),
      round: new Date().getTime()
    })
  }, 3000);
  // requestApi(socket);
});


//设置监听
server.listen(8500, function () {
  console.log('listen:8500');
});

