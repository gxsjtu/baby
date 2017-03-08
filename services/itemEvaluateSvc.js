const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var ItemEvaluateSvc = function () { };

ItemEvaluateSvc.prototype.addJudge = function (itemId, alias, message, score,avatar) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/bundle/addJudge", { itemId: itemId, alias: alias, message: message, score: score, avatar:avatar }, "POST").then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

ItemEvaluateSvc.prototype.getJudgesByItemId = function (itemId) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/bundle/getJudgesByItemId/" + itemId).then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
};

module.exports = ItemEvaluateSvc;