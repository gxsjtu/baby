const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var ShareSvc = function () { };

ShareSvc.prototype.giveShare = function () {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/user/giveShare").then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

module.exports = ShareSvc;