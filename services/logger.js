const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var LoggerSvc = function () { };

LoggerSvc.prototype.write = function (nickName, entry) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/user/Log/"+nickName+"/"+entry).then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

module.exports = LoggerSvc;