var request = require('request')

var URL = 'http://inn.quancheng-ec.com/api/order/realtime/total';
var TIME = 3000;
var orderCount = 0;
var peopleSum = 0;


// {
//   "data": [{
//     "id": null,
//     "orderCount": 756904,
//     "orderSum": 770880809.10,
//     "orderCity": null,
//     "peopleSum": 5609177,
//     "lastOrderId": 0
//   }],
//   "status": "success",
//   "message": null
// }
/**
 * 轮询请求数据
 * @param {*} socket 
 */
module.exports = function (socket) {
  setInterval(function () {
    request(URL, function (error, response, body) {
      if (response.statusCode == 200) {
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
          if (newOrderCount != orderCount || newPeopleSum != peopleSum) {
            socket.emit('change', {
              people: newPeopleSum,
              round: newOrderCount
            })
            orderCount = newOrderCount;
            peopleSum = newPeopleSum;
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