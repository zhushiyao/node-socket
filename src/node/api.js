var request = require('request')
var store = require('./store')
var URL = 'http://inn.quancheng-ec.com/api/order/realtime/total';
var TIME = 3000;


/**
 * 轮询请求数据
 * @param {*} socket 
 */
module.exports = function (socket, isLoad) {
  setInterval(function () {
    request(URL, function (error, response, body) {
      if (response && response.statusCode == 200) {
        var result = body
        try {
          if(typeof body == 'string'){
            result = JSON.parse(body);
          }
        } catch (e) {
          console.log(body)
          console.log(e)
        }
        console.log(result)
        if (result && result.status == 'success') {
          var data = result.data[0];
          var newOrderCount = parseInt(data.orderCount || 0);
          var newPeopleSum = parseInt(data.peopleSum || 0);
          console.log(newOrderCount, newPeopleSum)
          console.log(store.orderCount, store.peopleSum)
          // socket.emit('change', {
          //   people: newPeopleSum,
          //   round: newOrderCount
          // })
          if (newOrderCount != store.orderCount || newPeopleSum != store.peopleSum) {
            socket.emit('change', {
              people: newPeopleSum,
              round: newOrderCount
            })
            store.orderCount = newOrderCount;
            store.peopleSum = newPeopleSum;
          }
        } else {
          console.log('body:', body);
        }
      } else {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
      }

    })
  }, TIME);
};