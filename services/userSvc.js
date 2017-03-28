const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var UserSvc = function () { };

UserSvc.prototype.saveFrom = function (hos) {
    return new Promise((resolve, reject) => {
        console.log(GLOBAL.SERVER + "/user/saveFrom/"+hos);
        request(GLOBAL.SERVER + "/user/saveFrom/"+hos).then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

module.exports = UserSvc;