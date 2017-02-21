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
        var xzName = "";
        switch (pageName) {
            case "hospitalList":
                xzName = "优秀侦察兵";
                break;
            case "hospitalCard-downs":
                xzName = "DHA代表";
                break;
            case "hospitalCard-inspections":
                xzName = "十项全能";
                break;
            case "hospitalCard-ogtts":
                xzName = "三管标兵";
                break;
            case "hospitalCard-fhrms":
                xzName = "一帮一标兵";
                break;
            case "hospitalCard-day42s":
                xzName = "劳动模范";
                break;
            case "hospitalCard-bornCerts":
                xzName = "积极分子";
                break;
            case "hospitalReady":
                xzName = "三八红旗手";
                break;
            case "hospitalPackage":
                xzName = "待产劳模";
                break;
            case "confinementDate":
                xzName = "荣誉二道杠";
                break;
            case "lessCard":
                xzName = "小卡好战士";
                break;
            case "hospitalCard-cards":
                xzName = "大卡小英雄";
                break;
            case "census":
                xzName = "五好家庭";
                break;
            case "medical":
                xzName = "无忧青年";
                break;
            case "fund":
                var xzName = "互助榜样";
                resolve(xzName);
                break;
            case "birth":
                xzName = "致富达人";
                break;
            default:
                xzName = "";
                break;
        }
        resolve(xzName);
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