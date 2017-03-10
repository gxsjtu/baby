const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var BuySvc = function () { };

//支付接口
// function getSessionKey() {
//     var appCode = getApp().globalData.appCode;
//     wx.request({
//       url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx0ca1bca24f6ac1ed&secret=4644eae2127ad7318a5ebc800c251ea0&js_code=' + appCode + "&grant_type=authorization_code",
//       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
//       // header: {}, // 设置请求的 header
//       success: function(res){
//         // success

//       },
//       fail: function() {
//         // fail
//       },
//       complete: function() {
//         // complete
//       }
//     })
// }

// BuySvc.prototype.pay = function () {

// }

BuySvc.prototype.getList = function () {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/item/getAvailableItems", null, "GET").then(data => {
            resolve(data);
        })
    })
}

BuySvc.prototype.getSaleQtyById = function(id){
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/order/getSalesByItemId/" + id, null, "GET").then(data => {
            resolve(data);
        })
    })
}

module.exports = BuySvc;