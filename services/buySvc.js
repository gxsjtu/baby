const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var BuySvc = function () { };

BuySvc.prototype.payment = function (param) {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            timeStamp: param.timeStamp,
            nonceStr: param.nonceStr,
            package: param.package,
            signType: 'MD5',
            paySign: param.paySign,
            // success: function (res) {
            //     console.log('ok');
            //     console.log(res);
            // },
            // fail: function (err) {
            //     console.log(err);
            // },
            complete: function (comp) {
                // complete
                resolve();
            }
        })
    })
}

BuySvc.prototype.getList = function () {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/item/getAvailableItems", null, "GET").then(data => {
            resolve(data);
        })
    })
}

BuySvc.prototype.getSaleQtyById = function (id) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/order/getSalesByItemId/" + id, null, "GET").then(data => {
            resolve(data);
        })
    })
}

BuySvc.prototype.getSlides = function () {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/item/getSlides", null, "GET").then(data => {
            resolve(data);
        })
    })
}

BuySvc.prototype.getDeliveryAddress = function () {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/user/getDeliveryAddress", null, "GET").then(data => {
            resolve(data);
        })
    })
}

module.exports = BuySvc;