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

ActionSvc.prototype.getModalByPageName = function (pageName) {
    return new Promise((resolve, reject) => {
        switch (pageName) {
            case "lessCard":
                var xzName = "小卡好战士";
                resolve(xzName);
                break;
            case "hospitalCard":
                var xzName = "大卡小英雄";
                resolve(xzName);
                break;
            case "census":
                var xzName = "五好家庭";
                resolve(xzName);
                break;
            case "medical":
                var xzName = "无忧青年";
                resolve(xzName);
                break;
            case "fund":
                var xzName = "互助榜样";
                resolve(xzName);
                break;
            case "birth":
                var xzName = "致富达人";
                resolve(xzName);
                break;
                default:
                var xzName = "";
                resolve(xzName);
                break;
        }
    })
}

module.exports = ActionSvc;