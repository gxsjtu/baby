const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var MyBuyOrderSvc = function(){

}

MyBuyOrderSvc.prototype.getMyOrders = function(){
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/order/getOrdersByOpenId", null, "GET").then(data => {
            resolve(data);
        })
    })
}

module.exports = MyBuyOrderSvc;