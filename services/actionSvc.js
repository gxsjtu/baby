const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var ActionSvc = function () { };

ActionSvc.prototype.clickGood = function (hospitalId, pageId) {

    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/user/clickGood/", { pageId: pageId, hospitalId: hospitalId }, "POST").then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

ActionSvc.prototype.goodsCount = function (hospitalId, pageId) {

    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/user/goodsCount/", { pageId: pageId, hospitalId: hospitalId }, "POST").then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

// ActionSvc.prototype.get

ActionSvc.prototype.getModal = function (pageId) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/user/getModal/" + pageId, "", "GET").then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        })
    })
};

module.exports = ActionSvc;