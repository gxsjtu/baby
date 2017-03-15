const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var PaymentSvc = function () { };

PaymentSvc.prototype.makePayment = function (obj) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/payment/makePayment/",obj,"POST").then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

PaymentSvc.prototype.paymentByOrderId = function(orderId){
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/payment/resumePayment/" + orderId, "", "GET").then(data => {
            resolve(data);
        })
    })
}

module.exports = PaymentSvc;