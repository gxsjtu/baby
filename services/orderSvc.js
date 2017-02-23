const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var OrderSvc = function () { }

OrderSvc.prototype.getOrders = function () {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/user/getOrders", "", "GET").then(data => {
            resolve(data);
        })
    })
}

module.exports = OrderSvc;