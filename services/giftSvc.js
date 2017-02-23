const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var GiftSvc = function () { };

GiftSvc.prototype.displayBundle = function () {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/bundle/displayBundle").then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};


GiftSvc.prototype.getBundle = function (id) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/bundle/getBundle/"+id).then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

module.exports = GiftSvc;