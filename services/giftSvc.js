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

GiftSvc.prototype.canGetBundle = function (id) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/user/canGetBundle/"+id).then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

GiftSvc.prototype.getBundle = function (id,province,city,name,tel,detail) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/user/getBundle",{ bundleId:id, province: province, city: city, name: name, tel:tel, detail:detail }, "POST").then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

module.exports = GiftSvc;