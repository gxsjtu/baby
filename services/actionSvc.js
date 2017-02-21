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
            case "hospitalCard-downs":
                var xzName = "DHA代表";
                resolve(xzName);
                break;
            case "hospitalCard-inspections":
                var xzName = "十项全能";
                resolve(xzName);
                break;
            case "hospitalCard-ogtts":
                var xzName = "三管标兵";
                resolve(xzName);
                break;
            case "hospitalCard-fhrms":
                var xzName = "一帮一标兵";
                resolve(xzName);
                break;
            case "hospitalCard-day42s":
                var xzName = "劳动模范";
                resolve(xzName);
                break;
            case "hospitalCard-bornCerts":
                var xzName = "积极分子";
                resolve(xzName);
                break;
            case "hospitalReady":
                var xzName = "三八红旗手";
                resolve(xzName);
                break;
            case "hospitalPackage":
                var xzName = "待产劳模";
                resolve(xzName);
                break;
            case "confinementDate":
                var xzName = "荣誉二道杠";
                resolve(xzName);
                break;
            case "lessCard":
                var xzName = "小卡好战士";
                resolve(xzName);
                break;
            case "hospitalCard-cards":
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

ActionSvc.prototype.giveCorrection = function (hospitalId, pageId, content) {
    return new Promise((resolve, reject) => {
        console.log('request');
        request(GLOBAL.SERVER + "/user/giveCorrection/", { hospitalId: hospitalId, pageId: pageId, content: content }, "POST").then(data => {
            console.log(data);
            resolve(data);
        }).catch(err => {
            console.log(err);
        })
    })
};

module.exports = ActionSvc;