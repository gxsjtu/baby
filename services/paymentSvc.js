const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var PaymentSvc = function () { };

PaymentSvc.prototype.makePayment = function (itemId, count) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/payment/makePayment/" + itemId + "/" + count).then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

module.exports = PaymentSvc;